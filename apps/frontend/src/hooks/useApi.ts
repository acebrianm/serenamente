import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  authService,
  contactService,
  eventService,
  paymentService,
  ticketService,
  userService,
} from '../services/api';

// Query Keys
export const queryKeys = {
  // Auth
  user: ['user'] as const,
  // Events
  events: ['events'] as const,
  eventsAdmin: ['events', 'admin'] as const,
  event: (id: string) => ['events', id] as const,
  // Tickets
  tickets: ['tickets'] as const,
  ticketsAdmin: ['tickets', 'admin'] as const,
  ticketsUser: ['tickets', 'user'] as const,
  // Users (admin)
  users: ['users'] as const,
};

// Mutation Keys
export const mutationKeys = {
  // Auth
  login: ['auth', 'login'] as const,
  register: ['auth', 'register'] as const,
  resetPassword: ['auth', 'resetPassword'] as const,
  // User
  updateUser: ['user', 'update'] as const,
  deleteUser: ['user', 'delete'] as const,
  // Events
  createEvent: ['events', 'create'] as const,
  updateEvent: ['events', 'update'] as const,
  deleteEvent: ['events', 'delete'] as const,
  // Tickets
  createTicket: ['tickets', 'create'] as const,
  updateTicket: ['tickets', 'update'] as const,
  deleteTicket: ['tickets', 'delete'] as const,
  // Payments
  createPaymentIntent: ['payments', 'createIntent'] as const,
  confirmPayment: ['payments', 'confirm'] as const,
  // Contact
  sendMessage: ['contact', 'sendMessage'] as const,
};

// Auth Hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: authService.login,
    onSuccess: data => {
      // Cache user data
      queryClient.setQueryData(queryKeys.user, data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.register,
    mutationFn: authService.register,
    onSuccess: data => {
      // Cache user data
      queryClient.setQueryData(queryKeys.user, data.user);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: mutationKeys.resetPassword,
    mutationFn: authService.resetPassword,
  });
};

// User Hooks
export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: userService.getMe,
    select: data => data.user,
    enabled: !!localStorage.getItem('token'),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.updateUser,
    mutationFn: userService.updateUser,
    onSuccess: data => {
      // Update cached user data
      queryClient.setQueryData(queryKeys.user, data.user);
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.deleteUser,
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: userService.getAllUsers,
    select: data => data.users,
  });
};

// Event Hooks
export const useEvents = (options?: { adminView?: boolean }) => {
  return useQuery({
    queryKey: options?.adminView ? queryKeys.eventsAdmin : queryKeys.events,
    queryFn: options?.adminView ? eventService.getAllEventsAdmin : eventService.getAllEvents,
    select: data => data.events,
  });
};

export const useEventsAdmin = () => {
  return useQuery({
    queryKey: queryKeys.eventsAdmin,
    queryFn: eventService.getAllEventsAdmin,
    select: data => data.events,
  });
};

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: queryKeys.event(id),
    queryFn: () => eventService.getEventById(id),
    select: data => data.event,
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.createEvent,
    mutationFn: eventService.createEvent,
    onSuccess: data => {
      // Invalidate events queries
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.eventsAdmin });
      // Cache the new event
      queryClient.setQueryData(queryKeys.event(data.event.id), data.event);
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.updateEvent,
    mutationFn: ({ id, data }: { id: string; data: any }) => eventService.updateEvent(id, data),
    onSuccess: response => {
      // Update specific event in cache
      queryClient.setQueryData(queryKeys.event(response.event.id), response.event);
      // Invalidate events lists
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.eventsAdmin });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.deleteEvent,
    mutationFn: eventService.deleteEvent,
    onSuccess: () => {
      // Invalidate events queries
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.eventsAdmin });
    },
  });
};

// Ticket Hooks
export const useTickets = () => {
  return useQuery({
    queryKey: queryKeys.tickets,
    queryFn: ticketService.getAllTickets,
    select: data => data.tickets,
  });
};

export const useUserTickets = () => {
  return useQuery({
    queryKey: queryKeys.ticketsUser,
    queryFn: ticketService.getMyTickets,
    select: data => data.tickets,
    enabled: !!localStorage.getItem('token'),
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.createTicket,
    mutationFn: ticketService.createTicket,
    onSuccess: _data => {
      // Invalidate tickets queries
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets });
      queryClient.invalidateQueries({ queryKey: queryKeys.ticketsUser });
    },
  });
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.updateTicket,
    mutationFn: ({ id, data }: { id: string; data: any }) => ticketService.updateTicket(id, data),
    onSuccess: _response => {
      // Invalidate tickets queries
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets });
      queryClient.invalidateQueries({ queryKey: queryKeys.ticketsUser });
    },
  });
};

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.deleteTicket,
    mutationFn: ticketService.deleteTicket,
    onSuccess: () => {
      // Invalidate tickets queries
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets });
      queryClient.invalidateQueries({ queryKey: queryKeys.ticketsUser });
    },
  });
};

// Payment Hooks
export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationKey: mutationKeys.createPaymentIntent,
    mutationFn: paymentService.createPaymentIntent,
  });
};

// Contact Hook
export const useSendMessage = () => {
  return useMutation({
    mutationKey: mutationKeys.sendMessage,
    mutationFn: contactService.sendMessage,
  });
};

export const useContactMessage = () => {
  return useMutation({
    mutationKey: mutationKeys.sendMessage,
    mutationFn: contactService.sendMessage,
  });
};
