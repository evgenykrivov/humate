import * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  subscribeToAuthChanges,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logoutUser,
  signInWithGoogleAndGetJWT,
  signInWithGoogle,
  AuthResponse,
} from './firebase';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  jwtToken: string | null;
  userId: string | number | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGooglePopup: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(localStorage.getItem('humate_jwt_token'));
  const [userId, setUserId] = useState<string | number | null>(
    localStorage.getItem('humate_user_id')
  );
  const [loading, setLoading] = useState(true);

  // Subscribe to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setLoading(false);

      // If user logs out of Firebase, clear JWT
      if (!user) {
        setJwtToken(null);
        setUserId(null);
        localStorage.removeItem('humate_jwt_token');
        localStorage.removeItem('humate_user_id');
      }
    });

    // Unsubscribe on component unmount
    return unsubscribe;
  }, []);

  // Email/password login function
  const login = async (email: string, password: string) => {
    try {
      await loginWithEmailAndPassword(email, password);
      // TODO: Add backend JWT fetch for email login if needed
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Registration function
  const register = async (email: string, password: string) => {
    try {
      await registerWithEmailAndPassword(email, password);
      // TODO: Add backend JWT fetch for registration if needed
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Google login with backend JWT
  const loginWithGoogle = async () => {
    try {
      const authResponse: AuthResponse = await signInWithGoogleAndGetJWT();
      setJwtToken(authResponse.jwt);
      setUserId(authResponse.userId);
    } catch (error) {
      console.error('Google login error:', error);

      // Проверяем, есть ли Firebase пользователь
      if (currentUser) {
        console.log('User authenticated with Firebase, but backend authentication failed');
      }

      throw error;
    }
  };

  // Простой вход через Google без JWT (использует signInWithGoogle)
  const loginWithGooglePopup = async () => {
    try {
      await signInWithGoogle();
      // После успешного входа через Google, пользователь будет доступен через Firebase Auth
    } catch (error) {
      console.error('Google popup login error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutUser();
      setJwtToken(null);
      setUserId(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser && !!jwtToken,
    jwtToken,
    userId,
    loading,
    login,
    register,
    loginWithGoogle,
    loginWithGooglePopup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
