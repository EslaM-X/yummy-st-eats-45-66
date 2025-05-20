
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminRestaurants from './AdminRestaurants';
import AdminOrders from './AdminOrders';
import AdminSettings from './AdminSettings';

interface AdminContentProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AdminContent: React.FC<AdminContentProps> = ({ activeTab, onTabChange }) => {
  return (
    <main className="p-3 sm:p-4 md:p-6">
      {/* Mobile Tab Selector - visible on small screens */}
      <div className="md:hidden mb-4 overflow-x-auto">
        <div className="flex space-x-2 rtl:space-x-reverse w-full">
          <TabButton 
            active={activeTab === 'dashboard'}
            onClick={() => onTabChange('dashboard')}
            label="لوحة التحكم"
          />
          <TabButton 
            active={activeTab === 'users'}
            onClick={() => onTabChange('users')}
            label="المستخدمين"
          />
          <TabButton 
            active={activeTab === 'restaurants'}
            onClick={() => onTabChange('restaurants')}
            label="المطاعم"
          />
          <TabButton 
            active={activeTab === 'orders'}
            onClick={() => onTabChange('orders')}
            label="الطلبات"
          />
          <TabButton 
            active={activeTab === 'settings'}
            onClick={() => onTabChange('settings')}
            label="الإعدادات"
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
        <TabsList className="hidden">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="users">المستخدمين</TabsTrigger>
          <TabsTrigger value="restaurants">المطاعم</TabsTrigger>
          <TabsTrigger value="orders">الطلبات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4 animate-fade-in">
          <AdminDashboard />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4 animate-fade-in">
          <AdminUsers />
        </TabsContent>
        
        <TabsContent value="restaurants" className="space-y-4 animate-fade-in">
          <AdminRestaurants />
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4 animate-fade-in">
          <AdminOrders />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 animate-fade-in">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </main>
  );
};

// Mobile Tab Button Component
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap flex-shrink-0
        ${active 
          ? 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100' 
          : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        } transition-colors`}
    >
      {label}
    </button>
  );
};

export default AdminContent;
