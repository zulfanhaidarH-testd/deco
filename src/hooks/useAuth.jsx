// src/hooks/useAuth.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('decorinn_role');
    if (storedRole) {
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const login = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem('decorinn_role', selectedRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('decorinn_role');
  };

  const isAdmin = () => role === 'admin';
  const isUser = () => role === 'user';

  const value = {
    role,
    loading,
    login,
    logout,
    isAdmin,
    isUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};