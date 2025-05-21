
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/components/auth/AuthUtils';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        setLoading(true);
        
        // التحقق من وجود جلسة
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setLoading(false);
          return;
        }
        
        setIsAuthenticated(true);
        
        // التحقق من صلاحية المستخدم (هل هو مدير؟)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          setIsAdmin(false);
        } else {
          setIsAdmin(profile?.user_type === 'admin');
        }
      } catch (error) {
        console.error('Admin authentication error:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    // تسجيل الاشتراك في تغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          checkAdminAuth();
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      }
    );
    
    checkAdminAuth();
    
    // التنظيف عند تفكيك المكون
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      toast({
        title: "تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  const checkAndRedirect = () => {
    if (!isAuthenticated) {
      toast({
        title: "غير مصرح",
        description: "يجب تسجيل الدخول للوصول إلى لوحة الإدارة",
        variant: "destructive",
      });
      navigate('/admin-login');
      return false;
    }
    
    if (!isAdmin) {
      toast({
        title: "وصول مرفوض",
        description: "لا تملك الصلاحية للوصول إلى لوحة الإدارة",
        variant: "destructive",
      });
      navigate('/');
      return false;
    }
    
    return true;
  };

  return { 
    isAuthenticated, 
    isAdmin, 
    loading, 
    handleLogout,
    checkAndRedirect
  };
};
