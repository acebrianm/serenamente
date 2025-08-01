import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { emailService } from '../services/emailService';
import { prisma } from '../utils/database';
import { generateToken } from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/password';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        error: 'USER_ALREADY_EXISTS',
        message: 'Ya existe una cuenta con este correo electrónico',
      });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken(user as any);

    // Send welcome email (async, don't wait)
    emailService.sendWelcomeEmail(user as any).catch(error => {
      console.error('Error enviando email de bienvenida:', error);
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user,
      token,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error al registrar el usuario',
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Correo electrónico o contraseña incorrectos',
      });
      return;
    }

    // Verify password - skip for OAuth users
    if (user.provider !== 'LOCAL' || !user.password) {
      res.status(401).json({
        error: 'OAUTH_LOGIN_REQUIRED',
        message: 'Esta cuenta requiere inicio de sesión con Google o Apple',
      });
      return;
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Correo electrónico o contraseña incorrectos',
      });
      return;
    }

    // Generate token
    const token = generateToken(user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Inicio de sesión exitoso',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error al iniciar sesión',
    });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      // Don't reveal if user exists for security
      res.json({
        message: 'Si el correo electrónico existe, se enviará un enlace de recuperación',
      });
      return;
    }

    // TODO: Implement password reset email logic
    // For now, just return success message
    res.json({
      message: 'Si el correo electrónico existe, se enviará un enlace de recuperación',
    });
  } catch (error) {
    console.error('Error en reset password:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error al procesar la solicitud',
    });
  }
};

// Google OAuth
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', { session: false }, (err: any, authData: any) => {
    if (err) {
      console.error('Google OAuth error:', err);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_error`);
    }

    if (!authData) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
    }

    const { user, token } = authData;

    // Redirect to frontend with token
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`
    );
  })(req, res, next);
};

// OAuth token exchange endpoint
export const oauthTokenExchange = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({
        error: 'TOKEN_REQUIRED',
        message: 'Token is required',
      });
      return;
    }

    // Token validation would happen here if needed
    res.json({
      message: 'Token exchange successful',
      token,
    });
  } catch (error) {
    console.error('Error in token exchange:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Ocurrió un error en el intercambio de token',
    });
  }
};
