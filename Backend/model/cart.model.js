const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = {Cart}