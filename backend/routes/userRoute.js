import express from "express";
const router = express.Router();
import {
  userAuth,
  getuserProfile,
  registerUser,
  UpdateuserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/login", userAuth);

router.route("/").post(registerUser);

router
  .route("/profile")
  .get(protect, getuserProfile)
  .put(protect, UpdateuserProfile);

export default router;
