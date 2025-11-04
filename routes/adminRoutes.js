import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin route to get all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsers);

export default router;
