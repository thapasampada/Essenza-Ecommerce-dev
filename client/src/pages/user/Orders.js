import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        const { data } = await axios.get(
          "http://localhost:8081/api/v1/user/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout title="Your Orders">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"><UserMenu /></div>
          <div className="col-md-9">
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="card mb-3 p-2">
                  <p>Order ID: {order.orderId}</p>
                  <p>Amount: Rs {order.totalAmount}</p>
                  <p>Status: {order.paymentStatus}</p>
                  <div>
                    <h5>Products:</h5>
                    <ul>
                      {order.products.map((item, index) => (
                        <li key={index}>
                          {item.product?.name} x {item.quantity} – Rs
                          {item.product?.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
