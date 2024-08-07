const express = require("express");
const cors = require("cors");
const { ConnectionToDB } = require("./config/db.config");
const { productRouter } = require("./router/products.router");
const { cartRouter } = require("./router/cart.router");
require("dotenv").config();

const port = process.env.PORT || 8100;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Server is up!");
});

app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(port, async () => {
  try {
    ConnectionToDB;
    console.log("Database connected successfully!");
    console.log(`Server is running at port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
