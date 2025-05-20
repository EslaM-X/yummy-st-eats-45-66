
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  sidebarCollapsed,
  setSidebarCollapsed,
  isMobile
}) => {
  const { isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className={`hidden md:block transition-all duration-300 ${sidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}>
        <AdminSidebar 
          activeTab={activeTab}
          onTabChange={onTabChange}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="fixed top-4 left-4 z-50 md:hidden dark:text-gray-300"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">قائمة</span>
          </Button>
        </SheetTrigger>
        <SheetContent side={isRTL ? "right" : "left"} className="p-0 w-[280px] sm:w-[320px] border-r">
          <AdminSidebar 
            activeTab={activeTab}
            onTabChange={onTabChange}
            collapsed={false}
            setCollapsed={() => {}}
          />
        </SheetContent>
      </Sheet>

      <div className={`flex-1 transition-all duration-300 overflow-x-hidden
        ${sidebarCollapsed ? 'md:mr-16' : 'md:mr-64'} 
        rtl:md:mr-0 rtl:md:ml-64 
        ${sidebarCollapsed ? 'rtl:md:ml-16' : ''}
      `}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
