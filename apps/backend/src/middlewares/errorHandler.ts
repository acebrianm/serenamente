import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';

  console.error(`[ERROR ${statusCode}] ${message}`, {
    path: req.path,
    method: req.method,
    stack: error.stack,
  });

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Error interno del servidor' : message,
    message: statusCode >= 500 ? 'Algo salió mal. Por favor intenta de nuevo.' : message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe en este servidor`,
  });
};