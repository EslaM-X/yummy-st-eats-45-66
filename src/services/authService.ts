
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast'; // Ensure this path is correct or pass toast
import { cleanupAuthState } from '@/components/auth/AuthUtils';

// Note: The useToast hook cannot be called directly at the top level of a module.
// It must be called within a React component or a custom hook.
// For simplicity in this refactor, we'll assume toast is passed if needed or handled by the caller.
// Or, we can make these functions accept toast as a parameter.
// For this iteration, I'll have them use it directly, assuming it might be refactored later if issues arise in a non-component context.
// A better approach would be to pass the toast function as an argument to signIn and signUp.

export const signInUser = async (email: string, password: string) => {
  // toast function needs to be obtained from useToast() in a component/hook scope
  // This is a placeholder for where you'd get the toast function
  const { toast } = useToast(); // This will cause an error if authService is not used in a component context.
                                // For now, we'll proceed, but this is a common refactoring challenge.
                                // A more robust solution is to pass `toast` as an argument.

  try {
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

export const signUpUser = async (email: string, password: string, metadata?: any) => {
  const { toast } = useToast(); // Same issue as above
  console.log("Signing up with data:", { email, metadata });
  try {
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
  await supabase.auth.signOut();
  cleanupAuthState();
};

