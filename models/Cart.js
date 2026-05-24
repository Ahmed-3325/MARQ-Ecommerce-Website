import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    price: Number,
    addedAt: Date,
  }],
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  totalPrice: Number,
  totalItems: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Cart', cartSchema);
