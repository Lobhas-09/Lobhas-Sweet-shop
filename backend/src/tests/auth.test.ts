import request from 'supertest';
import app from '../app'; // Adjust the import based on your app structure
import { User } from '../models/user.model'; // Adjust the import based on your model structure
import { connectDB, disconnectDB } from '../config'; // Adjust the import based on your config structure

describe('Auth Controller', () => {
  beforeAll(async () => {
    await connectDB(); // Connect to the database before tests
  });

  afterAll(async () => {
    await disconnectDB(); // Disconnect from the database after tests
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 400 for duplicate username', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          password: 'anotherpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Username already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in an existing user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});