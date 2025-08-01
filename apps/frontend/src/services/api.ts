import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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

export interface Ticket {
  id: string;
  nameOfAttendee: string;
  event: Event;
  eventId: string;
  user: User;
  userId: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  amount: number; // Total amount
  currency: string;
  eventName: string;
  ticketCount: number;
  pricePerTicket: number;
}

export interface ApiPaymentResponse {
  message: string;
  payment: PaymentIntent;
}

// API Response interfaces that match backend responses
export interface ApiUserResponse {
  message: string;
  user: User;
}

export interface ApiUsersResponse {
  message: string;
  users: User[];
}

export interface ApiEventResponse {
  message: string;
  event: Event;
}

export interface ApiEventsResponse {
  message: string;
  events: Event[];
}

export interface ApiTicketResponse {
  message: string;
  ticket: Ticket;
}

export interface ApiTicketsResponse {
  message: string;
  tickets: Ticket[];
}

export const authService = {
  register: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  resetPassword: async (data: { email: string }): Promise<{ message: string }> => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
};

export const userService = {
  getMe: async (): Promise<ApiUserResponse> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateUser: async (data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }): Promise<ApiUserResponse> => {
    const response = await api.put('/users', data);
    return response.data;
  },

  deleteUser: async (): Promise<{ message: string }> => {
    const response = await api.delete('/users');
    return response.data;
  },

  getAllUsers: async (): Promise<ApiUsersResponse> => {
    const response = await api.get('/users/admin/users');
    return response.data;
  },
};

export const eventService = {
  getAllEvents: async (): Promise<ApiEventsResponse> => {
    const response = await api.get('/events');
    return response.data;
  },

  getEventById: async (id: string): Promise<ApiEventResponse> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  getAllEventsAdmin: async (): Promise<ApiEventsResponse> => {
    const response = await api.get('/events/admin/all');
    return response.data;
  },

  createEvent: async (data: {
    name: string;
    description: string;
    address: string;
    price: number;
    promoVideo?: string;
    promoImages?: string[];
    date: string;
  }): Promise<ApiEventResponse> => {
    const response = await api.post('/events/admin', data);
    return response.data;
  },

  updateEvent: async (
    id: string,
    data: {
      name?: string;
      description?: string;
      address?: string;
      price?: number;
      promoVideo?: string;
      promoImages?: string[];
      date?: string;
      isActive?: boolean;
    }
  ): Promise<ApiEventResponse> => {
    const response = await api.put(`/events/admin/${id}`, data);
    return response.data;
  },

  deleteEvent: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/events/admin/${id}`);
    return response.data;
  },
};

export const ticketService = {
  getMyTickets: async (): Promise<ApiTicketsResponse> => {
    const response = await api.get('/tickets/me');
    return response.data;
  },

  getAllTickets: async (): Promise<ApiTicketsResponse> => {
    const response = await api.get('/tickets/admin');
    return response.data;
  },

  createTicket: async (data: {
    nameOfAttendee: string;
    eventId: string;
    userId: string;
  }): Promise<ApiTicketResponse> => {
    const response = await api.post('/tickets/admin', data);
    return response.data;
  },

  updateTicket: async (
    id: string,
    data: {
      nameOfAttendee?: string;
      isActive?: boolean;
    }
  ): Promise<ApiTicketResponse> => {
    const response = await api.put(`/tickets/admin/${id}`, data);
    return response.data;
  },

  deleteTicket: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/tickets/admin/${id}`);
    return response.data;
  },
};

export const paymentService = {
  createPaymentIntent: async (data: {
    eventId: string;
    attendees: string[]; // Array of attendee names
  }): Promise<ApiPaymentResponse> => {
    const response = await api.post('/payments/create-payment-intent', data);
    return response.data;
  },

  confirmPayment: async (data: {
    paymentIntentId: string;
    eventId: string;
    attendees: string[];
  }): Promise<{ success: boolean; tickets?: Ticket[] }> => {
    const response = await api.post('/payments/confirm-payment', data);
    return response.data;
  },
};

export const contactService = {
  sendMessage: async (data: {
    name: string;
    email: string;
    message: string;
  }): Promise<{ message: string }> => {
    const response = await api.post('/contact', data);
    return response.data;
  },
};

export default api;
