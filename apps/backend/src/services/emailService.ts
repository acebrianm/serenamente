import { Event, Ticket, User } from '@prisma/client';
import nodemailer, { Transporter } from 'nodemailer';

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to,
        subject,
        html,
      });
      console.log(`✅ Email enviado a ${to}: ${subject}`);
    } catch (error) {
      console.error(`❌ Error enviando email a ${to}:`, error);
      throw error;
    }
  }

  async sendWelcomeEmail(user: User): Promise<void> {
    const subject = '¡Bienvenido a Serenamente! 🎉';
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { padding: 20px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Bienvenido a Serenamente!</h1>
            </div>
            <div class="content">
              <h2>Hola ${user.firstName},</h2>
              <p>¡Gracias por unirte a Serenamente! Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
              <p>Con tu cuenta podrás:</p>
              <ul>
                <li>Explorar y comprar tickets para eventos únicos</li>
                <li>Gestionar tus reservaciones</li>
                <li>Recibir notificaciones sobre nuevos eventos</li>
                <li>Acceder a ofertas exclusivas</li>
              </ul>
              <p>¡Esperamos verte pronto en nuestros eventos!</p>
            </div>
            <div class="footer">
              <p>Equipo de Serenamente<br>
              <a href="mailto:${process.env.FROM_EMAIL}">${process.env.FROM_EMAIL}</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail(user.email, subject, html);
  }

  async sendPasswordResetEmail(user: User, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const subject = 'Recuperación de contraseña - Serenamente';
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #FF9800; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { display: inline-block; background-color: #FF9800; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Recuperación de Contraseña</h1>
            </div>
            <div class="content">
              <h2>Hola ${user.firstName},</h2>
              <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en Serenamente.</p>
              <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
              <a href="${resetUrl}" class="button">Restablecer Contraseña</a>
              <p>Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña permanecerá sin cambios.</p>
              <p>Este enlace expirará en 24 horas por seguridad.</p>
            </div>
            <div class="footer">
              <p>Equipo de Serenamente<br>
              <a href="mailto:${process.env.FROM_EMAIL}">${process.env.FROM_EMAIL}</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail(user.email, subject, html);
  }

  async sendTicketConfirmationEmail(user: User, event: Event, ticket: Ticket): Promise<void> {
    const subject = `Confirmación de Ticket - ${event.name} 🎫`;
    const eventDate = new Date(event.date).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .ticket-info { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail { margin: 10px 0; }
            .label { font-weight: bold; color: #555; }
            .footer { padding: 20px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Tu Ticket ha sido Confirmado! 🎉</h1>
            </div>
            <div class="content">
              <h2>Hola ${user.firstName},</h2>
              <p>¡Excelente! Tu compra ha sido procesada exitosamente. Aquí están los detalles de tu ticket:</p>

              <div class="ticket-info">
                <div class="detail">
                  <span class="label">Evento:</span> ${event.name}
                </div>
                <div class="detail">
                  <span class="label">Asistente:</span> ${ticket.nameOfAttendee}
                </div>
                <div class="detail">
                  <span class="label">Fecha y Hora:</span> ${eventDate}
                </div>
                <div class="detail">
                  <span class="label">Ubicación:</span> ${event.address}
                </div>
                <div class="detail">
                  <span class="label">Precio:</span> $${event.price.toFixed(2)} MXN
                </div>
                <div class="detail">
                  <span class="label">ID del Ticket:</span> ${ticket.id}
                </div>
              </div>

              <p><strong>Información importante:</strong></p>
              <ul>
                <li>Guarda este correo como comprobante de tu compra</li>
                <li>Presenta tu ID del ticket el día del evento</li>
                <li>Llega 30 minutos antes del inicio del evento</li>
                <li>Para cualquier duda, contáctanos</li>
              </ul>

              <p>¡Nos vemos en el evento!</p>
            </div>
            <div class="footer">
              <p>Equipo de Serenamente<br>
              <a href="mailto:${process.env.FROM_EMAIL}">${process.env.FROM_EMAIL}</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail(user.email, subject, html);
  }
}

export const emailService = new EmailService();
