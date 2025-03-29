import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ id: userId });
    }
    setLoading(false);
  }, []);

  const signout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/login');
  };

  const login = async (email, password) => {
    try {
      // For Vercel deployment, we'll use a mock login
      // In a real deployment, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      const userId = 'user1';
      localStorage.setItem('userId', userId);
      setUser({ id: userId });
      navigate('/profile');
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
