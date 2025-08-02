import { randomBytes } from 'node:crypto';
import { Ticket } from '@prisma/client';
import Stripe from 'stripe';

// Store processed webhook events to prevent duplicate processing
const processedEvents = new Set<string>();

// Store processed payment intents to prevent duplicates
const processedPaymentIntents = new Map<string, string>();

import { prisma } from '../utils/database';
import { emailService } from './emailService';

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY']!, {
  apiVersion: '2023-10-16',
});

export interface CreatePaymentIntentData {
  eventId: string;
  userId: string;
  attendees: string[]; // Array of attendee names
  idempotencyKey?: string; // Optional idempotency key from frontend
}

export const createPaymentIntent = async (data: CreatePaymentIntentData) => {
  try {
    // Generate a unique request key for duplicate detection
    const requestKey = `${data.userId}-${data.eventId}-${JSON.stringify(data.attendees.sort())}`;

    // Generate or use provided idempotency key
    const idempotencyKey = data.idempotencyKey || randomBytes(16).toString('hex');

    // Check if we already processed this exact request
    if (processedPaymentIntents.has(requestKey)) {
      const existingPaymentIntentId = processedPaymentIntents.get(requestKey)!;
      console.log(
        `⚠️ Duplicate payment intent request detected, returning existing: ${existingPaymentIntentId}`
      );

      // Retrieve existing payment intent
      const existingPaymentIntent = await stripe.paymentIntents.retrieve(existingPaymentIntentId);
      const event = await prisma.event.findUnique({ where: { id: data.eventId } });

      return {
        clientSecret: existingPaymentIntent.client_secret,
        paymentIntentId: existingPaymentIntent.id,
        amount: event!.price * data.attendees.length,
        currency: 'MXN',
        eventName: event!.name,
        ticketCount: data.attendees.length,
        pricePerTicket: event!.price,
        ephemeralKeySecret: null, // Will be added later
      };
    }

    // Get event details
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (!event || !event.isActive) {
      throw new Error('Evento no encontrado o no disponible');
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user || !user.isActive) {
      throw new Error('Usuario no encontrado o no activo');
    }

    // Validate attendees
    if (!data.attendees || data.attendees.length === 0) {
      throw new Error('Al menos un asistente es requerido');
    }

    const ticketCount = data.attendees.length;
    const totalAmount = Math.round(event.price * ticketCount * 100); // Convert to cents

    // Create Stripe customer if not exists (for ephemeral key)
    let customer: Stripe.Customer;
    try {
      // Try to find existing customer by email
      const existingCustomers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          metadata: {
            userId: user.id,
          },
        });
      }
    } catch (error) {
      console.error('Error handling Stripe customer:', error);
      throw new Error('Error configurando customer de Stripe');
    }

    // Create ephemeral key for secure frontend operations
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2023-10-16' }
    );

    // Create payment intent with automatic payment methods and idempotency key
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totalAmount,
        currency: 'mxn', // Mexican Peso
        customer: customer.id,
        automatic_payment_methods: {
          enabled: true, // Let Stripe automatically enable compatible payment methods
        },
        metadata: {
          eventId: data.eventId,
          userId: data.userId,
          attendees: JSON.stringify(data.attendees), // Store as JSON string
          ticketCount: ticketCount.toString(),
          eventName: event.name,
          userEmail: user.email,
          idempotencyKey,
        },
        description: `${ticketCount} ticket(s) para ${event.name}`,
      },
      {
        idempotencyKey, // Stripe-level idempotency
      }
    );

    // Store this request to prevent duplicates
    processedPaymentIntents.set(requestKey, paymentIntent.id);

    // Clean up old entries to prevent memory leak
    if (processedPaymentIntents.size > 1000) {
      const entries = Array.from(processedPaymentIntents.entries());
      processedPaymentIntents.clear();
      entries.slice(-500).forEach(([key, value]) => processedPaymentIntents.set(key, value));
    }

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: event.price * ticketCount, // Total amount
      currency: 'MXN',
      eventName: event.name,
      ticketCount,
      pricePerTicket: event.price,
      ephemeralKeySecret: ephemeralKey.secret,
      customerId: customer.id,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const confirmPayment = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const attendees = JSON.parse(paymentIntent.metadata['attendees'] || '[]');
      const eventId = paymentIntent.metadata['eventId']!;
      const userId = paymentIntent.metadata['userId']!;
      const idempotencyKey = paymentIntent.metadata['idempotencyKey'];

      // Check if tickets already exist for this specific payment intent
      const existingTickets = await prisma.ticket.findMany({
        where: {
          paymentIntentId: paymentIntentId,
        },
        include: {
          event: true,
          user: true,
        },
      });

      // If we already have tickets for this payment intent, return them
      if (existingTickets.length > 0) {
        console.log(
          `⚠️ Tickets already exist for payment ${paymentIntentId}, returning existing tickets`
        );
        return existingTickets;
      }

      // Create all tickets for this payment intent with idempotency protection
      const newTickets = await prisma.$transaction(async tx => {
        const ticketPromises = attendees.map((nameOfAttendee: string, index: number) => {
          // Create a unique idempotency key for each ticket
          const ticketIdempotencyKey = `${idempotencyKey}-ticket-${index}-${nameOfAttendee}`;

          return tx.ticket.create({
            data: {
              nameOfAttendee,
              eventId,
              userId,
              paymentIntentId: paymentIntentId, // Link to payment intent
              idempotencyKey: ticketIdempotencyKey, // Store idempotency key
            },
            include: {
              event: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  address: true,
                  price: true,
                  date: true,
                  promoVideo: true,
                  promoImages: true,
                  isActive: true,
                  createdAt: true,
                },
              },
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  phone: true,
                  role: true,
                  isActive: true,
                  createdAt: true,
                },
              },
            },
          });
        });

        return Promise.all(ticketPromises);
      });

      const allTickets = newTickets;

      // Send ticket confirmation emails for all tickets (async, don't wait)
      newTickets.forEach(ticket => {
        emailService
          .sendTicketConfirmationEmail(ticket.user as any, ticket.event as any, ticket as any)
          .catch(error => {
            console.error('Error enviando email de confirmación:', error);
          });
      });

      return allTickets;
    }

    throw new Error('Pago no completado');
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

