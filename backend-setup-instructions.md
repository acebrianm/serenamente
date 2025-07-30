
# 🎟️ Event Ticketing Backend Service

This document outlines the setup and implementation details for an event ticketing backend service using a monorepo architecture. The backend is built using **Express.js**, **Node.js**, **PostgreSQL**, **Prisma**, and **TypeScript**.

## 🧱 Tech Stack

- Node.js with Express.js
- PostgreSQL as the database
- Prisma as the ORM
- Stripe SDK for payments
- Nodemailer for email sending
- TypeScript for type safety (no `any` usage)
- Docker Compose for local development
- .env for secrets
- Zod or similar for runtime validation
- Spanish messages for customer-facing strings and errors

---

## 📂 Folder Structure

```
/backend
├── src
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── middlewares
│   ├── utils
│   ├── prisma
│   └── index.ts
├── prisma
│   ├── schema.prisma
├── .env
├── Dockerfile
├── docker-compose.yml
└── tsconfig.json
```

---

## 🔐 Environment Variables (.env)

```
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
STRIPE_SECRET_KEY=your_stripe_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=email_password
```

---

## 🧑‍💻 User Endpoints

- **GET /user/me** – Get current authenticated user
- **POST /auth/register** – Create user (email, Google or Apple login)
- **POST /auth/reset-password** – Reset password (email)
- **DELETE /user** – Deactivate current user
- **PUT /user** – Update user profile
- **GET /admin/users** – Get all users (admin only)

## 🎫 Ticket Endpoints

- **GET /tickets/me** – See tickets of logged-in user
- **POST /admin/tickets** – Create ticket (admin/debug only)
- **GET /admin/tickets** – Get all tickets (admin only)
- **DELETE /admin/tickets/:id** – Deactivate ticket (admin only)
- **PUT /admin/tickets/:id** – Update ticket (admin only)

## 🎉 Event Endpoints

- **GET /events** – See all upcoming/public events
- **POST /admin/events** – Create event (admin only)
- **GET /admin/events** – Get all events (admin only)
- **DELETE /admin/events/:id** – Deactivate event (admin only)
- **PUT /admin/events/:id** – Update event (admin only)

---

## 🧬 Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  firstName String
  lastName  String
  email     String   @unique
  password  String
  phone     String?
  role      Role     @default(USER)
  isActive  Boolean  @default(true)
  tickets   Ticket[]
  createdAt DateTime @default(now())
}

model Ticket {
  id             String   @id @default(uuid())
  nameOfAttendee String
  event          Event    @relation(fields: [eventId], references: [id])
  eventId        String
  user           User     @relation(fields: [userId], references: [id])
  userId         String
  isActive       Boolean  @default(true)
  createdAt      DateTime @default(now())
}

model Event {
  id          String   @id @default(uuid())
  name        String
  description String
  address     String
  price       Float
  promoVideo  String?
  promoImages String[]
  isActive    Boolean  @default(true)
  tickets     Ticket[]
  date        DateTime
  createdAt   DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}
```

---

## 📨 Email Triggers

- When user registers → Welcome email (in Spanish)
- When user requests password reset → Recovery email
- When user purchases ticket → Ticket confirmation email

Use a service like **Nodemailer** and templates with variables.

---

## 🚀 Stripe Integration

- Handle payment with Stripe Checkout or PaymentIntent
- Webhook for payment confirmation → Create ticket in DB
- Store only relevant non-sensitive info

---

## 🔄 Docker Compose

```yaml
version: '3.8'
services:
  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 🛡️ Extra Enhancements

- JWT authentication with roles (user/admin)
- Input validation using Zod
- Spanish error messages with custom error middleware
- Logging using Winston or Pino
- Rate-limiting and Helmet for security
- ESLint + Prettier + Husky for linting/formatting

---

## 🧪 Testing

- Unit tests using Jest
- Integration tests for critical routes

---

## ✅ To Do

- [ ] Setup monorepo with FE and BE
- [ ] Initialize Prisma & DB
- [ ] Setup Stripe and webhooks
- [ ] Setup mailer with templates
- [ ] Write controller logic with DTOs
- [ ] Protect admin-only routes with middleware
- [ ] Add Docker support for full-stack dev
