import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderById,
  getMyOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderById);

export default router;
