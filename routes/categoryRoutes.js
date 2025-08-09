import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// Create category - only admin
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// Update category - only admin
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Get all categories - only admin (remove isAdmin if public)
router.get("/get-category", requireSignIn, isAdmin, categoryController);

// Get single category by id - only admin (remove isAdmin if public)
router.get("/single-category/:id", requireSignIn, isAdmin, singleCategoryController);

// Delete category - only admin
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;
