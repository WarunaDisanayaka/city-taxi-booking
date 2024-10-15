// context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // State to store user data

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            // Check if the token has 3 parts
            const decodedToken = JSON.parse(atob(tokenParts[1]));
            setUser({ id: decodedToken.id, username: decodedToken.username });
            setIsAuthenticated(true);
          } else {
            console.error('Invalid token format');
            localStorage.removeItem('token'); // Optionally remove invalid token
          }
        } catch (error) {
          console.error('Error decoding token', error);
          localStorage.removeItem('token'); // Optionally remove the token
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading, user, setUser }} // Provide setUser here
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
