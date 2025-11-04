import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "users",
    required: true,
  },
  products: [
    {
      product: { type: mongoose.ObjectId, ref: "Products" },
      quantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    default: "Unverified",
  },
}, { timestamps: true });

export default mongoose.model("orders", orderSchema);
