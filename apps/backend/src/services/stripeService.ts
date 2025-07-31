import Stripe from 'stripe';
import { prisma } from '../utils/database';
import { emailService } from './emailService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export interface CreatePaymentIntentData {
  eventId: string;
  userId: string;
  nameOfAttendee: string;
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

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(event.price * 100), // Convert to cents
      currency: 'mxn', // Mexican Peso
      metadata: {
        eventId: data.eventId,
        userId: data.userId,
        nameOfAttendee: data.nameOfAttendee,
        eventName: event.name,
        userEmail: user.email,
      },
      description: `Ticket para ${event.name} - ${data.nameOfAttendee}`,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: event.price,
      currency: 'MXN',
      eventName: event.name,
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
      // Create ticket in database
      const ticket = await prisma.ticket.create({
        data: {
          nameOfAttendee: paymentIntent.metadata.nameOfAttendee!,
          eventId: paymentIntent.metadata.eventId!,
          userId: paymentIntent.metadata.userId!,
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

      // Send ticket confirmation email (async, don't wait)
      emailService
        .sendTicketConfirmationEmail(ticket.user as any, ticket.event as any, ticket as any)
        .catch(error => {
          console.error('Error enviando email de confirmación:', error);
        });

      return ticket;
    }

    throw new Error('Pago no completado');
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

export const handleWebhook = async (body: any, signature: string) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await confirmPayment(paymentIntent.id);
        console.log(`✅ Pago exitoso para ${paymentIntent.metadata.eventName}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log(`❌ Pago fallido para ${failedPayment.metadata.eventName}`);
        break;
      }

      default:
        console.log(`⚠️ Evento no manejado: ${event.type}`);
    }

    return { received: true };
  } catch (error) {
    console.error('Error processing webhook:', error);
    throw error;
  }
};
