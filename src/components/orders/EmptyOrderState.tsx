
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface EmptyOrderStateProps {
  activeTab: string;
}

const EmptyOrderState: React.FC<EmptyOrderStateProps> = ({ activeTab }) => {
  const { language } = useLanguage();
  
  const title = language === 'en' ? 'No Orders Found' : 'لا توجد طلبات';
  const description = language === 'en' 
    ? (activeTab === 'all' 
      ? 'You haven\'t placed any orders yet.' 
      : 'No orders with this status currently.')
    : (activeTab === 'all' 
      ? 'لم تقم بإنشاء أي طلبات حتى الآن.' 
      : 'لا توجد طلبات بهذه الحالة حالياً.');
  const buttonText = language === 'en' ? 'Browse Products' : 'تصفح المنتجات';
  
  return (
    <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {description}
      </p>
      <Button asChild className="bg-yellow-800 hover:bg-yellow-900 text-white">
        <a href="/products">{buttonText}</a>
      </Button>
    </div>
  );
};

export default EmptyOrderState;
