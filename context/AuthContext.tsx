import React, {createContext, useContext, useState, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../types/auth';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  isLoading: false,
  error: null,
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthAction = async (
    action: () => Promise<void>,
    errorMessage: string,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    await handleAuthAction(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = 'dummy-token';
      await AsyncStorage.setItem('userToken', token);
      setUser({token, email});
    }, 'Login failed. Please check your credentials');
  };

  const signup = async (email: string, password: string) => {
    await handleAuthAction(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = 'dummy-token';
      await AsyncStorage.setItem('userToken', token);
      setUser({token, email});
    }, 'Signup failed. Please try again');
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userDetails', 'user']);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error; // Re-throw to handle in components
    }
  };

  return (
    <AuthContext.Provider
      value={{user, login, signup, logout, isLoading, error}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
