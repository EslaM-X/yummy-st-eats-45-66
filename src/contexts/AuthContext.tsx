
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// دالة تنظيف حالة المصادقة
const cleanupAuthState = () => {
  // إزالة توكنات المصادقة القياسية
  localStorage.removeItem('supabase.auth.token');
  
  // إزالة جميع مفاتيح Supabase من localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // إزالة من sessionStorage إذا كان قيد الاستخدام
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // استرجاع بيانات ملف المستخدم
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // تحديث بيانات الملف الشخصي
  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  // إعداد مستمع لتغييرات حالة المصادقة
  useEffect(() => {
    setIsLoading(true);
    
    // إعداد مستمع لتغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // تحديث الجلسة والمستخدم
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // استرجاع بيانات الملف الشخصي بعد تسجيل الدخول
        if (event === 'SIGNED_IN' && currentSession?.user) {
          // استخدام setTimeout لتأجيل الاستعلام ومنع المشاكل المحتملة
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        }
        
        // إعادة تعيين البيانات عند تسجيل الخروج
        if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );
    
    // التحقق من الجلسة الحالية عند التحميل
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });
    
    // تنظيف المستمع عند إلغاء تحميل المكوّن
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // وظيفة تسجيل الخروج
  const signOut = async () => {
    try {
      // تنظيف حالة المصادقة
      cleanupAuthState();
      
      // محاولة تسجيل الخروج الشامل
      await supabase.auth.signOut({ scope: 'global' });
      
      // إعادة تعيين حالة المستخدم والملف الشخصي
      setUser(null);
      setSession(null);
      setProfile(null);
      
      // إظهار إشعار نجاح تسجيل الخروج
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "تم تسجيل خروجك من النظام بنجاح.",
      });
      
      // إعادة تحميل الصفحة
      window.location.href = '/';
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error.message || "حدث خطأ أثناء تسجيل الخروج. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    signOut,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
