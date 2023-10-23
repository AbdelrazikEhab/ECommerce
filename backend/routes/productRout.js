import express from "express";
const router = express.Router();
import {
  getProduct,
  getProductByID,
} from "../controllers/productController.js";

router.route("/").get(getProduct);

router.route("/:id").get(getProductByID);
export default router;
