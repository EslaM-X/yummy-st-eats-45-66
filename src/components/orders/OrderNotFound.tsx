
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderNotFoundProps {
  onBack: () => void;
}

const OrderNotFound: React.FC<OrderNotFoundProps> = ({ onBack }) => {
  const { language } = useLanguage();
  
  const title = language === 'en' ? 'Order Not Found' : 'لم يتم العثور على الطلب';
  const description = language === 'en' 
    ? 'Sorry, we couldn\'t find the requested order.' 
    : 'عذراً، لم نتمكن من العثور على الطلب المطلوب.';
  const buttonText = language === 'en' ? 'Back to My Orders' : 'العودة إلى طلباتي';
  
  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {description}
      </p>
      <Button 
        onClick={onBack}
        className="bg-yellow-800 hover:bg-yellow-900 text-white"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default OrderNotFound;
