import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPayment({ totalAmount }) {
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!totalAmount) {
      alert("Payment amount missing.");
      return;
    }

    // Generate unique orderId
    const orderId = "ORDER" + Date.now();

    // Redirect to FakeEsewa page
    const queryParams = new URLSearchParams({
      amt: totalAmount,
      orderId,
    }).toString();

    navigate(`/fake-esewa?${queryParams}`);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto text-center">
      <p className="text-lg mb-4">
        Total Amount: <strong>Rs. {totalAmount}</strong>
      </p>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Pay with eSewa
      </button>
    </div>
  );
}
