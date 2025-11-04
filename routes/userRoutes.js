// backend/routes/userRoutes.js
import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getUserOrders } from "../controllers/userController.js";

const router = express.Router();

// GET /api/v1/user/orders
router.get("/orders", requireSignIn, getUserOrders);


export default router;
