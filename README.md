# Sweet Shop Management System

## Overview
The Sweet Shop Management System is a full-stack application designed to manage a sweet shop's inventory, user authentication, and sales. It consists of a backend API built with Node.js and Express, and a frontend application developed using React. The system allows users to register, log in, view available sweets, and manage inventory.

## Technologies Used
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **Frontend**: React, TypeScript
- **Testing**: Jest, Supertest
- **Containerization**: Docker

## Features
- User registration and login with token-based authentication.
- CRUD operations for managing sweets (add, update, delete).
- Inventory management for purchasing and restocking sweets.
- Search and filter functionality for sweets.
- Admin panel for managing sweets and inventory.

## Project Structure
```
sweet-shop-management
├── backend
│   ├── src
│   │   ├── index.ts
│   │   ├── app.ts
│   │   ├── config
│   │   │   └── index.ts
│   │   ├── controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── sweets.controller.ts
│   │   │   └── inventory.controller.ts
│   │   ├── services
│   │   │   ├── auth.service.ts
│   │   │   ├── sweets.service.ts
│   │   │   └── inventory.service.ts
│   │   ├── models
│   │   │   ├── user.model.ts
│   │   │   └── sweet.model.ts
│   │   ├── routes
│   │   │   ├── auth.routes.ts
│   │   │   └── sweets.routes.ts
│   │   ├── middleware
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── utils
│   │   │   └── validators.ts
│   │   └── tests
│   │       ├── auth.test.ts
│   │       ├── sweets.test.ts
│   │       └── inventory.test.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── index.tsx
│   │   ├── App.tsx
│   │   ├── api
│   │   │   └── api.ts
│   │   ├── pages
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── AdminPanel.tsx
│   │   ├── components
│   │   │   ├── SweetCard.tsx
│   │   │   ├── SweetForm.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── context
│   │   │   └── AuthContext.tsx
│   │   ├── hooks
│   │   │   └── useAuth.ts
│   │   └── tests
│   │       └── App.test.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── scripts
│   ├── seed.ts
│   └── setup.sh
├── docker
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
├── .gitignore
├── README.md
└── LICENSE
```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on the `.env.example` file and configure your MongoDB connection string.
4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ```

## Testing
To run the tests for the backend, navigate to the `backend` directory and run:
```
npm test
```

To run the tests for the frontend, navigate to the `frontend` directory and run:
```
npm test
```

## My AI Usage
- I used ChatGPT to brainstorm the API endpoint structures and to generate boilerplate code for the backend controllers and services.
- I utilized GitHub Copilot to assist in writing unit tests for the backend services and to help with the frontend components.
- The AI tools significantly sped up my development process by providing suggestions and reducing the amount of boilerplate code I had to write manually.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.