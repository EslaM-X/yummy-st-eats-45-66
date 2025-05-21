
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useProfile = (user: User | null) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfile = useCallback(async (userId: string) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null); // Clear profile on error
        return;
      }
      
      console.log("Profile data:", data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      // Use setTimeout to prevent potential deadlocks with auth state changes
      setTimeout(() => {
        fetchProfile(user.id);
      }, 0);
    } else {
      setProfile(null); // Clear profile if no user
    }
  }, [user, fetchProfile]);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  return { profile, loading, refreshProfile, fetchProfile }; // Exposing loading state and fetchProfile for direct use if needed
};
