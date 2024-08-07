const { Product } = require("../model/foods.model");

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({ msg: "Getting all products!", allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const createProduct = async (req,res) => {
    const {name,description,imgUrl}=req.body;
  try {
const newProduct = new Product({name,description,imgUrl});
await newProduct.save();
res.status(200).json({ msg: "new product Added!", newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};


module.exports={getProducts,createProduct}