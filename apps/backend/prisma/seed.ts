import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Create admin user
  const adminPassword = await hashPassword('admin123456');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@serenamente.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'Serenamente',
      email: 'admin@serenamente.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Usuario admin creado:', admin.email);

  // Create test user
  const userPassword = await hashPassword('user123456');
  const user = await prisma.user.upsert({
    where: { email: 'user@serenamente.com' },
    update: {},
    create: {
      firstName: 'Usuario',
      lastName: 'Test',
      email: 'user@serenamente.com',
      password: userPassword,
      phone: '555-0123',
      role: 'USER',
    },
  });

  console.log('✅ Usuario test creado:', user.email);

  // Create sample events
  const event1 = await prisma.event.upsert({
    where: { id: '550e8400-e29b-41d4-a716-446655440001' },
    update: {},
    create: {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Concierto de Música Clásica',
      description: 'Una velada mágica con las mejores piezas de música clásica interpretadas por la Orquesta Sinfónica Nacional.',
      address: 'Teatro Nacional, Ciudad de México, CDMX',
      price: 850.00,
      promoImages: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800'
      ],
      date: new Date('2024-12-15T20:00:00Z'),
    },
  });

  const event2 = await prisma.event.upsert({
    where: { id: '550e8400-e29b-41d4-a716-446655440002' },
    update: {},
    create: {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Festival de Arte Contemporáneo',
      description: 'Exposición interactiva de arte contemporáneo con obras de artistas locales e internacionales.',
      address: 'Centro Cultural, Guadalajara, Jalisco',
      price: 450.00,
      promoImages: [
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
      ],
      date: new Date('2025-12-20T18:00:00Z'),
    },
  });

  const event3 = await prisma.event.upsert({
    where: { id: '550e8400-e29b-41d4-a716-446655440003' },
    update: {},
    create: {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Taller de Meditación y Bienestar',
      description: 'Sesión de meditación guiada y técnicas de relajación para encontrar la paz interior.',
      address: 'Centro Serenamente, Monterrey, Nuevo León',
      price: 250.00,
      promoImages: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
      ],
      date: new Date('2025-12-10T16:00:00Z'),
    },
  });

  console.log('✅ Eventos de ejemplo creados:', [event1.name, event2.name, event3.name]);

  // Create sample ticket
  const ticket = await prisma.ticket.create({
    data: {
      nameOfAttendee: 'Juan Pérez',
      eventId: event1.id,
      userId: user.id,
    },
  });

  console.log('✅ Ticket de ejemplo creado para:', ticket.nameOfAttendee);

  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });