import React, { createContext, useContext, useState } from 'react'


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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