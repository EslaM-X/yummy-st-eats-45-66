
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { cleanupAuthState } from '@/components/auth/AuthUtils';

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // للتحميل الأولي
  const [isLoading, setIsLoading] = useState(true); // مطابقة للحالة الأصلية isLoading
  const [error, setError] = useState<string | null>(null);

  const clearAuthState = useCallback(() => {
    setSession(null);
    setUser(null);
    setError(null);
    cleanupAuthState();
  }, []);

  // تحقق من وجود جلسة وتسجيل الاشتراك في تغييرات حالة المصادقة
  useEffect(() => {
    // مهم: تأكد من أن الكود يعمل فقط في بيئة المتصفح
    if (typeof window === 'undefined') return;
    
    // تسجيل الدخول للاستماع إلى تغيرات حالة المصادقة أولاً
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // معالجة أحداث المصادقة المختلفة
        switch (event) {
          case "SIGNED_OUT":
            clearAuthState();
            break;
          case "TOKEN_REFRESHED":
            console.log("Token refreshed successfully");
            break;
          case "USER_UPDATED":
            console.log("User data updated");
            // يمكن إضافة تحديث للبيانات ذات الصلة هنا
            break;
        }
        
        setLoading(false);
        setIsLoading(false);
      }
    );

    // ثم التحقق من وجود جلسة حالية
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
        
        setLoading(false);
        setIsLoading(false);
      } catch (err: any) {
        console.error("Session check exception:", err);
        setError(err.message);
        clearAuthState();
        setLoading(false);
        setIsLoading(false);
      }
    };
    
    checkExistingSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [clearAuthState]);

  // إعادة تأكيد الجلسة
  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  }, []);

  return { 
    session, 
    user, 
    loading, 
    isLoading,
    error,
    clearAuthState,
    refreshSession
  };
};
