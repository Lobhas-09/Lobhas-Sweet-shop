import request from 'supertest';
import { app } from '../app'; // Adjust the import based on your app structure
import { connectDB, disconnectDB } from '../config'; // Adjust the import based on your config structure
import { Sweet } from '../models/sweet.model'; // Adjust the import based on your model structure

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Inventory Controller', () => {
    let sweetId: string;

    beforeEach(async () => {
        const sweet = await Sweet.create({
            name: 'Chocolate',
            category: 'Candy',
            price: 1.5,
            quantity: 10,
        });
        sweetId = sweet._id;
    });

    afterEach(async () => {
        await Sweet.deleteMany({});
    });

    it('should purchase a sweet and decrease its quantity', async () => {
        const response = await request(app)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${yourToken}`); // Replace with a valid token

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sweet purchased successfully');

        const updatedSweet = await Sweet.findById(sweetId);
        expect(updatedSweet.quantity).toBe(9);
    });

    it('should not allow purchasing a sweet with zero quantity', async () => {
        await Sweet.findByIdAndUpdate(sweetId, { quantity: 0 });

        const response = await request(app)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${yourToken}`); // Replace with a valid token

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Sweet is out of stock');
    });

    it('should restock a sweet and increase its quantity (Admin only)', async () => {
        const response = await request(app)
            .post(`/api/sweets/${sweetId}/restock`)
            .send({ quantity: 5 })
            .set('Authorization', `Bearer ${adminToken}`); // Replace with a valid admin token

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sweet restocked successfully');

        const updatedSweet = await Sweet.findById(sweetId);
        expect(updatedSweet.quantity).toBe(15);
    });

    it('should not allow non-admin users to restock sweets', async () => {
        const response = await request(app)
            .post(`/api/sweets/${sweetId}/restock`)
            .send({ quantity: 5 })
            .set('Authorization', `Bearer ${userToken}`); // Replace with a valid user token

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied');
    });
});