import Cart from "../models/cartModel.js";

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { pid } = req.params;      // product id
    const { quantity } = req.body;   // new quantity
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const itemIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (itemIndex === -1)
      return res.status(404).json({ success: false, message: "Product not in cart" });

    cart.products[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, products: cart.products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating cart", error });
  }
};
