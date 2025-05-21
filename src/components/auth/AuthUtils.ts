
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

// دالة للتحقق من صلاحية التوكن
export const isValidToken = () => {
  try {
    const tokenString = localStorage.getItem('sb-podtrairfwunyjzdvmst-auth-token');
    if (!tokenString) return false;
    
    const token = JSON.parse(tokenString);
    if (!token || !token.expires_at) return false;
    
    // التحقق من انتهاء صلاحية التوكن
    const expiresAt = new Date(token.expires_at * 1000);
    const now = new Date();
    
    return expiresAt > now;
  } catch (error) {
    console.error('Error checking token validity:', error);
    return false;
  }
};
