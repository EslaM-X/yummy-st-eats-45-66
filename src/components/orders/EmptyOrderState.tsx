
import React from 'react';
import { Button } from "@/components/ui/button";

interface EmptyOrderStateProps {
  activeTab: string;
}

const EmptyOrderState: React.FC<EmptyOrderStateProps> = ({ activeTab }) => {
  return (
    <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">لا توجد طلبات</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {activeTab === 'all' 
          ? 'لم تقم بإنشاء أي طلبات حتى الآن.'
          : 'لا توجد طلبات بهذه الحالة حالياً.'}
      </p>
      <Button asChild className="bg-yellow-800 hover:bg-yellow-900 text-white">
        <a href="/products">تصفح المنتجات</a>
      </Button>
    </div>
  );
};

export default EmptyOrderState;
