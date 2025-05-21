
import React, { createContext, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast'; 

// Hooks and service
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
  loading: boolean; 
  isAdmin: boolean; 
  profile: any; 
  refreshProfile: () => Promise<void>; 
  isLoading: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { session, user, loading, isLoading: authStateIsLoading } = useAuthState();
  // Removed fetchProfile and checkUserRole from useProfile and useUserRole destructuring
  // as they were not directly used in AuthProvider after previous refactoring.
  // Their primary effect is via useEffect within those hooks reacting to `user` changes.
  const { profile, refreshProfile } = useProfile(user); 
  const { isAdmin } = useUserRole(user); 
  const { toast } = useToast(); // Get the toast function here

  const handleSignIn = async (email: string, password: string) => {
    return signInUser(email, password, toast); // Pass toast to signInUser
  };

  const handleSignUp = async (email: string, password: string, metadata?: any) => {
    return signUpUser(email, password, metadata, toast); // Pass toast to signUpUser
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: signOutUser, // signOutUser does not use toast
        loading, 
        isAdmin, 
        profile, 
        refreshProfile, 
        isLoading: authStateIsLoading, 
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

