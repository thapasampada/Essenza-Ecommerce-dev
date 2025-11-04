import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // reference to your User model
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: function() {
        return "ORDER" + Date.now();
      }
    },
    amount: {
      type: Number,
      required: true,
    },
    token: {
      type: String, // refId or payment token from eSewa
      required: true,
    },
    productIdentity: {
      type: String,
      default: "Essenza Perfume Order",
    },
    productName: {
      type: String,
      default: "Perfume Purchase",
    },
    state: {
      type: String,
      enum: ["pending", "failed", "completed", "Success"], // add Success
      default: "pending",
    },
    idx: {
      type: String, // unique internal identifier
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
