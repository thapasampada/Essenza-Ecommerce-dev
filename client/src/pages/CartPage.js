import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast'

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
const totalPrice = () => {
  try {
    const total = cart?.reduce((acc, item) => {
      // If product is nested inside item.product
      const price = item.product ? item.product.price : item.price;
      const quantity = item.quantity || 1;
      return acc + price * quantity;
    }, 0);

    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "NRP",
    });
  } catch (error) {
    console.log(error);
    return "Rs.0";
  }
};

  // delete cart item
  const removeCartItem = async (pid) => {
    try {
      const { data } = await axios.delete(`http://localhost:8081/api/v1/cart/remove/${pid}`, {
        headers: { Authorization: auth.token },
      });
      setCart(data.products);
      toast.success("Item removed");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  //update quantity
  const updateQuantity = (pid, quantity) => {
  try {
    const updatedCart = cart.map((item) => {
      if (item.product._id === pid) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updatedCart);

    // Optional: update backend cart if using user-specific cart
    axios.put(
      `http://localhost:8081/api/v1/cart/update/${pid}`,
      { quantity },
      { headers: { Authorization: auth.token } }
    ).catch(err => console.log(err));
  } catch (error) {
    console.log(error);
    toast.error("Failed to update quantity");
  }
};


  return (
    <Layout>
       <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2 mb-1'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className='text-center'>
              {cart?.length ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            {
              cart?.map((p, index) => (
                <div key={`${p._id}-${index}`} className='row mb-2 p-3 card flex-row'>
                  <div className='col-md-4'>
                   <img 
                    src={`http://localhost:8081/api/v1/product/product-photo/${p.product._id}`} 
                    className="card-img-top" 
                    alt={p.product.name} 
                  />
                  </div>
                  <div className='col-md-8'>
                    <h5 className="card-title">{p.product.name}</h5>
                    <p className="card-text">{p.product.description}</p>
                    <p className="card-text">Rs.{p.product.price}</p>
                    <div className="d-flex align-items-center mb-2">
                      <span className="me-2">Quantity:</span>
                      <input 
                        type="number" 
                        min={1} 
                        value={p.quantity || 1} 
                        onChange={(e) => updateQuantity(p.product._id, parseInt(e.target.value))} 
                        className="form-control" 
                        style={{ width: "70px" }}
                      />
                    </div>
                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                  </div>
                </div>
              )) 
            }
          </div>
          <div className='col-md-4 text-center'>
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
              <div className='mb-3'>
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button className='bth bth-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
              </div>
              </>
            ): (
              <div className='mb-3'>
                {
                  auth?.token ? (
                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button> 
                  ): (
                    <button className='btn btn-outline-warning' onClick={() => navigate('/login',{ state: "/cart"})}>Please Login to Checkout</button> 
                  )
                }
              </div>
            )}
          </div>
        </div>
       </div>
    </Layout>
  )
}

export default CartPage