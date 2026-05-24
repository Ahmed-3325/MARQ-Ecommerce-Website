import express from 'express';
import Wishlist from '../models/Wishlist.js';

const router = express.Router();

// Get Wishlist
router.get('/:userId', async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!wishlist) wishlist = new Wishlist({ userId: req.params.userId, items: [] });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to Wishlist
router.post('/add/:userId', async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.params.userId, items: [] });
    }
    
    if (!wishlist.items.find(item => item.productId.toString() === productId)) {
      wishlist.items.push({ productId, addedAt: new Date() });
    }
    
    await wishlist.save();
    res.json({ message: 'Added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from Wishlist
router.delete('/remove/:userId/:productId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== req.params.productId);
    await wishlist.save();
    res.json({ message: 'Removed from wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
