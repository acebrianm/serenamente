import { NextFunction, Request, Response } from 'express';
import { JWTPayload, verifyToken } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Token de acceso requerido',
        message: 'Debe proporcionar un token de autenticación válido',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (_) {
    res.status(401).json({
      error: 'Token inválido',
      message: 'El token de autenticación no es válido o ha expirado',
    });
  }
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      error: 'No autenticado',
      message: 'Debe estar autenticado para acceder a este recurso',
    });
    return;
  }

  if (req.user.role !== 'ADMIN') {
    res.status(403).json({
      error: 'Acceso denegado',
      message: 'Solo los administradores pueden acceder a este recurso',
    });
    return;
  }

  next();
};
