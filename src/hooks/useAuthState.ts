
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { cleanupAuthState } from '@/components/auth/AuthUtils';

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // For initial load
  const [isLoading, setIsLoading] = useState(true); // Potentially redundant, maps to original context's isLoading

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === "SIGNED_OUT") {
          cleanupAuthState();
          // Profile and isAdmin will be reset by their respective hooks reacting to user being null
        }
        
        setLoading(false);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Current session:", currentSession ? "Active" : "None");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, user, loading, isLoading };
};
