import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast'; // Keep for authService if passed as arg

// New hooks and service
import { useAuthState } from '@/hooks/useAuthState';
import { useProfile } from '@/hooks/useProfile';
import { useUserRole } from '@/hooks/useUserRole';
import { signInUser, signUpUser, signOutUser } from '@/services/authService';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<void>;
  loading: boolean; // From useAuthState
  isAdmin: boolean; // From useUserRole
  profile: any; // From useProfile
  refreshProfile: () => Promise<void>; // From useProfile
  isLoading: boolean; // From useAuthState
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { session, user, loading, isLoading: authStateIsLoading } = useAuthState();
  const { profile, refreshProfile, fetchProfile } = useProfile(user);
  const { isAdmin, checkUserRole } = useUserRole(user);
  const { toast } = useToast(); // This toast can be passed to service functions

  // The useEffects within useAuthState, useProfile, and useUserRole
  // handle the logic that was previously in the large useEffect in AuthProvider.
  // For example, when `user` changes (derived from useAuthState),
  // useProfile and useUserRole will automatically fetch/check data.

  // Modified service calls to pass toast
  const handleSignIn = async (email: string, password: string) => {
    // In a real scenario, signInUser would be modified to accept toast
    // For now, it uses its own useToast, which is problematic.
    // This demonstrates the pattern if authService was refactored to accept toast:
    // return signInUser(email, password, toast);
    return signInUser(email, password); // Using existing authService structure
  };

  const handleSignUp = async (email: string, password: string, metadata?: any) => {
    // return signUpUser(email, password, metadata, toast);
    return signUpUser(email, password, metadata); // Using existing authService structure
  };

  // SIGNED_OUT event in useAuthState handles cleanupAuthState.
  // Profile and isAdmin state are reset within their respective hooks when user becomes null.

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: signOutUser,
        loading, // from useAuthState
        isAdmin, // from useUserRole
        profile, // from useProfile
        refreshProfile, // from useProfile
        isLoading: authStateIsLoading, // from useAuthState, mapped to context's isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('يجب استخدام useAuth داخل AuthProvider');
  }
  return context;
};
