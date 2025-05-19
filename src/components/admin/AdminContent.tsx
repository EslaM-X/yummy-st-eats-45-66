
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
    <main className="p-4 md:p-6">
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

export default AdminContent;
