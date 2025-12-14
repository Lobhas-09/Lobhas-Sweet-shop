// ...existing code...
import Sweet from '../models/sweet.model';
import { Document } from 'mongoose';

interface SweetDocument extends Document {
    name: string;
    category: string;
    price: number;
    quantity: number;
}

export class SweetService {
    async createSweet(sweetData: Partial<SweetDocument>): Promise<SweetDocument> {
        const sweet = new Sweet(sweetData);
        return (await sweet.save()) as unknown as SweetDocument;
    }

    async getAllSweets(): Promise<SweetDocument[]> {
        return await Sweet.find();
    }

    async getSweetById(id: string): Promise<SweetDocument | null> {
        return await Sweet.findById(id);
    }

    async updateSweet(id: string, sweetData: Partial<SweetDocument>): Promise<SweetDocument | null> {
        return await Sweet.findByIdAndUpdate(id, sweetData, { new: true });
    }

    async deleteSweet(id: string): Promise<SweetDocument | null> {
        return await Sweet.findByIdAndDelete(id);
    }

    async searchSweets(query: { name?: string; category?: string; minPrice?: number; maxPrice?: number }): Promise<SweetDocument[]> {
        const filter: any = {};
        if (query.name) {
            filter.name = { $regex: query.name, $options: 'i' };
        }
        if (query.category) {
            filter.category = query.category;
        }
        if (query.minPrice !== undefined || query.maxPrice !== undefined) {
            filter.price = {};
            if (query.minPrice !== undefined) filter.price.$gte = query.minPrice;
            if (query.maxPrice !== undefined) filter.price.$lte = query.maxPrice;
        }
        return await Sweet.find(filter);
    }

    async purchaseSweet(id: string, quantity: number): Promise<SweetDocument | null> {
        return await Sweet.findByIdAndUpdate(id, { $inc: { quantity: -quantity } }, { new: true });
    }

    async restockSweet(id: string, quantity: number): Promise<SweetDocument | null> {
        return await Sweet.findByIdAndUpdate(id, { $inc: { quantity: quantity } }, { new: true });
    }
}

export default new SweetService();
// ...existing code...