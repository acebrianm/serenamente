import { Ticket } from '@prisma/client';
import Stripe from 'stripe';

// Store processed webhook events to prevent duplicate processing
const processedEvents = new Set<string>();

import { prisma } from '../utils/database';
import { emailService } from './emailService';

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY']!, {
  apiVersion: '2023-10-16',
});

export interface CreatePaymentIntentData {
  eventId: string;
  userId: string;
  attendees: string[]; // Array of attendee names
}

export const createPaymentIntent = async (data: CreatePaymentIntentData) => {
  try {
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

    // Create payment intent with automatic payment methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'mxn', // Mexican Peso
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
      },
      description: `${ticketCount} ticket(s) para ${event.name}`,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: event.price * ticketCount, // Total amount
      currency: 'MXN',
      eventName: event.name,
      ticketCount,
      pricePerTicket: event.price,
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

      // Create multiple tickets in a transaction
      const tickets = await prisma.$transaction(async tx => {
        const ticketPromises = attendees.map((nameOfAttendee: string) =>
          tx.ticket.create({
            data: {
              nameOfAttendee,
              eventId,
              userId,
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
          })
        );

        return Promise.all(ticketPromises);
      });

      // Send ticket confirmation emails for each ticket (async, don't wait)
      tickets.forEach(ticket => {
        emailService
          .sendTicketConfirmationEmail(ticket.user as any, ticket.event as any, ticket as any)
          .catch(error => {
            console.error('Error enviando email de confirmación:', error);
          });
      });

      return tickets;
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
      tickets = await prisma.ticket.findMany({
        where: {
          eventId,
          userId,
          // Check for tickets created in the last 10 minutes
          createdAt: {
            gte: new Date(Date.now() - 10 * 60 * 1000),
          },
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
