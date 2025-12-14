// import { Router } from 'express';
// import { 
//     addSweet, 
//     getAllSweets, 
//     updateSweet, 
//     deleteSweet, 
//     searchSweets 
// } from '../controllers/sweets.controller';
// import { authenticate } from '../middleware/auth.middleware';

// const router = Router();

// // Protected routes for managing sweets
// router.post('/', authenticate, addSweet);
// router.get('/', getAllSweets);
// router.get('/search', searchSweets);
// router.put('/:id', authenticate, updateSweet);
// router.delete('/:id', authenticate, deleteSweet); // Admin only

// export default router;
import { Router } from 'express';
import SweetService from '../services/sweets.service'; // default export is an instance

const router = Router();
const sweetService = SweetService; // instance exported as default

// Create sweet
router.post('/', async (req, res) => {
  try {
    const sweet = await sweetService.createSweet(req.body);
    res.status(201).json(sweet);
  } catch (err: any) {
    console.error('Create sweet error:', err);
    res.status(400).json({ message: err?.message || 'Create failed' });
  }
});

// List sweets
router.get('/', async (req, res) => {
  try {
    const sweets = await sweetService.getAllSweets();
    res.json(sweets);
  } catch (err: any) {
    console.error('Get sweets error:', err);
    res.status(500).json({ message: 'Failed to fetch sweets' });
  }
});

// Search
router.get('/search', async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const results = await sweetService.searchSweets({
      name: name as string | undefined,
      category: category as string | undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ message: 'Search failed' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updated = await sweetService.updateSweet(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err?.message || 'Update failed' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await sweetService.deleteSweet(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// Purchase
router.post('/:id/purchase', async (req, res) => {
  try {
    const updated = await sweetService.purchaseSweet(req.params.id, 1);
    if (!updated) return res.status(404).json({ message: 'Not found or out of stock' });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err?.message || 'Purchase failed' });
  }
});

// Restock
router.post('/:id/restock', async (req, res) => {
  try {
    const amount = Number(req.body.amount) || 0;
    if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    const updated = await sweetService.restockSweet(req.params.id, amount);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err?.message || 'Restock failed' });
  }
});

export default router;