export const handleWebhook = async (body: Buffer | string, signature: string) => {
  try {
    console.log('🔐 Webhook signature verification:', {
      bodyType: typeof body,
      bodyLength: body.length,
      body,
      signatureExists: !!signature,
      webhookSecretExists: !!process.env['STRIPE_WEBHOOK_SECRET'],
      webhookSecretPrefix: process.env['STRIPE_WEBHOOK_SECRET']?.substring(0, 8),
    });

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env['STRIPE_WEBHOOK_SECRET']!
    );

    console.log('✅ Webhook signature verified successfully:', {
      eventType: event.type,
      eventId: event.id,
    });

    // Check if we've already processed this event
    if (processedEvents.has(event.id)) {
      console.log(`⚠️ Webhook event ${event.id} already processed, skipping`);
      return { received: true, skipped: true };
    }

    // Mark event as processed
    processedEvents.add(event.id);

    // Clean up old events (keep only last 1000 to prevent memory leak)
    if (processedEvents.size > 1000) {
      const eventsArray = Array.from(processedEvents);
      processedEvents.clear();
      eventsArray.slice(-500).forEach(id => processedEvents.add(id));
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await confirmPayment(paymentIntent.id);
        console.log(`✅ Pago exitoso para ${paymentIntent.metadata['eventName']}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log(`❌ Pago fallido para ${failedPayment.metadata['eventName']}`);
        break;
      }

      default:
        console.log(`⚠️ Evento no manejado: ${event.type}`);
    }

    return { received: true };
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    throw error;
  }
};

export const getPaymentStatus = async (paymentIntentId: string, userId: string) => {
  try {
    console.log('🔍 Checking payment status for:', { paymentIntentId, userId });

    // Get payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    console.log('💳 Stripe payment intent status:', {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

    // Check if we have tickets created for this payment
    const attendees = JSON.parse(paymentIntent.metadata['attendees'] || '[]');
    const eventId = paymentIntent.metadata['eventId'];

    // Fetch the event details
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        name: true,
        date: true,
        address: true,
        price: true,
        description: true,
        promoVideo: true,
        promoImages: true,
      },
    });

    let tickets: Ticket[] = [];
    if (paymentIntent.status === 'succeeded') {
      // Find tickets linked to this specific payment intent
      tickets = await prisma.ticket.findMany({
        where: {
          paymentIntentId: paymentIntentId,
        },
        include: {
          event: {
            select: {
              id: true,
              name: true,
              date: true,
              address: true,
              price: true,
            },
          },
        },
      });
    }

    // Determine the overall status
    let status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'requires_action';
    let message: string;

    switch (paymentIntent.status) {
      case 'succeeded':
        if (tickets.length === attendees.length) {
          status = 'succeeded';
          message = 'Pago exitoso y tickets creados';
        } else if (tickets.length > 0) {
          status = 'processing';
          message = 'Pago exitoso, creando tickets restantes...';
        } else {
          status = 'processing';
          message = 'Pago exitoso, creando tickets...';
        }
        break;
      case 'processing':
        status = 'processing';
        message = 'Procesando pago...';
        break;
      case 'requires_payment_method':
      case 'requires_confirmation':
      case 'requires_action':
        status = 'requires_action';
        message = 'Se requiere acción adicional';
        break;
      case 'canceled':
        status = 'failed';
        message = 'Pago cancelado';
        break;
      default:
        status = 'pending';
        message = 'Estado del pago desconocido';
    }

    const result = {
      status,
      message,
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency.toUpperCase(),
      },
      event,
      tickets: tickets.map(ticket => ({
        id: ticket.id,
        nameOfAttendee: ticket.nameOfAttendee,
        createdAt: ticket.createdAt,
      })),
      expectedTickets: attendees.length,
      createdTickets: tickets.length,
    };

    console.log('✅ Payment status result:', result);
    return result;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};
