import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          error: 'Datos de entrada inválidos',
          message: 'Por favor revisa los campos y corrige los errores',
          errors,
        });
        return;
      }

      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'Ocurrió un error al validar los datos',
      });
    }
  };
};

export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          error: 'Parámetros inválidos',
          message: 'Los parámetros de la URL no son válidos',
          errors,
        });
        return;
      }

      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'Ocurrió un error al validar los parámetros',
      });
    }
  };
};

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          error: 'Parámetros de consulta inválidos',
          message: 'Los parámetros de consulta no son válidos',
          errors,
        });
        return;
      }

      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'Ocurrió un error al validar la consulta',
      });
    }
  };
};
