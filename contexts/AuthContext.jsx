import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("nc_news_user");
    if (saved) setUser(saved);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("nc_news_user", user);
    else localStorage.removeItem("nc_news_user");
  }, [user]);

  const login = (username) => setUser(username);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
