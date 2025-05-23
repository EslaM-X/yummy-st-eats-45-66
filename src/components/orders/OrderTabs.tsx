
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">كل الطلبات</TabsTrigger>
          <TabsTrigger value="new" className="flex-1">قيد المراجعة</TabsTrigger>
          <TabsTrigger value="preparing" className="flex-1">قيد التحضير</TabsTrigger>
          <TabsTrigger value="delivering" className="flex-1">قيد التوصيل</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">مكتملة</TabsTrigger>
          <TabsTrigger value="cancelled" className="flex-1">ملغاة</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default OrderTabs;
