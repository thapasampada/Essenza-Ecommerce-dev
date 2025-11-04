import React, { useEffect, useState } from "react";
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const token = JSON.parse(localStorage.getItem("auth"))?.token;


    const fetchAllOrders = async () => {
        try {
        const res = await axios.get("http://localhost:8081/api/v1/order/all", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders || []);
        } catch (error) {
        console.error("Failed to fetch admin orders:", error.response?.data || error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);
  return (
    <Layout>
        <div className="row">
            <div className="col-md-3"><AdminMenu/></div>
            <div className="col-md-9" style={{ padding: "20px" }}>
            <h2>All Orders (Admin Dashboard)</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                <div
                    key={order._id}
                    style={{
                    background: "#f9f9f9",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    marginBottom: "15px",
                    padding: "15px",
                    }}
                >
                    <h3>Order ID: {order.orderId}</h3>
                    <p>
                    <strong>User:</strong> {order.user?.name} ({order.user?.email})
                    </p>
                    <p>
                    <strong>Amount:</strong> ₹{order.totalAmount}
                    </p>
                    <p>
                    <strong>Status:</strong> {order.paymentStatus}
                    </p>
                    <h4>Products:</h4>
                    <ul>
                    {order.products.map((item, i) => (
                        <li key={i}>
                        {item.product?.name} x {item.quantity} — ₹
                        {item.product?.price * item.quantity}
                        </li>
                    ))}
                    </ul>
                </div>
                ))
            )}
            </div>
        </div>
    </Layout>
  )
}
export default AdminOrders
