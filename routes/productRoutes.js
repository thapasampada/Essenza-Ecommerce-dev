import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

// Create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update product by product ID
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Get all products without pagination
router.get("/get-product", getProductController);

// Get all products with pagination support (page optional)
router.get("/product-list/:page", getProductController);

// Get single product by slug
router.get("/get-product/:slug", getSingleProductController);

// Get product photo by product ID
router.get("/product-photo/:pid", productPhotoController);

// Delete product by product ID
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

export default router;
