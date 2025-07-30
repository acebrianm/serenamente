import { Request, Response } from 'express';
import { prisma } from '../utils/database';
import { AuthenticatedRequest } from '../middlewares/auth';

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await prisma.event.findMany({
      where: {
        isActive: true,
        date: {
          gte: new Date() // Only future events
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        price: true,
        promoVideo: true,
        promoImages: true,
        date: true,
        createdAt: true,
        _count: {
          select: {
            tickets: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    res.json({
      message: 'Eventos obtenidos exitosamente',
      events
    });
  } catch (error) {
    console.error('Error obteniendo eventos:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al obtener los eventos'
    });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        price: true,
        promoVideo: true,
        promoImages: true,
        date: true,
        createdAt: true,
        _count: {
          select: {
            tickets: true
          }
        }
      }
    });

    if (!event || !event.isActive) {
      res.status(404).json({
        error: 'Evento no encontrado',
        message: 'El evento solicitado no existe o no está disponible'
      });
      return;
    }

    res.json({
      message: 'Evento obtenido exitosamente',
      event
    });
  } catch (error) {
    console.error('Error obteniendo evento:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al obtener el evento'
    });
  }
};

export const createEvent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, description, address, price, promoVideo, promoImages, date } = req.body;

    const event = await prisma.event.create({
      data: {
        name,
        description,
        address,
        price: parseFloat(price),
        promoVideo,
        promoImages: promoImages || [],
        date: new Date(date),
      },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        price: true,
        promoVideo: true,
        promoImages: true,
        date: true,
        createdAt: true,
      }
    });

    res.status(201).json({
      message: 'Evento creado exitosamente',
      event
    });
  } catch (error) {
    console.error('Error creando evento:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al crear el evento'
    });
  }
};

export const updateEvent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, address, price, promoVideo, promoImages, date } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (address) updateData.address = address;
    if (price) updateData.price = parseFloat(price);
    if (promoVideo !== undefined) updateData.promoVideo = promoVideo;
    if (promoImages) updateData.promoImages = promoImages;
    if (date) updateData.date = new Date(date);

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        price: true,
        promoVideo: true,
        promoImages: true,
        date: true,
        createdAt: true,
      }
    });

    res.json({
      message: 'Evento actualizado exitosamente',
      event
    });
  } catch (error) {
    console.error('Error actualizando evento:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al actualizar el evento'
    });
  }
};

export const deleteEvent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.event.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      message: 'Evento desactivado exitosamente'
    });
  } catch (error) {
    console.error('Error desactivando evento:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al desactivar el evento'
    });
  }
};

export const getAllEventsAdmin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        price: true,
        promoVideo: true,
        promoImages: true,
        isActive: true,
        date: true,
        createdAt: true,
        _count: {
          select: {
            tickets: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      message: 'Eventos obtenidos exitosamente',
      events
    });
  } catch (error) {
    console.error('Error obteniendo eventos (admin):', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al obtener los eventos'
    });
  }
};