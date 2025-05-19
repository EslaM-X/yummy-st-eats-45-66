
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  ShoppingBag, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  FileText,
  BellRing
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/components/theme-provider';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeTab, 
  onTabChange,
  collapsed,
  setCollapsed
}) => {
  const { isRTL } = useLanguage();
  const { theme } = useTheme();
  
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'users', label: 'المستخدمين', icon: Users },
    { id: 'restaurants', label: 'المطاعم', icon: Utensils },
    { id: 'orders', label: 'الطلبات', icon: ShoppingBag, badge: '12' },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  const secondaryItems = [
    { id: 'reports', label: 'التقارير', icon: FileText },
    { id: 'notifications', label: 'الإشعارات', icon: BellRing },
    { id: 'help', label: 'المساعدة', icon: HelpCircle },
  ];

  const handleItemClick = (id: string) => {
    if (menuItems.find(item => item.id === id)) {
      onTabChange(id);
    }
  };

  return (
    <div 
      className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-screen dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 z-20 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      } ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
          {!collapsed && (
            <span className="font-bold text-xl text-gray-800 dark:text-white ml-2 rtl:ml-0 rtl:mr-2">
              ST Eats
            </span>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold">
              ST
            </div>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 dark:text-gray-400"
        >
          {collapsed 
            ? (isRTL ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />) 
            : (isRTL ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />)
          }
        </Button>
      </div>

      <div className="py-4 overflow-y-auto flex-1">
        <div className={collapsed ? 'px-2' : 'px-4'}>
          {!collapsed && (
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2 px-2 font-medium tracking-wider">
              القائمة الرئيسية
            </h3>
          )}
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-3 rounded-lg mb-1 ${
                activeTab === item.id
                  ? 'bg-teal-50 text-teal-600 dark:bg-gray-700 dark:text-teal-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              } transition-all duration-200`}
            >
              <div className="flex items-center">
                <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3 rtl:mr-0 rtl:ml-3'}`} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </div>
              {!collapsed && item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {!collapsed && <div className="border-t border-gray-200 dark:border-gray-700 my-4 mx-4"></div>}

        <div className={collapsed ? 'px-2' : 'px-4'}>
          {!collapsed && (
            <h3 className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2 px-2 font-medium tracking-wider">
              أقسام أخرى
            </h3>
          )}
          {secondaryItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200`}
            >
              <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3 rtl:mr-0 rtl:ml-3'}`} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>

      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold">
                م
              </div>
              <div>
                <p className="font-medium text-sm dark:text-white">مدير النظام</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@steats.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
