import request from 'supertest';
import { app } from '../app'; // Adjust the import based on your app structure
import { Sweet } from '../models/sweet.model'; // Adjust the import based on your model structure

describe('Sweets API', () => {
  let token: string;

  beforeAll(async () => {
    // Assuming you have a way to register a user and get a token
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });
    token = response.body.token;
  });

  afterAll(async () => {
    // Clean up the database after tests
    await Sweet.deleteMany({});
  });

  describe('POST /api/sweets', () => {
    it('should add a new sweet', async () => {
      const sweetData = {
        name: 'Chocolate',
        category: 'Candy',
        price: 1.5,
        quantity: 100,
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${token}`)
        .send(sweetData);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(sweetData.name);
    });
  });

  describe('GET /api/sweets', () => {
    it('should return a list of sweets', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/sweets/search', () => {
    it('should search for sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search')
        .query({ name: 'Chocolate' })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    let sweetId: string;

    beforeAll(async () => {
      const sweet = new Sweet({
        name: 'Gummy Bears',
        category: 'Candy',
        price: 2.0,
        quantity: 50,
      });
      await sweet.save();
      sweetId = sweet._id;
    });

    it('should update a sweet', async () => {
      const updatedData = {
        name: 'Gummy Bears - Sour',
        category: 'Candy',
        price: 2.5,
        quantity: 60,
      };

      const response = await request(app)
        .put(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedData.name);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    let sweetId: string;

    beforeAll(async () => {
      const sweet = new Sweet({
        name: 'Lollipop',
        category: 'Candy',
        price: 0.5,
        quantity: 30,
      });
      await sweet.save();
      sweetId = sweet._id;
    });

    it('should delete a sweet', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });
});