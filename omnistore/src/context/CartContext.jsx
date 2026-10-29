import { createContext, useContext, useEffect, useState } from "react";


export const CartContext = createContext();

export function CartProvider({ children }) {
 const [cart, setCart] = useState(() => {
  try {
    const savedCart = localStorage.getItem("omnistore-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("omnistore-cart", JSON.stringify(cart));
}, [cart]);

  function addToCart(product) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  }

 
  function increaseQuantity(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  }


  function decreaseQuantity(id) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

 
  function removeFromCart(id) {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  }

 
  const cartCount = cart.reduce(
    (total, item) => total + item.qty,
    0
  );


  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
         setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}

