# 🎟️ Serenamente - Event Ticketing Platform

A modern event ticketing platform built with React, Node.js, and TypeScript in a monorepo architecture.

## 🏗️ Monorepo Structure

```
serenamente/
├── apps/
│   ├── frontend/          # React.js application
│   └── backend/           # Node.js/Express API
├── packages/
│   └── shared/            # Shared types and utilities
├── package.json           # Root package.json with workspace scripts
├── pnpm-workspace.yaml    # PNPM workspace configuration
├── biome.json            # Shared code formatting and linting
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 8+ (recommended package manager)
- **Docker & Docker Compose** (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd serenamente
   ```

2. **Install all dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   # Edit apps/backend/.env with your actual values
   ```

4. **Start the database**
   ```bash
   pnpm docker:up
   ```

5. **Set up the database**
   ```bash
   pnpm db:migrate
   pnpm db:generate
   pnpm db:seed
   ```

6. **Start development servers**
   ```bash
   pnpm dev
   ```

   This starts both frontend (http://localhost:3000) and backend (http://localhost:3001)

## 📋 Available Scripts

### Root Level Scripts

- `pnpm dev` - Start both frontend and backend in development mode
- `pnpm build` - Build both applications for production
- `pnpm test` - Run tests for both applications
- `pnpm lint` - Run linting for both applications
- `pnpm format` - Format code using Biome
- `pnpm check` - Run Biome checks (format + lint)

### Individual App Scripts

- `pnpm dev:frontend` - Start only frontend
- `pnpm dev:backend` - Start only backend
- `pnpm build:frontend` - Build only frontend
- `pnpm build:backend` - Build only backend

### Database Scripts

- `pnpm db:migrate` - Run database migrations
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:seed` - Seed database with sample data

### Docker Scripts

- `pnpm docker:up` - Start PostgreSQL database
- `pnpm docker:down` - Stop database
- `pnpm docker:logs` - View database logs

## 🎯 Applications

### Frontend (`apps/frontend`)

- **Framework**: React 19 with TypeScript
- **UI Library**: Material-UI (MUI)
- **Styling**: Emotion + CSS-in-JS
- **Testing**: Jest + React Testing Library
- **Code Quality**: Biome for formatting and linting

### Backend (`apps/backend`)

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Payments**: Stripe integration
- **Email**: Nodemailer with HTML templates
- **Validation**: Zod for runtime validation
- **Security**: Helmet, CORS, rate limiting

### Shared (`packages/shared`)

- Common TypeScript types and interfaces
- Utility functions for dates, currency, validation
- API constants and endpoints
- Error and success message constants

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Material-UI (MUI)
- Emotion
- React Testing Library

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Stripe
- Nodemailer
- JWT
- Zod

### DevOps & Tools
- Docker & Docker Compose
- Biome (formatting & linting)
- ESLint & Prettier (backend)
- Husky (git hooks)
- PNPM workspaces

## 🔧 Configuration

### Code Quality

The monorepo uses **Biome** for consistent code formatting and linting across all packages:

- Shared configuration in `biome.json`
- Automatic formatting on save (if configured in your editor)
- Pre-commit hooks with Husky

### Environment Variables

Backend environment variables are located in `apps/backend/.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db

# JWT
JWT_SECRET=your-secret-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🏃‍♂️ Development Workflow

1. **Start development environment**:
   ```bash
   pnpm docker:up    # Start database
   pnpm dev          # Start both apps
   ```

2. **Make changes** in either `apps/frontend` or `apps/backend`

3. **Run quality checks**:
   ```bash
   pnpm check:fix    # Format and lint
   pnpm test         # Run tests
   ```

4. **Database changes**:
   ```bash
   # After modifying prisma/schema.prisma
   pnpm db:migrate
   pnpm db:generate
   ```

## 🚀 Deployment

### Frontend
```bash
pnpm build:frontend
# Deploy contents of apps/frontend/build/
```

### Backend
```bash
pnpm build:backend
# Deploy apps/backend/dist/ with Node.js
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm check:fix` to format code
4. Run `pnpm test` to ensure tests pass
5. Create a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Frontend Documentation](./apps/frontend/README.md)
- [Backend Documentation](./apps/backend/README.md)
- [API Documentation](./apps/backend/README.md#api-documentation)