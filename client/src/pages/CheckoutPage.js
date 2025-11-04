import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const user = auth?.user;
  const token = auth?.token;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("http://localhost:8081/api/v1/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data?.products?.length) {
          const total = data.products.reduce((sum, p) => {
            const qty = Number(p.quantity) || 1;
            const price = Number(p.product.price) || 0;
            return sum + qty * price;
          }, 0);

          console.log("Cart products:", data.products);
          console.log("Calculated total:", total);

          setCart(data);
          setTotalAmount(total);
        } else {
          setCart({ products: [] });
          setTotalAmount(0);
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
        alert("Cart or user data not loaded. Please try again.");
      }
    };

    if (token) fetchCart();
  }, [token]);

  const handleEsewaPay = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/payment/initiate",
        { amount: totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { pid, scd, su } = data.params;

      window.location.href = `/fake-esewa?pid=${pid}&amt=${totalAmount}&orderId=${su
        .split("orderId=")[1]
        .split("&")[0]}&userId=${user._id}`;
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="bg-white shadow-lg p-8 rounded-xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {cart.products.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.products.map((p) => (
            <div key={p.product._id} className="text-gray-700">
              {p.product.name} <strong>(Rs. {p.product.price})</strong> x {p.quantity} = Rs.{" "}
              {(p.quantity * p.product.price).toLocaleString("en-NP")}
            </div>
          ))
        )}
        <hr className="my-4" />
        <p className="font-bold text-lg">
          Total: Rs. {totalAmount.toLocaleString("en-NP")}
        </p>
        <button
          onClick={handleEsewaPay}
          disabled={cart.products.length === 0}
          className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          Pay with eSewa (Mock)
        </button>
      </div>
    </div>
  );
}
