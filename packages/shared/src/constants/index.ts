// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  USERS: {
    ME: '/api/user/me',
    UPDATE: '/api/user',
    DELETE: '/api/user',
    ADMIN: {
      LIST: '/api/user/admin/users',
    },
  },
  EVENTS: {
    LIST: '/api/events',
    BY_ID: (id: string) => `/api/events/${id}`,
    ADMIN: {
      CREATE: '/api/events/admin',
      LIST: '/api/events/admin/all',
      UPDATE: (id: string) => `/api/events/admin/${id}`,
      DELETE: (id: string) => `/api/events/admin/${id}`,
    },
  },
  TICKETS: {
    MY_TICKETS: '/api/tickets/me',
    ADMIN: {
      CREATE: '/api/tickets/admin',
      LIST: '/api/tickets/admin',
      UPDATE: (id: string) => `/api/tickets/admin/${id}`,
      DELETE: (id: string) => `/api/tickets/admin/${id}`,
    },
  },
  PAYMENTS: {
    CREATE_INTENT: '/api/payments/create-payment-intent',
    CONFIRM: '/api/payments/confirm-payment',
    WEBHOOK: '/api/payments/webhook',
  },
} as const;

// User Roles
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'serenamente_token',
  USER: 'serenamente_user',
  THEME: 'serenamente_theme',
} as const;

// Environment Variables (default values)
export const DEFAULT_CONFIG = {
  API_BASE_URL: 'http://localhost:3001',
  FRONTEND_URL: 'http://localhost:3000',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor intenta de nuevo.',
  UNAUTHORIZED: 'No tienes autorización para realizar esta acción.',
  FORBIDDEN: 'Acceso denegado.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  VALIDATION_ERROR: 'Por favor revisa los datos ingresados.',
  INTERNAL_ERROR: 'Error interno del servidor. Por favor intenta más tarde.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'Usuario registrado exitosamente.',
  LOGIN_SUCCESS: 'Inicio de sesión exitoso.',
  PROFILE_UPDATED: 'Perfil actualizado exitosamente.',
  EVENT_CREATED: 'Evento creado exitosamente.',
  EVENT_UPDATED: 'Evento actualizado exitosamente.',
  TICKET_PURCHASED: 'Ticket comprado exitosamente.',
  PAYMENT_SUCCESS: 'Pago procesado exitosamente.',
} as const;
