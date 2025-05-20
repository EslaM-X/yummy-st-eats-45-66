
// دالة تنظيف حالة المصادقة
export const cleanupAuthState = () => {
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
