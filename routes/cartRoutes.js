import express from "express";
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
router.delete("/remove/:productId", requireSignIn, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    cart.products = cart.products.filter(p => p.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart item quantity
router.put("/update/:pid", requireSignIn, updateCartItemQuantity);


export default router;
