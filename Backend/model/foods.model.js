const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imgUrl: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
