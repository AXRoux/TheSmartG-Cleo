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
    const checkAuth = async () => {
      const authToken = getCookie('auth-token');
      const userId = getCookie('user-id');
      if (!authToken || !userId) {
        setIsLoading(false);
        return;
      }

      try {
        const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string | undefined;
        if (!convexUrl) {
          setIsLoading(false);
          return;
        }

        const { ConvexHttpClient } = await import('convex/browser');
        const convex = new ConvexHttpClient(convexUrl);
        const current = await convex.query(api.auth.getCurrentUser, { userId: userId as Id<'users'> });
        if (current) {
          setUser(current as User);
        }
      } catch (err) {
        console.error('Auth bootstrap error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Use Convex authenticateUser mutation
      const result = await (await import("convex/browser")).ConvexHttpClient;
      const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string;
      if (!convexUrl) {
        console.error('NEXT_PUBLIC_CONVEX_URL not set');
        setIsLoading(false);
        return false;
      }
      const Client = (await import('convex/browser')).ConvexHttpClient;
      const convex = new Client(convexUrl);
      const authenticated = await convex.mutation(api.auth.authenticateUser, { email, password });

      const authToken = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setCookie('auth-token', authToken, 7);
      setCookie('user-id', authenticated._id, 7);
      localStorage.setItem('currentUserId', authenticated._id);
      
      setUser({
        _id: authenticated._id,
        email: authenticated.email,
        name: authenticated.name,
        role: authenticated.role,
        isActive: authenticated.isActive,
      });
      setIsLoading(false);
      return true;
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
