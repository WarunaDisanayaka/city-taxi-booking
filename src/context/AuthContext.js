// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      // Implement your logic to check if the user is logged in
      // This could be checking a token in localStorage or making an API call
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
