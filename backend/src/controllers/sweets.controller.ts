import { Request, Response } from 'express';
import { SweetService } from '../services/sweets.service';
import { Sweet } from '../models/sweet.model';

const sweetService = new SweetService();

export const addSweet = async (req: Request, res: Response) => {
    try {
        const sweetData: Sweet = req.body;
        const newSweet = await sweetService.createSweet(sweetData);
        res.status(201).json(newSweet);
    } catch (error) {
        res.status(500).json({ message: 'Error adding sweet', error });
    }
};

export const getAllSweets = async (req: Request, res: Response) => {
    try {
        const sweets = await sweetService.getAllSweets();
        res.status(200).json(sweets);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving sweets', error });
    }
};

export const searchSweets = async (req: Request, res: Response) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;
        const sweets = await sweetService.searchSweets(name, category, minPrice, maxPrice);
        res.status(200).json(sweets);
    } catch (error) {
        res.status(500).json({ message: 'Error searching sweets', error });
    }
};

export const updateSweet = async (req: Request, res: Response) => {
    try {
        const sweetId = req.params.id;
        const sweetData: Sweet = req.body;
        const updatedSweet = await sweetService.updateSweet(sweetId, sweetData);
        res.status(200).json(updatedSweet);
    } catch (error) {
        res.status(500).json({ message: 'Error updating sweet', error });
    }
};

export const deleteSweet = async (req: Request, res: Response) => {
    try {
        const sweetId = req.params.id;
        await sweetService.deleteSweet(sweetId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting sweet', error });
    }
};