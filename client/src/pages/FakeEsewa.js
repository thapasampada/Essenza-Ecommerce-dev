import React from "react";
import { useNavigate } from "react-router-dom";

export default function FakeEsewa() {
  const navigate = useNavigate();

  // Extract query params
  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get("orderId");
  const amt = queryParams.get("amt");

  if (!orderId || !amt) {
    return <p className="text-center mt-20">Invalid payment request.</p>;
  }

  const handleSuccess = () => {
    // Redirect to PaymentSuccess page with orderId and amt
    navigate(`/payment-success?orderId=${orderId}&amt=${amt}`);
  };

  const handleFailure = () => {
    navigate("/payment-failure");
  };

  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold mb-6">Mock eSewa Payment</h2>
      <p className="mb-4">Amount: Rs. {amt}</p>
      <button
        onClick={handleSuccess}
        className="btn text-white py-2 px-4 rounded-lg mr-4 hover:bg-green-700 transition"
      >
        Pay
      </button>
      {/* <button
        onClick={handleFailure}
        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
      >
        Fail Payment
      </button> */}
    </div>
  );
}
