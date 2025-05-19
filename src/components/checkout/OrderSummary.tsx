
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderSummaryProps {
  cartItems: any[];
  amount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, amount }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>ملخص الطلب</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems && cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.quantity} × {item.price} ST
                </p>
              </div>
              <span className="font-medium">{item.price * item.quantity} ST</span>
            </div>
          ))}
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">رسوم التوصيل:</span>
            <span>15 ST</span>
          </div>
          
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>المجموع:</span>
            <span>{amount} ST</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">معلومات الدفع الآمن</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            جميع المعاملات تتم بشكل آمن ومشفر. لا يتم تخزين بيانات بطاقتك على خوادمنا.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
