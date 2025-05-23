
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderSummaryProps {
  totalAmount: number;
  deliveryFee?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalAmount, deliveryFee = 15 }) => {
  const { language } = useLanguage();
  const subtotal = Math.max(0, totalAmount - deliveryFee);
  
  const labels = {
    title: language === 'en' ? 'Order Summary' : 'ملخص الطلب',
    subtotal: language === 'en' ? 'Subtotal' : 'المجموع الفرعي',
    deliveryFee: language === 'en' ? 'Delivery Fee' : 'رسوم التوصيل',
    total: language === 'en' ? 'Total' : 'المجموع',
  };
  
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
        {labels.title}
      </h4>
      <Card className="p-4">
        <div className="flex justify-between py-2">
          <span className="text-gray-600 dark:text-gray-400">{labels.subtotal}:</span>
          <span className="text-gray-800 dark:text-white">{subtotal.toFixed(2)} ST</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600 dark:text-gray-400">{labels.deliveryFee}:</span>
          <span className="text-gray-800 dark:text-white">{deliveryFee.toFixed(2)} ST</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between py-2 font-bold">
          <span>{labels.total}:</span>
          <span>{totalAmount.toFixed(2)} ST</span>
        </div>
      </Card>
    </div>
  );
};

export default OrderSummary;
