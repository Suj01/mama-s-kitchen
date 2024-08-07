const express = require("express");
const {
  getProducts,
  createProduct,
} = require("../controller/products.controller");

const productRouter = express.Router();

productRouter.get("/getProducts", getProducts);
productRouter.post("/postProduct", createProduct);

module.exports = { productRouter };
