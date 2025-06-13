# 🚴‍♂️TravelBike Backend

**Backend service for TravelBike — scalable API with real-time support for collaborative trip planning and chat.**

---

## 🚀 Features

- **REST API for routes, groups, users, and more**
- **Real-time communication with WebSocket (Socket.io)**
- **Authentication & Authorization (JWT)**
- **PostgreSQL database integration with Prisma ORM**
- **Data validation with class-validator and class-transformer**
- **Built with scalable NestJS framework**

---

## 🛠️ Frontend Tech Stack

- **[NestJs (v11)](https://docs.nestjs.com/) - Node.js framework**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[Prisma](https://www.prisma.io/) - ORM for database** 
- **[Socket.io + @nestjs/websockets ](https://socket.io/) - real-time communication** 
- **[JWT (jsonwebtoken + @nestjs/jwt)](https://github.com/auth0/node-jsonwebtoken) – authentication**
- **[class-validator + class-transformer](https://github.com/typestack/class-validator) – validation and DTO transformation**
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js) - password hashing**
- **[cookie-parser](https://github.com/expressjs/cookie-parser) - cookie parsing**
- **[passport + passport-jwt](http://www.passportjs.org/packages/passport-jwt/) - JWT authorization strategy**

---

# 📦 Getting Started

## Prerequisites
- **Node.js (v18 or later)**
- **npm (comes with Node.js) or yarn**
- **PostgreSQL database running**

## 1. Clone the repository:

```
git clone https://github.com/g0rs1n/TravelBike-backend.git
cd TravelBike-backend
```

## 2. Install dependencies:

- ### Using npm:

```
npm install
```
- ### Using yarn:

```
yarn
```

## 3. Create `.env` file:

- ### Create a `.env` file in the root directory of your project with the following content:

```
# Replace with the full URL of your PostgreSQL database
DATABASE_URL=your_postgresql_database_url

# Frontend origin for CORS (your frontend app URL)
CORS_ORIGIN=http://localhost:3000

# Port on which the backend server will run
PORT=5001

# Secret key for signing JWT tokens (set a strong, random value)
JWT_SECRET=your-secure-jwt-secret

# Environment mode: "development"
NODE_ENV = "development" 
```

## 4. Run database migrations:

```
# Apply database migrations and generate Prisma Client

# Using npm:
npx prisma migrate dev

# Using yarn (works the same):
yarn prisma migrate dev
```

## 5. Start the development server:

- ### Using npm:

```
npm run start:dev
```
- ### Using yarn:

```
yarn start:dev
```

### After starting the backend, you can now launch the frontend.
### To do that, switch to the [TravelBike frontend repository](https://github.com/g0rs1n/TravelBike-frontend) and follow its setup instructions.

---

# Thank you for checking out TravelBike backend! ✨

## **_Happy cycling and coding!_** 🚴‍♂️💻