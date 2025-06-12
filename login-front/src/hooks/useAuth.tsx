
import React, { useState, useEffect, useContext, createContext } from 'react';
import { loginUser, registerUser } from '../api/auth'; 
import type { User } from '../types'; // 
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {

      const { accessToken, user: loggedInUser } = await loginUser(email, password);
      localStorage.setItem('token', accessToken); 
      localStorage.setItem('user', JSON.stringify(loggedInUser)); 
      setIsAuthenticated(true);
      setUser(loggedInUser);
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error; 
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await registerUser(email, password);
      
      await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    
 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};