
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, onTabChange }) => {
  const { language } = useLanguage();
  
  const tabLabels = {
    all: language === 'en' ? 'All Orders' : 'كل الطلبات',
    new: language === 'en' ? 'New' : 'قيد المراجعة',
    preparing: language === 'en' ? 'Preparing' : 'قيد التحضير',
    delivering: language === 'en' ? 'Delivering' : 'قيد التوصيل',
    completed: language === 'en' ? 'Completed' : 'مكتملة',
    cancelled: language === 'en' ? 'Cancelled' : 'ملغاة'
  };
  
  return (
    <div className="mb-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">{tabLabels.all}</TabsTrigger>
          <TabsTrigger value="new" className="flex-1">{tabLabels.new}</TabsTrigger>
          <TabsTrigger value="preparing" className="flex-1">{tabLabels.preparing}</TabsTrigger>
          <TabsTrigger value="delivering" className="flex-1">{tabLabels.delivering}</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">{tabLabels.completed}</TabsTrigger>
          <TabsTrigger value="cancelled" className="flex-1">{tabLabels.cancelled}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default OrderTabs;
