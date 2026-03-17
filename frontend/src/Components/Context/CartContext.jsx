import React, { createContext, useState, useEffect } from 'react'


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);


  const fetchCart = async () => {
    try {
      const response = await fetch(`${BASEURL}/api/cart/`)
      if(!response.ok){
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      setCartItems(data.item || []);
      setTotal(data.total || 0);

    } catch (error) {
      console.error("Error fatching cart:", error);
    }
  }

  useEffect(()=>{
    fetchCart();
  }, []);

  
    // Add product to cart
    const addToCart = (product) => {
      const exist = cartItems.find((item) => item.id === product.id);
      if (exist) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    };


    // Remove product from cart
    const removeFromCart = (id) => {
      setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Update Quantity
    const updateQuantity = (id, quantity) => {
      if (quantity < 1) return;
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    };

    return (
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
        {children}
      </CartContext.Provider>
    );
  };

// export const useCart = () => useContext(CartContext);