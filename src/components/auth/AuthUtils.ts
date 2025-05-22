
/**
 * تنظيف حالة المصادقة وإزالة أي بيانات مخزنة متعلقة بها
 */
export const cleanupAuthState = () => {
  // مسح البيانات المخزنة المتعلقة بالمصادقة من التخزين المحلي
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });

  // مسح البيانات المخزنة المتعلقة بالمصادقة من تخزين الجلسة
  if (typeof sessionStorage !== 'undefined') {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  }
};

/**
 * استخراج الخطأ من Supabase بتنسيق مناسب للعرض
 */
export const extractAuthError = (error: any): string => {
  if (!error) return '';
  
  // التحقق من نوع الخطأ
  const message = error.message || error.error_description || error.toString();
  
  // ترجمة رسائل الخطأ الشائعة
  const translations: Record<string, string> = {
    'Invalid login credentials': 'بيانات تسجيل الدخول غير صحيحة',
    'Email not confirmed': 'البريد الإلكتروني غير مؤكد، يرجى تفقد بريدك الإلكتروني',
    'User already registered': 'البريد الإلكتروني مسجل بالفعل',
    'Password should be at least 6 characters': 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
    'No user found with that email': 'لا يوجد حساب مسجل بهذا البريد الإلكتروني',
  };
  
  return translations[message] || message;
};

/**
 * التحقق من صحة البريد الإلكتروني
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * التحقق من صحة كلمة المرور (قوتها)
 */
export const isStrongPassword = (password: string): boolean => {
  // على الأقل 6 أحرف
  return password.length >= 6;
};
