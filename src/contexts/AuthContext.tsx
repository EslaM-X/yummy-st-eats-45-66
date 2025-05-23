
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/components/auth/AuthUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  clearAuthState: () => void;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  clearAuthState: () => {},
  refreshSession: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const clearAuthState = () => {
    setUser(null);
    setSession(null);
    setError(null);
    cleanupAuthState();
  };

  const refreshSession = async () => {
    try {
      setIsLoading(true);
      const { data: { session: refreshedSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Session refresh error:", error);
        setError(error.message);
        return false;
      }
      
      setSession(refreshedSession);
      setUser(refreshedSession?.user ?? null);
      return true;
    } catch (err: any) {
      console.error("Session refresh exception:", err);
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // First, set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        switch (event) {
          case "SIGNED_OUT":
            clearAuthState();
            break;
          case "TOKEN_REFRESHED":
            console.log("Token refreshed successfully");
            break;
          case "USER_UPDATED":
            console.log("User data updated");
            break;
        }
        
        setIsLoading(false);
      }
    );

    // Then check for an existing session
    const checkExistingSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          setError(error.message);
          clearAuthState();
        } else {
          console.log("Current session:", currentSession ? "Active" : "None");
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
        
        setIsLoading(false);
      } catch (err: any) {
        console.error("Session check exception:", err);
        setError(err.message);
        clearAuthState();
        setIsLoading(false);
      }
    };
    
    checkExistingSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    isLoading,
    error,
    isAuthenticated: !!user,
    clearAuthState,
    refreshSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
