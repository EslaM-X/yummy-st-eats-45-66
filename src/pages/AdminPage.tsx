
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
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated, handleLogout } = useAdminAuth();
  const { toast } = useToast();

  // Check screen size on mount and when it changes
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on small screens
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [sidebarCollapsed]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // On mobile, show notification
    if (isMobile) {
      toast({
        title: "قسم جديد",
        description: `تم الانتقال إلى ${getTabTitle(value)}`,
      });
    }
    
    // Auto-collapse sidebar on mobile when changing tabs
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
        <AdminLayout
          activeTab={activeTab}
          onTabChange={handleTabChange}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
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
