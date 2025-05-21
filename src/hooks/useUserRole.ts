
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useUserRole = (user: User | null) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkUserRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error checking user role:', error);
        setIsAdmin(false); // Reset on error
        return;
      }
      setIsAdmin(data?.user_type === 'admin');
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      checkUserRole(user.id);
    } else {
      setIsAdmin(false); // Reset if no user
    }
  }, [user, checkUserRole]);

  return { isAdmin, checkUserRole }; // Exposing checkUserRole for direct use if needed
};

