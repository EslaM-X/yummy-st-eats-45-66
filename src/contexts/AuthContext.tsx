
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { cleanupAuthState } from '@/components/auth/AuthUtils';
import { useLanguage } from '@/contexts/LanguageContext';

export interface AuthContextType {
  user: User | null;
  profile: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  signIn: async () => {},
  signOut: () => {},
  loading: true,
  isLoading: true,
  refreshProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Initial auth state check
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setUser(data.session.user);
          await fetchUserProfile(data.session.user.id);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
          setUser(null);
          setProfile(null);
        } else if (event === 'USER_UPDATED' && session) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      }
    );
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Get user profile data from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfile(data);
      } else {
        // If no profile exists, we might want to create one
        console.log('No profile found for user:', userId);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setIsLoading(true);
    try {
      // Clean up any existing auth state first
      cleanupAuthState();
      
      // Try global sign out first to avoid conflicts
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        setUser(data.user);
        await fetchUserProfile(data.user.id);
        
        toast({
          title: language === 'ar' ? "تم تسجيل الدخول بنجاح" : "Successfully signed in",
          description: language === 'ar' ? "مرحباً بك في تطبيق ST🍕 Eat" : "Welcome to ST🍕 Eat",
        });
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        title: language === 'ar' ? "فشل تسجيل الدخول" : "Login Failed",
        description: error.message || (language === 'ar' ? "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى." : "An error occurred during login. Please try again."),
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      
      // Clean up auth state after sign out
      cleanupAuthState();
      
      toast({
        title: language === 'ar' ? "تم تسجيل الخروج" : "Signed Out",
        description: language === 'ar' ? "تم تسجيل خروجك بنجاح" : "You have successfully signed out",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: language === 'ar' ? "خطأ في تسجيل الخروج" : "Sign Out Error",
        description: error.message || (language === 'ar' ? "حدث خطأ أثناء تسجيل الخروج" : "An error occurred during sign out"),
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, signIn, signOut, loading, isLoading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
