const express = require("express");
const {
  getCartItems,
  addToCartItem,
} = require("../controller/cart.controller");

const cartRouter = express.Router();

cartRouter.get("/getCartItems", getCartItems);
cartRouter.post("/addToCart", addToCartItem);

module.exports = { cartRouter };
