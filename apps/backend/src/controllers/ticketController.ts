import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { prisma } from '../utils/database';

export const getMyTickets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Debe estar autenticado para acceder a este recurso',
      });
      return;
    }

    const tickets = await prisma.ticket.findMany({
      where: {
        userId: req.user.userId,
        isActive: true,
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
            promoImages: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      message: 'Tickets obtenidos exitosamente',
      tickets,
    });
  } catch (error) {
    console.error('Error obteniendo tickets del usuario:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error al obtener los tickets',
    });
  }
};

export const createTicket = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { nameOfAttendee, eventId, userId } = req.body;

    // Verify event exists and is active
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event || !event.isActive) {
      res.status(404).json({
        error: 'EVENT_NOT_FOUND',
        message: 'El evento no existe o no está disponible',
      });
      return;
    }

    // Verify user exists (for admin creating tickets for other users)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.isActive) {
      res.status(404).json({
        error: 'USER_NOT_FOUND',
        message: 'El usuario no existe o no está activo',
      });
      return;
    }

    const ticket = await prisma.ticket.create({
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
            date: true,
            address: true,
            price: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Ticket creado exitosamente',
      ticket,
    });
  } catch (error) {
    console.error('Error creando ticket:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error al crear el ticket',
    });
  }
};

export const getAllTickets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const tickets = await prisma.ticket.findMany({
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
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      message: 'Tickets obtenidos exitosamente',
      tickets,
    });
  } catch (error) {
    console.error('Error obteniendo todos los tickets:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error al obtener los tickets',
    });
  }
};

export const updateTicket = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nameOfAttendee } = req.body;

    const ticket = await prisma.ticket.update({
      where: { id },
      data: { nameOfAttendee },
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
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.json({
      message: 'Ticket actualizado exitosamente',
      ticket,
    });
  } catch (error) {
    console.error('Error actualizando ticket:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error al actualizar el ticket',
    });
  }
};

export const deleteTicket = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.ticket.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      message: 'Ticket desactivado exitosamente',
    });
  } catch (error) {
    console.error('Error desactivando ticket:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error al desactivar el ticket',
    });
  }
};
