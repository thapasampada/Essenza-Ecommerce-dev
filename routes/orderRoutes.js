import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

// ✅ Admin: Get all orders
router.get("/all", requireSignIn, isAdmin, getAllOrders);

export default router;
