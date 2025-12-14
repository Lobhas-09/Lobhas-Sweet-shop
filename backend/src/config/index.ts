import dotenv from 'dotenv';
dotenv.config();

export const config = {
  MONGODB_URI:
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL ||
    'mongodb://localhost:27017/sweet-shop',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  PORT: Number(process.env.PORT || 5000),
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default config;