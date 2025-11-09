import { User } from '@/modules/user/types/user.types';
import { router } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { getAuth } from '@/lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseCreateUser,
  signOut as firebaseSignOut,
} from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  // Legacy methods for OAuth (Google, Apple)
  login: (userData: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Convert Firebase user to our User type
const mapFirebaseUserToUser = (firebaseUser: FirebaseAuthTypes.User | null): User | null => {
  if (!firebaseUser) return null;

  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    email: firebaseUser.email || '',
    image: firebaseUser.photoURL || undefined,
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      try {
        const mappedUser = mapFirebaseUserToUser(firebaseUser);
        setUser(mappedUser);
        setIsLoading(false);
      } catch (error) {
        console.error('Firebase auth state error:', error);
        setUser(null);
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const userCredential = await firebaseSignIn(auth, email, password);
      const mappedUser = mapFirebaseUserToUser(userCredential.user);
      setUser(mappedUser);
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Firebase sign in error:', error);
      // Map Firebase errors to user-friendly messages
      let errorMessage = 'Failed to sign in. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      throw new Error(errorMessage);
    }
  };

  const createUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const userCredential = await firebaseCreateUser(auth, email, password);
      const mappedUser = mapFirebaseUserToUser(userCredential.user);
      setUser(mappedUser);
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Firebase sign up error:', error);
      // Map Firebase errors to user-friendly messages
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password accounts are not enabled.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      }
      throw new Error(errorMessage);
    }
  };

  const signOut = async () => {
    try {
      const auth = getAuth();
      await firebaseSignOut(auth);
      setUser(null);
      router.replace('/login');
    } catch (error) {
      console.error('Firebase sign out error:', error);
      throw error;
    }
  };

  // Legacy methods for OAuth (Google, Apple) - keep for backward compatibility
  const login = async (userData: User, token: string) => {
    // For OAuth, we'll still use the old method for now
    // This can be updated later to use Firebase OAuth providers
    setUser(userData);
    router.replace('/(tabs)');
  };

  const logout = async () => {
    // If user is signed in with Firebase, use signOut
    const auth = getAuth();
    if (auth.currentUser) {
      await signOut();
    } else {
      // Otherwise, just clear local state
      setUser(null);
      router.replace('/login');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
