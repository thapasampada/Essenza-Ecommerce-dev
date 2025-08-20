// context/cart.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  // Fetch cart when user logs in
  useEffect(() => {
    if (auth?.token) {
      axios.get("http://localhost:8081/api/v1/cart", {
        headers: { Authorization: auth.token },
      })
      .then(res => setCart(res.data?.products || []))
      .catch(err => console.log(err));
    } else {
      setCart([]);
    }
  }, [auth]);

  return <CartContext.Provider value={[cart, setCart]}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
