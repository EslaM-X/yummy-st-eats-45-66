
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import RestaurantsPage from './pages/RestaurantsPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RegisterRestaurantPage from './pages/RegisterRestaurantPage';
import CoreTeamPage from './pages/CoreTeamPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import AddFoodPage from './pages/AddFoodPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';

// Components
import MobileNavBar from './components/MobileNavBar';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [showMobileNav, setShowMobileNav] = useState(true);
  const { user, isLoading } = useAuth();

  // إخفاء شريط التنقل في الجوال للصفحات المحددة
  useEffect(() => {
    const hideNavOnPages = ['/admin', '/admin-login', '/reset-password'];
    const checkPath = () => {
      const currentPath = window.location.pathname;
      const shouldHide = hideNavOnPages.some(page => currentPath.startsWith(page));
      setShowMobileNav(!shouldHide);
    };

    checkPath(); // التحقق عند التحميل
    window.addEventListener('popstate', checkPath); // التحقق عند تغيير المسار

    return () => {
      window.removeEventListener('popstate', checkPath);
    };
  }, []);

  // عارض التحميل الأولي
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner h-8 w-8 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route 
          path="/checkout" 
          element={user ? <CheckoutPage /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/register-restaurant" 
          element={user ? <RegisterRestaurantPage /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <ProfilePage /> : <Navigate to="/auth" />} 
        />
        <Route path="/team" element={<CoreTeamPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route 
          path="/add-food" 
          element={user ? <AddFoodPage /> : <Navigate to="/auth" />} 
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} /> {/* إضافة مسار جديد للتوجيه إلى صفحة تسجيل الدخول */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        
        {/* صفحات السياسات */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        
        {/* صفحة غير موجودة */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {showMobileNav && <MobileNavBar />}
      <Toaster />
    </Router>
  );
}

export default App;
