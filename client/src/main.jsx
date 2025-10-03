import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Providers
import { ChatProvider } from "./contexts/useChat";
import { UserProvider } from "./contexts/useUser.jsx";
import { CartProvider } from "./contexts/useCart.jsx";
import { ProductProvider } from "./contexts/useProduct.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </ChatProvider>
  </StrictMode>,
);
