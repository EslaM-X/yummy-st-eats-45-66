
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/components/auth/AuthUtils';
import type { toast as ToastFunctionType } from '@/hooks/use-toast'; // Import type for toast function

// Note: The useToast hook is no longer called directly in this module.
// The toast function is now passed as a parameter to signInUser and signUpUser.

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
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
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

export const signUpUser = async (
  email: string,
  password: string,
  metadata: any | undefined, // Keep metadata optional
  // Use the type of the toast function from shadcn/ui
  toast: typeof ToastFunctionType
) => {
  console.log("Signing up with data:", { email, metadata });
  try {
    // Clean up existing auth state first
    cleanupAuthState();
    
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
    
    // Manually trigger our custom email function instead of relying on Supabase's default emails
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/custom-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_PUBLISHABLE_KEY
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
      } else {
        console.log("Custom email sent successfully");
      }
    } catch (emailError) {
      console.error('خطأ في إرسال البريد المخصص:', emailError);
    }
    
    toast({
      title: "تم إنشاء الحساب بنجاح",
      description: "تم إنشاء حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.",
    });
    
    return { error: null, data };
  } catch (error: any) {
    console.error("Registration error details:", error);
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

export const signOutUser = async () => {
  // Clean up auth state
  cleanupAuthState();
  
  // Try global sign out
  try {
    await supabase.auth.signOut({ scope: 'global' });
  } catch (err) {
    console.error("Error during sign out:", err);
  }
  
  // Force page reload for a clean state
  window.location.href = '/auth';
};
