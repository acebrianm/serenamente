// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: Omit<User, 'password'>;
  token: string;
}

// Event Types
export interface Event {
  id: string;
  name: string;
  description: string;
  address: string;
  price: number;
  promoVideo?: string;
  promoImages: string[];
  isActive: boolean;
  date: string;
  createdAt: string;
}

export interface CreateEventRequest {
  name: string;
  description: string;
  address: string;
  price: number;
  promoVideo?: string;
  promoImages?: string[];
  date: string;
}

// Ticket Types
export interface Ticket {
  id: string;
  nameOfAttendee: string;
  eventId: string;
  userId: string;
  isActive: boolean;
  createdAt: string;
  event?: Event;
  user?: User;
}

export interface CreateTicketRequest {
  nameOfAttendee: string;
  eventId: string;
  userId: string;
}

// Payment Types
export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  eventName: string;
}

export interface CreatePaymentRequest {
  eventId: string;
  nameOfAttendee: string;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  error?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Error Types
export interface ApiError {
  error: string;
  message: string;
  statusCode?: number;
}
