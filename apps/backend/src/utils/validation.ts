import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  email: z.string().email('Formato de correo electrónico inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),
  phone: z
    .string()
    .optional()
    .refine(val => !val || val.length >= 10, {
      message: 'El teléfono debe tener al menos 10 dígitos',
    }),
});

export const loginSchema = z.object({
  email: z.string().email('Formato de correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .optional(),
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .optional(),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres')
    .optional(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Formato de correo electrónico inválido'),
});

// Event validation schemas
export const createEventSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre del evento debe tener al menos 3 caracteres')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres'),
  address: z
    .string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(500, 'La dirección no puede exceder 500 caracteres'),
  price: z
    .number()
    .min(0, 'El precio no puede ser negativo')
    .max(100000, 'El precio no puede exceder $100,000'),
  promoVideo: z.string().url('URL de video inválida').optional(),
  promoImages: z.array(z.string().url('URL de imagen inválida')).optional(),
  date: z.string().refine(
    val => {
      const date = new Date(val);
      return date > new Date();
    },
    {
      message: 'La fecha del evento debe ser futura',
    }
  ),
});

export const updateEventSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre del evento debe tener al menos 3 caracteres')
    .max(200, 'El nombre no puede exceder 200 caracteres')
    .optional(),
  description: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres')
    .optional(),
  address: z
    .string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(500, 'La dirección no puede exceder 500 caracteres')
    .optional(),
  price: z
    .number()
    .min(0, 'El precio no puede ser negativo')
    .max(100000, 'El precio no puede exceder $100,000')
    .optional(),
  promoVideo: z.string().url('URL de video inválida').optional(),
  promoImages: z.array(z.string().url('URL de imagen inválida')).optional(),
  date: z
    .string()
    .refine(
      val => {
        const date = new Date(val);
        return date > new Date();
      },
      {
        message: 'La fecha del evento debe ser futura',
      }
    )
    .optional(),
});

// Ticket validation schemas
export const createTicketSchema = z.object({
  nameOfAttendee: z
    .string()
    .min(2, 'El nombre del asistente debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  eventId: z.string().uuid('ID de evento inválido'),
  userId: z.string().uuid('ID de usuario inválido'),
});

export const updateTicketSchema = z.object({
  nameOfAttendee: z
    .string()
    .min(2, 'El nombre del asistente debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
});

// Payment validation schemas
export const createPaymentSchema = z
  .object({
    eventId: z.string().uuid('ID de evento inválido'),
    // Support both old and new formats
    nameOfAttendee: z
      .string()
      .min(2, 'El nombre del asistente debe tener al menos 2 caracteres')
      .max(100, 'El nombre no puede exceder 100 caracteres')
      .optional(),
    attendees: z
      .array(
        z
          .string()
          .min(2, 'El nombre del asistente debe tener al menos 2 caracteres')
          .max(100, 'El nombre no puede exceder 100 caracteres')
      )
      .min(1, 'Al menos un asistente es requerido')
      .max(10, 'No se pueden agregar más de 10 asistentes')
      .optional(),
  })
  .refine(data => data.nameOfAttendee || (data.attendees && data.attendees.length > 0), {
    message: 'Debe proporcionar al menos un asistente (nameOfAttendee o attendees)',
    path: ['attendees'],
  });

export const confirmPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, 'ID de intención de pago requerido'),
});

// Contact validation schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  email: z
    .string()
    .email('Formato de correo electrónico inválido')
    .max(255, 'El email no puede exceder 255 caracteres')
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres')
    .trim(),
});

// Generic UUID validation
export const uuidSchema = z.object({
  id: z.string().uuid('ID inválido'),
});
