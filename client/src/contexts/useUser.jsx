import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", userData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <ChatContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
