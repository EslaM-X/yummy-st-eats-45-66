
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  totalAmount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalAmount }) => {
  const deliveryFee = 15;
  const subtotal = totalAmount - deliveryFee;
  
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
        ملخص الطلب
      </h4>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <div className="flex justify-between py-2">
          <span>المجموع الفرعي:</span>
          <span>{subtotal} ST</span>
        </div>
        <div className="flex justify-between py-2">
          <span>رسوم التوصيل:</span>
          <span>{deliveryFee} ST</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between py-2 font-bold">
          <span>المجموع:</span>
          <span>{totalAmount} ST</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
