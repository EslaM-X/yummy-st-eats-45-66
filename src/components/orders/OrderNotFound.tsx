
import React from 'react';
import { Button } from "@/components/ui/button";

interface OrderNotFoundProps {
  onBack: () => void;
}

const OrderNotFound: React.FC<OrderNotFoundProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        لم يتم العثور على الطلب
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        عذراً، لم نتمكن من العثور على الطلب المطلوب.
      </p>
      <Button 
        onClick={onBack}
        className="bg-yellow-800 hover:bg-yellow-900 text-white"
      >
        العودة إلى طلباتي
      </Button>
    </div>
  );
};

export default OrderNotFound;
