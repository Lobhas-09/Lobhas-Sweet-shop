import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service';
import { Sweet } from '../models/sweet.model';

const inventoryService = new InventoryService();

// Purchase a sweet
export const purchaseSweet = async (req: Request, res: Response) => {
    const sweetId = req.params.id;
    const quantity = req.body.quantity;

    try {
        const updatedSweet = await inventoryService.purchaseSweet(sweetId, quantity);
        res.status(200).json(updatedSweet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Restock a sweet (Admin only)
export const restockSweet = async (req: Request, res: Response) => {
    const sweetId = req.params.id;
    const quantity = req.body.quantity;

    try {
        const updatedSweet = await inventoryService.restockSweet(sweetId, quantity);
        res.status(200).json(updatedSweet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};