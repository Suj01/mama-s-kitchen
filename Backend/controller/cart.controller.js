const { Cart } = require("../model/cart.model");

const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("products.productId");
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const addToCartItem = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({ products: [{ productId, quantity: 1 }] });
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    const updatedCart = await Cart.findOne().populate("products.productId");
    res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = { getCartItems, addToCartItem };
