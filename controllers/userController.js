// backend/controllers/userController.js
import Order from "../models/Order.js";

// Get all orders for logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId }).populate(
      "products.product",
      "name price"
    );

    res.json({ success: true, orders });
  } catch (error) {
    console.error("getUserOrders error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
