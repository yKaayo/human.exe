import { createContext, useContext, useEffect, useState } from "react";

// Services
import { getItems } from "../services/CartApi";

// Context
import { useUser } from "../contexts/useUser";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    const fetchInitialCart = async () => {
      try {
        if (!user?.id) {
          setCart([]);
          return;
        }

        const initialItems = await getItems(user.id);
        console.log(initialItems);

        setCart(initialItems);
      } catch (error) {
        console.error("Erro ao carregar o carrinho inicial:", error);
        setCart([]);
      }
    };

    fetchInitialCart();
  }, [user]);

  const getCard = async () => {
      try {
        if (!user?.id) {
          setCart([]);
          return;
        }

        const initialItems = await getItems(user.id);
        console.log(initialItems);

        setCart(initialItems);
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
        setCart([]);
      }
    };

  const addCartItem = (item) => {
    const itemExists = cart.find((cartItem) => cartItem.id === item.id);

    if (itemExists) {
      setCart(cart.map((cartItem) => !cartItem.id === item.id && cartItem));
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeCartItem = (itemId) => {
    const newCart = cart.filter((item) => item.id !== itemId);
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItem,
        removeCartItem,
        getCard
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
