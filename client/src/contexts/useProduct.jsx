import { createContext, useContext, useState } from "react";

// Services
import { getAllProducts } from "../services/ProductApi";

const ChatContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await getAllProducts();
    if (!res) return;
    setProducts(res);
  };

  return (
    <ChatContext.Provider value={{ products, getProducts }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
