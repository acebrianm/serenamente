# 🎟️ Serenamente Backend

Event ticketing backend service built with Node.js, Express, TypeScript, PostgreSQL, and Prisma.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- pnpm (recommended) or npm

### Installation

1. **Clone and navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start PostgreSQL database**
   ```bash
   docker-compose up -d
   ```

5. **Set up database**
   ```bash
   pnpm db:migrate
   pnpm db:generate
   ```

6. **Start development server**
   ```bash
   pnpm dev
   ```

The server will be running at `http://localhost:3001`

## 📋 Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:push` - Push schema to database
- `pnpm test` - Run tests
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier

## 🔧 Environment Variables

Check `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `STRIPE_SECRET_KEY` - Stripe API key
- `SMTP_*` - Email configuration

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/reset-password` - Request password reset

### Users
- `GET /api/user/me` - Get current user
- `PUT /api/user` - Update user profile
- `DELETE /api/user` - Deactivate user account

### Events
- `GET /api/events` - Get all public events
- `GET /api/events/:id` - Get event by ID

### Tickets
- `GET /api/tickets/me` - Get user's tickets

### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm-payment` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook

### Admin Routes
All admin routes require authentication and admin role:

- `GET /api/user/admin/users` - Get all users
- `POST /api/events/admin` - Create event
- `GET /api/events/admin/all` - Get all events
- `PUT /api/events/admin/:id` - Update event
- `DELETE /api/events/admin/:id` - Delete event
- `POST /api/tickets/admin` - Create ticket
- `GET /api/tickets/admin` - Get all tickets
- `PUT /api/tickets/admin/:id` - Update ticket
- `DELETE /api/tickets/admin/:id` - Delete ticket

## 🛡️ Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet security headers
- Input validation with Zod
- CORS configuration
- Environment variable validation

## 🏗️ Architecture

```
src/
├── controllers/     # Request handlers
├── routes/         # Route definitions
├── services/       # Business logic
├── middlewares/    # Custom middleware
├── utils/          # Utility functions
└── index.ts        # App entry point
```

## 🧪 Testing

```bash
pnpm test
```

## 📦 Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Set production environment variables

3. Run database migrations:
   ```bash
   pnpm db:migrate
   ```

4. Start the server:
   ```bash
   pnpm start
   ```

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use ESLint and Prettier for code formatting
3. Write tests for new features
4. Update documentation as needed

## 📄 License

MIT License