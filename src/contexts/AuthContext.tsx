import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';
import { cleanupAuthState, isValidToken } from '@/components/auth/AuthUtils';

// استيراد URL وAPI Key من ملف العميل
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  profile: any;
  refreshProfile: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // تسجيل الاشتراك في تغييرات حالة المصادقة - يجب أن يكون أولاً
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // استخدام setTimeout للتعامل مع الوظائف غير المتزامنة بشكل آمن
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
            checkUserRole(session.user.id);
          }, 0);
        }
        
        if (event === "SIGNED_OUT") {
          setIsAdmin(false);
          setProfile(null);
          cleanupAuthState();
        }
        
        setLoading(false);
        setIsLoading(false);
      }
    );

    // الحصول على الجلسة الحالية
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
        checkUserRole(session.user.id);
      }
      
      setLoading(false);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    await fetchProfile(user.id);
  };

  const checkUserRole = async (userId: string | undefined) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error checking user role:', error);
        return;
      }
      
      setIsAdmin(data?.user_type === 'admin');
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      toast({
        title: "فشل تسجيل الدخول",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    console.log("Signing up with data:", { email, metadata });
    try {
      // إضافة حالة أكثر توضيحاً لمتابعة عملية التسجيل
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: window.location.origin + '/login'
        },
      });
      
      if (error) throw error;
      
      console.log("Sign up successful:", data);
      
      try {
        // استدعاء دالة البريد الإلكتروني المخصص
        const response = await fetch(`${SUPABASE_URL}/functions/v1/custom-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_PUBLISHABLE_KEY // Corrected header
          },
          body: JSON.stringify({
            email: email,
            type: 'signup',
            redirectUrl: window.location.origin + '/login'
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.warn('تم إنشاء الحساب ولكن قد يكون هناك مشكلة في إرسال البريد الإلكتروني المخصص:', errorData);
          // يمكنك إضافة تنبيه للمستخدم هنا إذا كنت ترغب في ذلك
        }
      } catch (emailError) {
        console.error('خطأ في إرسال البريد المخصص:', emailError);
         // يمكنك إضافة تنبيه للمستخدم هنا إذا كنت ترغب في ذلك
      }
      
      // نجاح التسجيل
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "تم إنشاء حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.",
      });
      
      return { error: null, data };
    } catch (error: any) {
      console.error("Registration error details:", error);
      
      // معالجة أكثر تفصيلاً للأخطاء
      let errorMessage = "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.";
      
      if (error.message?.includes("User already registered")) {
        errorMessage = "هذا البريد الإلكتروني مسجل بالفعل.";
      } else if (error.message?.includes("unique constraint") || error.message?.includes("already exists")) {
        errorMessage = "البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "فشل إنشاء الحساب",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { error, data: null };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    cleanupAuthState();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        signUp,
        signOut,
        loading,
        isAdmin,
        profile,
        refreshProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('يجب استخدام useAuth داخل AuthProvider');
  }
  return context;
};
