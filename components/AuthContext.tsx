import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = () => {
    console.log("AuthContext: login function called");
    console.log("AuthContext: Setting isAuthenticated to true");
    setIsAuthenticated(true);
    console.log("AuthContext: isAuthenticated set to true");
  };

  const logout = () => {
    console.log("AuthContext: logout function called");
    console.log("AuthContext: Setting isAuthenticated to false");
    setIsAuthenticated(false);
    console.log("AuthContext: isAuthenticated set to false");
  };

  console.log("AuthContext: Current isAuthenticated state:", isAuthenticated);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
