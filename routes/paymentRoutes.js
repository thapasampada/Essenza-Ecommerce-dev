// backend/routes/paymentRoutes.js
import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { initiatePayment, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

// POST /api/payment/initiate
router.post("/initiate", requireSignIn, initiatePayment);

// POST /api/payment/verify
router.post("/verify", requireSignIn, verifyPayment);

export default router;
