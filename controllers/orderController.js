import Order from "../models/Order.js";
import User from "../models/userModel.js"; // adjust the path if needed

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email") // populate user info
      .populate("products.product", "name price") // populate product details
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
