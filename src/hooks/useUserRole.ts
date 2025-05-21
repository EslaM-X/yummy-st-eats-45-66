
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useUserRole = (user: User | null) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkUserRole = useCallback(async (userId: string) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      console.log("Checking user role for:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking user role:', error);
        setIsAdmin(false); // Reset on error
        return;
      }
      
      console.log("User role data:", data);
      setIsAdmin(data?.user_type === 'admin');
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      // Use setTimeout to prevent potential deadlocks with auth state changes
      setTimeout(() => {
        checkUserRole(user.id);
      }, 0);
    } else {
      setIsAdmin(false); // Reset if no user
    }
  }, [user, checkUserRole]);

  return { isAdmin, loading, checkUserRole }; // Exposing loading state and checkUserRole for direct use if needed
};
