
import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminRestaurants from './AdminRestaurants';
import AdminOrders from './AdminOrders';
import AdminSettings from './AdminSettings';
import AdminRefunds from './AdminRefunds';
import { Card, CardContent } from "@/components/ui/card";

interface AdminContentProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const AdminContent: React.FC<AdminContentProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {activeTab === 'dashboard' && <AdminDashboard />}
      
      {activeTab === 'users' && <AdminUsers />}
      
      {activeTab === 'restaurants' && <AdminRestaurants />}
      
      {activeTab === 'orders' && <AdminOrders />}
      
      {activeTab === 'refunds' && <AdminRefunds />}
      
      {activeTab === 'settings' && <AdminSettings />}
      
      {!['dashboard', 'users', 'restaurants', 'orders', 'settings', 'refunds'].includes(activeTab) && (
        <Card>
          <CardContent className="py-10 text-center">
            <h3 className="text-xl font-bold mb-2">قسم غير متاح</h3>
            <p className="text-muted-foreground mb-4">هذا القسم قيد التطوير حالياً</p>
            <button 
              onClick={() => onTabChange('dashboard')}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              العودة للرئيسية
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminContent;
