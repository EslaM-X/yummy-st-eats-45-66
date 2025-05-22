
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

/**
 * التحقق من صلاحيات المستخدم من Supabase
 */
export const useUserRole = (user: User | null) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkUserRole = useCallback(async (userId: string) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log("Checking user role for:", userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking user role:', error);
        setError(error.message);
        setIsAdmin(false);
        setIsRestaurantOwner(false);
        setIsCustomer(false);
        setUserType(null);
        return;
      }
      
      console.log("User role data:", data);
      
      const userRole = data?.user_type || 'customer';
      setUserType(userRole);
      
      // تعيين الصلاحيات بناءً على نوع المستخدم
      setIsAdmin(userRole === 'admin');
      setIsRestaurantOwner(userRole === 'restaurant_owner');
      setIsCustomer(userRole === 'customer' || !userRole);
      
    } catch (error: any) {
      console.error('Error checking user role:', error);
      setError(error.message);
      setIsAdmin(false);
      setIsRestaurantOwner(false);
      setIsCustomer(true); // افتراضيًا يكون مستخدم عادي
      setUserType(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      // استخدام setTimeout لمنع التعارضات المحتملة مع تغيرات حالة المصادقة
      setTimeout(() => {
        checkUserRole(user.id);
      }, 0);
    } else {
      setIsAdmin(false);
      setIsRestaurantOwner(false);
      setIsCustomer(false);
      setUserType(null);
    }
  }, [user, checkUserRole]);
  
  // تحديث صلاحيات المستخدم
  const updateUserRole = async (newRole: string): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          user_type: newRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // تحديث الحالة المحلية بعد التحديث الناجح
      await checkUserRole(user.id);
      
      return true;
    } catch (error: any) {
      console.error('Error updating user role:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { 
    isAdmin, 
    isRestaurantOwner, 
    isCustomer, 
    userType,
    loading, 
    error,
    checkUserRole,
    updateUserRole
  };
};
