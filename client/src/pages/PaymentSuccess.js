import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Extract orderId and amount from query params
  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get("orderId");
  const totalAmount = queryParams.get("amt");

  // Get auth token from localStorage
  const authData = JSON.parse(localStorage.getItem("auth") || "{}");
  const token = authData?.token;

  useEffect(() => {
    const verifyPayment = async () => {
      if (!token) {
        alert("User not logged in. Payment verification failed.");
        navigate("/");
        return;
      }

      if (!orderId || !totalAmount) {
        alert("Payment details missing.");
        navigate("/");
        return;
      }

      console.log("Verify payload:", { orderId, amt: totalAmount });

      try {
        const response = await axios.post(
          "http://localhost:8081/api/payment/verify",
          { orderId, amt: totalAmount },
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );

        console.log("Payment verified:", response.data);
        setLoading(false);
      } catch (err) {
        console.error("Payment verification failed:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Payment verification failed.");
        navigate("/");
      }
    };

    verifyPayment();
  }, [orderId, totalAmount, token, navigate]);

  if (loading) return <p className="text-center mt-20">Processing payment...</p>;

  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h2>
      <p>Reference ID: {orderId}</p>
      <p>Thank you for your purchase.</p>
      <button
        onClick={() => navigate("/dashboard/user/orders")}
        className="mt-4 btn btn-primary"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
