import React, { useState, useEffect, useContext, createContext, useCallback } from 'react'; 
import { loginUser, registerUser } from '../api/auth'; 
import type { User } from '../types'; 

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Erro ao parsear usuário do localStorage:', e);
       
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setLoadingAuth(false); 
  }, []);

 
  const login = useCallback(async (email: string, password: string) => {
    setLoadingAuth(true);
    try {
      const { accessToken, user: loggedInUser } = await loginUser(email, password);
      localStorage.setItem('token', accessToken); 
      localStorage.setItem('user', JSON.stringify(loggedInUser)); 
      setIsAuthenticated(true);
      setUser(loggedInUser);
    } catch (error) {
      console.error('Login failed:', error);
     
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      throw error; 
    } finally {
      setLoadingAuth(false); 
    }
  }, []); 

  const register = useCallback(async (email: string, password: string) => {
    setLoadingAuth(true); 
    try {
      await registerUser(email, password);
      await login(email, password); 
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoadingAuth(false); 
    }
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loadingAuth }}>
      {loadingAuth ? ( 
        <div className="flex justify-center items-center min-h-screen text-xl text-gray-600">
          Carregando autenticação...
        </div>
      ) : (
        children
      )}
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