
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  ShoppingBag, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

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
  
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'users', label: 'المستخدمين', icon: Users },
    { id: 'restaurants', label: 'المطاعم', icon: Utensils },
    { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div 
      className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 z-20 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
          {!collapsed && (
            <span className="font-bold text-xl text-gray-800 dark:text-white ml-2 rtl:ml-0 rtl:mr-2">
              ST Eats Admin
            </span>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
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

      <div className="py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} px-4 py-3 ${
              activeTab === item.id
                ? 'bg-teal-50 text-teal-600 border-r-4 border-teal-500 dark:bg-gray-700 dark:text-teal-400 dark:border-teal-400'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3 rtl:mr-0 rtl:ml-3'}`} />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
