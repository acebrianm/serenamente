// Load environment variables FIRST before any other imports
import path from 'node:path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// Now import everything else
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
// Import routes
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import eventRoutes from './routes/eventRoutes';
import paymentRoutes from './routes/paymentRoutes';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';
// Import utilities
import { connectDatabase } from './utils/database';

const app = express();
const PORT = process.env['PORT'] || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Demasiadas solicitudes',
    message: 'Has excedido el límite de solicitudes. Intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security middleware
app.use(helmet());
app.use(limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env['FRONTEND_URL'] || 'http://localhost:3000',
    credentials: true,
  })
);

// Body parsing middleware
app.use('/api/payments/webhook', express.raw({ type: 'application/json' })); // Stripe webhook needs raw body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🌍 Entorno: ${process.env['NODE_ENV'] || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM recibido. Cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT recibido. Cerrando servidor...');
  process.exit(0);
});

startServer();
