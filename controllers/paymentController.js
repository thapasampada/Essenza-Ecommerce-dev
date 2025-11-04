import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import Cart from "../models/cartModel.js";

// Step 1: Initiate payment (mock eSewa)
export const initiatePayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id;

    const orderId = "ORDER" + Date.now(); // unique orderId

    res.json({
      url: "/fake-esewa",
      params: {
        pid: "MOCKPID" + Date.now(),
        scd: "EPAYTEST",
        su: `/payment-success?orderId=${orderId}&amt=${amount}`,
        fu: `/payment-failure`,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Step 2: Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { orderId: incomingOrderId, amt } = req.body;
    const userId = req.user._id;

    if (!amt) return res.status(400).json({ message: "Amount is required" });

    // Fetch user's cart
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Use incoming orderId or fallback to a new one
    const orderId = incomingOrderId || "ORDER" + Date.now();
    console.log("Creating order with orderId:", orderId);

    // Prevent duplicate orderId insertion
    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return res.status(400).json({ message: "Order already exists" });
    }
    console.log("Payment verify body:", req.body);

    // Create order
    const order = await Order.create({
      orderId,
      user: userId,
      products: cart.products.map(p => ({
        product: p.product._id,
        quantity: p.quantity,
      })),
      totalAmount: amt,
      paymentStatus: "Success",
    });

    // Save payment info
    await Payment.create({
      userId,
      orderId,
      amount: amt,
      token: "MOCKTOKEN" + Date.now(),
      productIdentity: cart.products.map(p => p.product._id).join(","),
      productName: cart.products.map(p => p.product.name).join(", "),
      state: "completed",
      idx: Date.now().toString(),
    });

    // Clear cart
    cart.products = [];
    await cart.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error("verifyPayment error:", error);
    res.status(500).json({ message: error.message });
  }
};
