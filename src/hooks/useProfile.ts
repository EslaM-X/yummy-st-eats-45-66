
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

/**
 * جلب وإدارة الملف الشخصي للمستخدم من Supabase
 */
export const useProfile = (user: User | null) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching profile for user:", userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
        setProfile(null);
        return;
      }
      
      console.log("Profile data:", data);
      
      if (!data) {
        // إذا لم يكن هناك ملف شخصي، حاول إنشاء واحد
        await createDefaultProfile(userId);
        return;
      }
      
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      setError(error.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // إنشاء ملف شخصي افتراضي إذا لم يكن موجودًا
  const createDefaultProfile = useCallback(async (userId: string) => {
    try {
      console.log("Creating default profile for user:", userId);
      
      // الحصول على معلومات المستخدم الأساسية من جلسة المصادقة
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) throw new Error("لا يمكن الحصول على معلومات المستخدم");
      
      const { data: insertedProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: userData.user.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (insertError) {
        console.error('Error creating default profile:', insertError);
        setError(insertError.message);
        return;
      }
      
      console.log("Default profile created:", insertedProfile);
      setProfile(insertedProfile);
    } catch (error: any) {
      console.error('Error creating default profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // استماع للتغييرات في كائن المستخدم
  useEffect(() => {
    if (user?.id) {
      // استخدام setTimeout لمنع التعارضات المحتملة مع تغيرات حالة المصادقة
      setTimeout(() => {
        fetchProfile(user.id);
      }, 0);
    } else {
      setProfile(null);
      setError(null);
    }
  }, [user, fetchProfile]);

  // تحديث الملف الشخصي
  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  // تحديث بيانات الملف الشخصي
  const updateProfile = useCallback(async (
    profileData: Record<string, any>
  ): Promise<{ success: boolean, error?: string }> => {
    if (!user?.id) return { success: false, error: "المستخدم غير مسجل الدخول" };
    
    try {
      setLoading(true);
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (updateError) {
        throw updateError;
      }
      
      // تحديث الملف الشخصي المحلي بعد التحديث الناجح
      await fetchProfile(user.id);
      
      return { success: true };
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [user, fetchProfile]);

  return { 
    profile, 
    loading, 
    error,
    refreshProfile, 
    fetchProfile,
    updateProfile
  };
};
