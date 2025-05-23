import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types';
import authService from '@/services/authService';

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ data: any; error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  signUp: async () => ({ data: null, error: null }),
  signIn: async () => ({ data: null, error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ data: null, error: null }),
  refreshProfile: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user profile data
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Exception fetching profile:', error);
      return null;
    }
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      if (profileData) {
        setProfile(profileData);
      }
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);

        // Fetch profile when user changes
        if (newSession?.user) {
          setTimeout(() => {
            fetchProfile(newSession.user.id).then(data => {
              setProfile(data);
            });
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        fetchProfile(currentSession.user.id).then(data => {
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata?: any) => {
    const { data: authData, error: authError } = await authService.signUp(email, password, metadata);

    if (authError) {
      return { data: null, error: authError };
    }

    // If sign up is successful and a user object is returned, create a profile
    if (authData?.user) {
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id, // Ensure this matches the primary key of profiles table
              email: authData.user.email,
              full_name: metadata?.full_name,
              username: metadata?.username,
              user_type: metadata?.user_type,
              phone: metadata?.phone,
              // avatar_url: metadata?.avatar_url, // Uncomment if you want to add a default avatar_url
            },
          ]);

        if (profileError) {
          console.error('Error creating profile after sign up:', profileError);
          // Optionally, handle profile creation error, e.g., by deleting the auth user
          // This requires admin privileges: await supabase.auth.admin.deleteUser(authData.user.id);
          return { data: authData, error: { message: `User created, but failed to save profile: ${profileError.message}` } };
        }
        // Profile created successfully, refresh the profile data in context
        await refreshProfile();
      } catch (profileCreationError) {
        console.error('Exception creating profile after sign up:', profileCreationError);
        return { data: authData, error: { message: 'User created, but an exception occurred while saving profile.' } };
      }
    }

    return { data: authData, error: null };
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await authService.signIn(email, password);

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const resetPassword = async (email: string) => {
    return await authService.resetPassword(email);
  };

  const value = {
    user,
    profile,
    session,
    isAuthenticated: !!user,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
