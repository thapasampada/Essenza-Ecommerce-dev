import express from "express";
import mongoose from "mongoose";
import Cart from "../models/cartModel.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { updateCartItemQuantity } from "../controllers/cartController.js";

const router = express.Router();

// Get current user's cart
router.get("/", requireSignIn, async (req, res) => {
  try {
    console.log("User fetching cart:", req.user._id);

   const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "products.product",
      model: "Products" // <- match the exported model name
    });

    console.log("Cart fetched:", cart);
    res.json(cart || { products: [] });
  } catch (error) {
    console.error("FULL CART ERROR:", error);
    res.status(500).json({ success: false, message: error.message, stack: error.stack });
  }
});

// Add product to cart
router.post("/add", requireSignIn, async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, products: [] });

    const existingItem = cart.products.find(p => p.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.products.push({ product: productId });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove product from cart
router.delete("/remove/:pid", requireSignIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = new mongoose.Types.ObjectId(req.params.pid); // 👈 convert to ObjectId

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate("products.product");

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, products: cart.products });
  } catch (error) {
    console.error("REMOVE CART ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to remove item", error: error.message });
  }
});


// Update cart item quantity
router.put("/update/:pid", requireSignIn, updateCartItemQuantity);


export default router;