"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { useRouter } from 'next/navigation';

interface User {
  _id: Id<"users">;
  email: string;
  name?: string;
  role: "admin" | "editor" | "viewer";
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cookie management functions
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = getCookie('auth-token');
      const userId = getCookie('user-id');
      
      if (authToken && userId) {
        // In a real app, you'd validate the token with your backend
        setUser({ 
          _id: userId as Id<"users">, 
          email: 'Vance@Stratir.com', 
          name: 'Vance Stratir', 
          role: 'admin',
          isActive: true 
        });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simple demo authentication - the user will be initialized in the database when needed
      if (email === 'Vance@Stratir.com' && password === 'admin123') {
        const userData = {
          _id: 'jn737k33cksxew8vypzg3457s57petqv' as Id<"users">,
          email: 'Vance@Stratir.com',
          name: 'Vance Stratir',
          role: 'admin' as const,
          isActive: true
        };
        
        // Generate a simple auth token
        const authToken = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Set secure cookies
        setCookie('auth-token', authToken, 7);
        setCookie('user-id', userData._id, 7);
        
        // Also keep localStorage for backward compatibility
        localStorage.setItem('currentUserId', userData._id);
        
        setUser(userData);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    
    // Clear cookies
    deleteCookie('auth-token');
    deleteCookie('user-id');
    
    // Clear localStorage
    localStorage.removeItem('currentUserId');
    
    // Redirect to login page
    router.push('/login');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
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
