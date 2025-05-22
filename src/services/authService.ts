
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState, sanitizeMetadata } from '@/components/auth/AuthUtils';
import type { toast as ToastFunctionType } from '@/hooks/use-toast'; // Import type for toast function
import { AuthError } from '@supabase/supabase-js';

/**
 * تسجيل الدخول للمستخدمين
 */
export const signInUser = async (
  email: string,
  password: string,
  // Use the type of the toast function from shadcn/ui
  toast: typeof ToastFunctionType
) => {
  try {
    // Clean up existing auth state first
    cleanupAuthState();
    
    // Try global sign out before signing in to prevent conflicts
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
      console.log("Preliminary signout attempt:", err);
    }
    
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    
    console.log("Sign in successful:", data);
    
    return { error: null, data };
  } catch (error: any) {
    console.error("Login error details:", error);
    
    // رسائل خطأ أكثر ودية للمستخدم
    let errorMessage = "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.";
    
    if (error instanceof AuthError) {
      switch (error.message) {
        case 'Invalid login credentials':
          errorMessage = "بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.";
          break;
        case 'Email not confirmed':
          errorMessage = "يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.";
          break;
        default:
          errorMessage = error.message;
      }
    }
    
    toast({
      title: "فشل تسجيل الدخول",
      description: errorMessage,
      variant: "destructive",
    });
    return { error, data: null };
  }
};

/**
 * تسجيل مستخدم جديد
 */
export const signUpUser = async (
  email: string,
  password: string,
  metadata: Record<string, any> | undefined, // Keep metadata optional
  // Use the type of the toast function from shadcn/ui
  toast: typeof ToastFunctionType
) => {
  console.log("Signing up with data:", { email, metadata });
  try {
    // Clean up existing auth state first
    cleanupAuthState();
    
    // معالجة البيانات الوصفية لضمان توافقها مع معايير الإرسال
    const sanitizedMetadata = metadata ? sanitizeMetadata(metadata) : undefined;
    
    // استخدام Supabase مباشرة للتسجيل
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: sanitizedMetadata,
        emailRedirectTo: window.location.origin + '/login'
      },
    });
    
    if (error) throw error;
    console.log("Sign up successful:", data);
    
    // هناك احتمال أن يكون المستخدم قد تم إنشاء حسابه بنجاح، لنتحقق من ذلك
    const userCreated = !!data?.user?.id;
    
    // إذا تم إنشاء المستخدم بنجاح، قم بإنشاء سجل ملفه الشخصي
    if (userCreated && data.user) {
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: sanitizedMetadata?.full_name || '',
          username: sanitizedMetadata?.username || '',
          phone: sanitizedMetadata?.phone || '',
          user_type: sanitizedMetadata?.user_type || 'customer',
          updated_at: new Date().toISOString()
        });
      } catch (profileError) {
        console.error("Error creating profile:", profileError);
        // نستمر حتى لو فشل إنشاء الملف الشخصي، يمكن معالجته لاحقا
      }
    }
    
    toast({
      title: "تم إنشاء الحساب بنجاح",
      description: userCreated 
        ? "تم إنشاء حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب."
        : "تم إرسال رابط التأكيد إلى بريدك الإلكتروني. يرجى التحقق منه لإكمال عملية التسجيل.",
    });
    
    return { error: null, data };
  } catch (error: any) {
    console.error("Registration error details:", error);
    let errorMessage = "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.";
    
    if (error instanceof AuthError) {
      if (error.message?.includes("User already registered")) {
        errorMessage = "هذا البريد الإلكتروني مسجل بالفعل.";
      } else if (error.message?.includes("unique constraint") || error.message?.includes("already exists")) {
        errorMessage = "البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل";
      } else {
        errorMessage = error.message;
      }
    }
    
    toast({
      title: "فشل إنشاء الحساب",
      description: errorMessage,
      variant: "destructive",
    });
    
    return { error, data: null };
  }
};

/**
 * تسجيل الخروج للمستخدم
 */
export const signOutUser = async () => {
  try {
    // Clean up auth state
    cleanupAuthState();
    
    // Try global sign out
    await supabase.auth.signOut({ scope: 'global' });
    
    // Force page reload for a clean state
    window.location.href = '/auth';
  } catch (err) {
    console.error("Error during sign out:", err);
    // Force reload to ensure clean state even if there's an error
    window.location.href = '/auth';
  }
};

/**
 * تحديث بيانات المستخدم
 */
export const updateUserProfile = async (
  userId: string, 
  profileData: Partial<any>,
  toast: typeof ToastFunctionType
) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "تم تحديث الملف الشخصي",
      description: "تم تحديث بياناتك الشخصية بنجاح",
    });
    
    return { data, error: null };
  } catch (error: any) {
    console.error("Error updating profile:", error);
    
    toast({
      title: "فشل تحديث الملف الشخصي",
      description: error.message || "حدث خطأ أثناء تحديث بياناتك الشخصية",
      variant: "destructive",
    });
    
    return { data: null, error };
  }
};

/**
 * إعادة تعيين كلمة المرور
 */
export const resetPassword = async (
  email: string,
  toast: typeof ToastFunctionType
) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    
    toast({
      title: "تم إرسال رابط إعادة تعيين كلمة المرور",
      description: "يرجى التحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور",
    });
    
    return { error: null };
  } catch (error: any) {
    console.error("Error resetting password:", error);
    
    toast({
      title: "فشل إعادة تعيين كلمة المرور",
      description: error.message || "حدث خطأ أثناء محاولة إعادة تعيين كلمة المرور",
      variant: "destructive",
    });
    
    return { error };
  }
};

/**
 * تغيير كلمة المرور
 */
export const changePassword = async (
  newPassword: string,
  toast: typeof ToastFunctionType
) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    
    toast({
      title: "تم تغيير كلمة المرور",
      description: "تم تغيير كلمة المرور الخاصة بك بنجاح",
    });
    
    return { error: null };
  } catch (error: any) {
    console.error("Error changing password:", error);
    
    toast({
      title: "فشل تغيير كلمة المرور",
      description: error.message || "حدث خطأ أثناء محاولة تغيير كلمة المرور",
      variant: "destructive",
    });
    
    return { error };
  }
};
