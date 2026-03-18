import React, { createContext, useState, useEffect } from 'react'


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

// Fetch cart from backend
  const fetchCart = async () => {
    try {
      const response = await fetch(`${BASEURL}/api/cart/`)
      if(!response.ok){
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      const items = data.items || [];
      console.log(items);
    // Calculate total manually
    const calculatedTotal = items.reduce(
      (acc, item) => acc + item.product_price * item.quantity,
      0
    );
    setCartItems(items);
    setTotal(calculatedTotal);

    } catch (error) {
      console.error("Error fatching cart:", error);
    }
  }

  useEffect(()=>{
    fetchCart();
  }, []);

  
    // Add product to cart
    const addToCart = async(product) => {
      try{
          await fetch(`${BASEURL}/api/cart/add/`,{
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({product_id: product.id}),
          })
          fetchCart();
      } catch(error){
        console.error("Error adding to cart", error);
      }
    }


    // Remove product from cart
    const removeFromCart = async(item_id)=>{
      try{
          await fetch(`${BASEURL}/api/cart/remove/`,{
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({item_id}),
          });
          fetchCart();
      }catch(error){
          console.error("Error removing from cart", error);
      }
    }

    // Update Quantity
    const updateQuantity = async(item_id, quantity)=>{
      if (quantity < 1){
        await removeFromCart(item_id);
        return;
      }
      try{
          await fetch(`${BASEURL}/api/cart/update/`,{
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({item_id , quantity}),
          })
          fetchCart();
      }catch(error){
          console.error("Error removing from cart", error);
      }
    };


    return (
      <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity }}>
        {children}
      </CartContext.Provider>
    );
  };

// export const useCart = () => useContext(CartContext);