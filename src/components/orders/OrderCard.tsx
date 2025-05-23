
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderStatusBadge from './OrderStatusBadge';
import { formatDate } from '@/utils/formatUtils';

interface OrderCardProps {
  order: any;
  onViewOrder: (id: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewOrder }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {order.restaurants?.name || 'مطعم'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(order.created_at)}
              </p>
            </div>
            <OrderStatusBadge status={order.status} className="text-sm" />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-300">رقم الطلب:</span> {order.id}
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-300">المبلغ الإجمالي:</span> {order.total_amount} ST
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-300">عدد المنتجات:</span> {order.items.length}
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-300">طريقة الدفع:</span> {order.payment_method === 'card' ? 'بطاقة' : 'نقدي'}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => onViewOrder(order.id)}
              className="text-yellow-700 border-yellow-700 hover:bg-yellow-50 hover:text-yellow-800 dark:text-yellow-500 dark:border-yellow-500 dark:hover:bg-yellow-950"
            >
              تفاصيل الطلب
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
