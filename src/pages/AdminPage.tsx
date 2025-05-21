
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminContent from '@/components/admin/AdminContent';
import AdminFooter from '@/components/admin/AdminFooter';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, loading, handleLogout, checkAndRedirect } = useAdminAuth();

  // التحقق من صلاحيات المستخدم عند تحميل الصفحة
  useEffect(() => {
    checkAndRedirect();
  }, [isAuthenticated, isAdmin]);

  // التحقق من حجم الشاشة عند التحميل وعند تغييرها
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // طي الشريط الجانبي تلقائيًا على الشاشات الصغيرة
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };
    
    // فحص مبدئي
    checkScreenSize();
    
    // إضافة مستمع للحدث
    window.addEventListener('resize', checkScreenSize);
    
    // التنظيف
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [sidebarCollapsed]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // طي الشريط الجانبي تلقائيًا على الهواتف المحمولة عند تغيير التبويبات
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin || !isAuthenticated) {
    return null; // عدم عرض أي محتوى حتى الانتقال إلى صفحة تسجيل الدخول
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
        <AdminLayout
          activeTab={activeTab}
          onTabChange={handleTabChange}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
          handleLogout={handleLogout}
        >
          <div className="flex flex-col min-h-screen">
            <AdminHeader 
              activeTab={activeTab}
              handleLogout={handleLogout}
            />
            
            <div className="flex-grow">
              <AdminContent 
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            
            <AdminFooter />
          </div>
        </AdminLayout>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
