
import React, { createContext, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast'; 

// Hooks and service
import { useAuthState } from '@/hooks/useAuthState';
import { useProfile } from '@/hooks/useProfile';
import { useUserRole } from '@/hooks/useUserRole';
import { 
  signInUser, 
  signUpUser, 
  signOutUser,
  updateUserProfile,
  resetPassword,
  changePassword
} from '@/services/authService';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any, data?: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  changePassword: (newPassword: string) => Promise<{ error: any }>;
  loading: boolean; 
  isAdmin: boolean;
  isRestaurantOwner: boolean;
  isCustomer: boolean;
  profile: any; 
  refreshProfile: () => Promise<void>;
  updateProfile: (data: Record<string, any>) => Promise<{ success: boolean, error?: string }>;
  isLoading: boolean; 
  profileLoading?: boolean;
  roleLoading?: boolean;
  error?: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { session, user, loading, isLoading: authStateIsLoading, error: authError } = useAuthState();
  const { profile, refreshProfile, updateProfile, loading: profileLoading, error: profileError } = useProfile(user); 
  const { isAdmin, isRestaurantOwner, isCustomer, loading: roleLoading, error: roleError } = useUserRole(user); 
  const { toast } = useToast();

  const handleSignIn = async (email: string, password: string) => {
    return signInUser(email, password, toast);
  };

  const handleSignUp = async (email: string, password: string, metadata?: any) => {
    return signUpUser(email, password, metadata, toast);
  };

  const handleResetPassword = async (email: string) => {
    return resetPassword(email, toast);
  };

  const handleChangePassword = async (newPassword: string) => {
    return changePassword(newPassword, toast);
  };

  const handleUpdateProfile = async (data: Record<string, any>) => {
    if (!user) return { success: false, error: "المستخدم غير مسجل الدخول" };
    return updateProfile(data);
  };

  // الجمع بين أخطاء الـ hooks المختلفة
  const error = authError || profileError || roleError;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: signOutUser,
        resetPassword: handleResetPassword,
        changePassword: handleChangePassword,
        loading, 
        isAdmin,
        isRestaurantOwner,
        isCustomer,
        profile, 
        refreshProfile,
        updateProfile: handleUpdateProfile,
        isLoading: authStateIsLoading,
        profileLoading,
        roleLoading,
        error
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
