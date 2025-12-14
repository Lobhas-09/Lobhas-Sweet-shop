import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import authRoutes from './routes/auth.routes';
import sweetsRoutes from './routes/sweets.routes';
import errorMiddleware from './middleware/error.middleware';
import { config } from './config';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Export app (database connection is handled in index.ts)

export default app;