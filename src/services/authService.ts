
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState, sanitizeMetadata } from '@/components/auth/AuthUtils';
import type { toast as ToastFunctionType } from '@/hooks/use-toast';
import { AuthError } from '@supabase/supabase-js';

// Constants
const APP_URL = window.location.origin;
const AUTH_REDIRECT_URL = `${APP_URL}/auth`;
const RESET_PASSWORD_REDIRECT_URL = `${APP_URL}/reset-password`;

/**
 * Authentication services
 */
export const authService = {
  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string, toast: typeof ToastFunctionType) => {
    try {
      // Clean up existing auth state
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
  },

  /**
   * Register a new user
   */
  signUp: async (email: string, password: string, metadata: Record<string, any> | undefined, toast: typeof ToastFunctionType) => {
    console.log("Signing up with data:", { email, metadata });
    try {
      // Clean up existing auth state
      cleanupAuthState();
      
      // معالجة البيانات الوصفية لضمان توافقها مع معايير الإرسال
      const sanitizedMetadata = metadata ? sanitizeMetadata(metadata) : undefined;
      
      // استخدام Supabase مباشرة للتسجيل
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: sanitizedMetadata,
          emailRedirectTo: AUTH_REDIRECT_URL
        },
      });
      
      if (error) throw error;
      console.log("Sign up successful:", data);
      
      // هناك احتمال أن يكون المستخدم قد تم إنشاء حسابه بنجاح، لنتحقق من ذلك
      const userCreated = !!data?.user?.id;
      const emailConfirm = data?.user?.identities?.length === 0;
      
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
      
      let message = "";
      // التحقق مما إذا كان البريد الإلكتروني بحاجة إلى تأكيد
      if (emailConfirm) {
        message = "هذا البريد الإلكتروني مسجل بالفعل. يرجى التحقق من صندوق البريد الوارد لتأكيد حسابك.";
      } else if (!data.session) {
        message = "تم إنشاء حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب قبل تسجيل الدخول.";
      } else {
        message = "تم إنشاء حسابك وتسجيل دخولك بنجاح.";
      }
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: message,
      });
      
      return { error: null, data };
    } catch (error: any) {
      console.error("Registration error details:", error);
      let errorMessage = "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.";
      
      if (error instanceof AuthError) {
        if (error.message?.includes("User already registered")) {
          errorMessage = "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول أو استخدام استعادة كلمة المرور.";
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
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
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
  },

  /**
   * Setup email confirmation handling
   */
  setupEmailConfirmation: async () => {
    try {
      // التحقق من حالة عنوان URL الحالي لمعرفة ما إذا كان يحتوي على رمز التأكيد
      const url = new URL(window.location.href);
      const token = url.searchParams.get('confirmation_token');
      
      if (token) {
        // إذا كان هناك رمز تأكيد، فقم بتأكيد البريد الإلكتروني
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup',
        });
        
        if (error) throw error;
        
        // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول بإشارة إلى نجاح التأكيد
        window.location.href = '/auth?email_confirmed=true';
        return { success: true };
      }
      
      return { success: false };
    } catch (error: any) {
      console.error("Error confirming email:", error);
      window.location.href = `/auth?error=confirmation_failed&error_description=${encodeURIComponent(error.message)}`;
      return { success: false, error };
    }
  },

  /**
   * Resend confirmation email
   */
  resendConfirmationEmail: async (email: string, toast: typeof ToastFunctionType) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: AUTH_REDIRECT_URL,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "تم إعادة إرسال رسالة التأكيد",
        description: "تم إرسال رابط تأكيد جديد إلى بريدك الإلكتروني.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error("Error resending confirmation email:", error);
      
      toast({
        title: "فشل إعادة إرسال رسالة التأكيد",
        description: error.message || "حدث خطأ أثناء محاولة إعادة إرسال رسالة التأكيد",
        variant: "destructive",
      });
      
      return { error };
    }
  },

  /**
   * Update user profile
   */
  updateUserProfile: async (userId: string, profileData: Partial<any>, toast: typeof ToastFunctionType) => {
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
  },

  /**
   * Reset password - send reset email
   */
  resetPassword: async (email: string, toast: typeof ToastFunctionType) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: RESET_PASSWORD_REDIRECT_URL,
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
  },

  /**
   * Change password
   */
  changePassword: async (newPassword: string, toast: typeof ToastFunctionType) => {
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
  }
};

// Export individual functions for backward compatibility
export const signInUser = authService.signIn;
export const signUpUser = authService.signUp;
export const signOutUser = authService.signOut;
export const setupEmailConfirmation = authService.setupEmailConfirmation;
export const resendConfirmationEmail = authService.resendConfirmationEmail;
export const updateUserProfile = authService.updateUserProfile;
export const resetPassword = authService.resetPassword;
export const changePassword = authService.changePassword;
