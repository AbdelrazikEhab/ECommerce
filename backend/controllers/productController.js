import Product from "../models/productmodel.js";
import asyncHandler from "express-async-handler";

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // res.status(401);
  // throw new Error("Not Authorized");
  res.json(products);
});

const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProduct, getProductByID };
