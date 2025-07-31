import { NextFunction, Request, Response } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';

  console.error(`[ERROR ${statusCode}] ${message}`, {
    path: req.path,
    method: req.method,
    stack: error.stack,
  });

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'INTERNAL_SERVER_ERROR' : getErrorType(statusCode),
    message: statusCode >= 500 ? 'Algo salió mal. Por favor intenta de nuevo.' : message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

const getErrorType = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return 'BAD_REQUEST';
    case 401:
      return 'UNAUTHORIZED';
    case 403:
      return 'FORBIDDEN';
    case 404:
      return 'NOT_FOUND';
    case 409:
      return 'CONFLICT';
    case 422:
      return 'VALIDATION_ERROR';
    default:
      return 'INTERNAL_SERVER_ERROR';
  }
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: `La ruta ${req.originalUrl} no existe en este servidor`,
  });
};
