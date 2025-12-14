import { Sweet } from '../models/sweet.model';
import { User } from '../models/user.model';
import { NotFoundError, UnauthorizedError } from '../middleware/error.middleware';

export class InventoryService {
    async purchaseSweet(sweetId: string, userId: string, quantity: number) {
        const sweet = await Sweet.findById(sweetId);
        if (!sweet) {
            throw new NotFoundError('Sweet not found');
        }
        if (sweet.quantity < quantity) {
            throw new UnauthorizedError('Insufficient quantity in stock');
        }
        sweet.quantity -= quantity;
        await sweet.save();
        return sweet;
    }

    async restockSweet(sweetId: string, userId: string, quantity: number) {
        const sweet = await Sweet.findById(sweetId);
        if (!sweet) {
            throw new NotFoundError('Sweet not found');
        }
        const user = await User.findById(userId);
        if (!user || !user.isAdmin) {
            throw new UnauthorizedError('Only admins can restock sweets');
        }
        sweet.quantity += quantity;
        await sweet.save();
        return sweet;
    }
}