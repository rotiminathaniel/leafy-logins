
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('agrisiti_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  async function login(email, password) {
    // Demo credentials check
    if (email === 'admin@agrisiti.com' && password === 'password') {
      const user = { email, name: 'Admin User', role: 'admin' };
      setCurrentUser(user);
      localStorage.setItem('agrisiti_user', JSON.stringify(user));
      toast.success("Successfully logged in!");
      return { success: true, user };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('agrisiti_user');
    toast.info("You have been logged out");
  }

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
