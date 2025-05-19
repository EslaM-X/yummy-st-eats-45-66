
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminContent from '@/components/admin/AdminContent';
import AdminFooter from '@/components/admin/AdminFooter';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { isAuthenticated, handleLogout } = useAdminAuth();
  const { toast } = useToast();

  // Check if screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: "قسم جديد",
      description: `تم الانتقال إلى ${getTabTitle(value)}`,
    });
  };

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'لوحة التحكم';
      case 'users': return 'المستخدمين';
      case 'restaurants': return 'المطاعم';
      case 'orders': return 'الطلبات';
      case 'settings': return 'الإعدادات';
      default: return '';
    }
  };

  if (!isAuthenticated) {
    return null; // Return null while checking authentication
  }

  return (
    <SidebarProvider>
      <AdminLayout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
      >
        <AdminHeader 
          activeTab={activeTab}
          handleLogout={handleLogout}
        />
        <AdminContent 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <AdminFooter />
      </AdminLayout>
    </SidebarProvider>
  );
};

export default AdminPage;
