
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderStatusBadge from './OrderStatusBadge';
import { formatDate } from '@/utils/formatUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { OrderItem } from '@/types';

interface OrderCardProps {
  order: any;
  onViewOrder: (id: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewOrder }) => {
  const { language } = useLanguage();
  
  const labels = {
    orderNumber: language === 'en' ? 'Order Number:' : 'رقم الطلب:',
    totalAmount: language === 'en' ? 'Total Amount:' : 'المبلغ الإجمالي:',
    numProducts: language === 'en' ? 'Number of Products:' : 'عدد المنتجات:',
    paymentMethod: language === 'en' ? 'Payment Method:' : 'طريقة الدفع:',
    viewDetails: language === 'en' ? 'Order Details' : 'تفاصيل الطلب',
    card: language === 'en' ? 'Card' : 'بطاقة',
    cash: language === 'en' ? 'Cash' : 'نقدي'
  };
  
  const paymentMethodText = order.payment_method === 'card' ? labels.card : labels.cash;
  
  // Calculate number of items, checking both items JSON field and order_items relationship
  const itemsLength = Array.isArray(order.items) ? order.items.length : 0;
  const orderItems = Array.isArray(order.order_items) ? order.order_items : [];
  const itemCount = itemsLength || orderItems.length || 0;
  
  // Format order ID for display
  const shortOrderId = order.id && order.id.length > 8 
    ? `${order.id.substring(0, 8)}...`
    : order.id;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {order.restaurants?.name || (language === 'en' ? 'Restaurant' : 'مطعم')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(order.created_at, language)}
              </p>
            </div>
            <OrderStatusBadge status={order.status} className="text-sm" />
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-300">{labels.orderNumber}</span> {shortOrderId}
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-300">{labels.totalAmount}</span> {order.total_amount} ST
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-300">{labels.numProducts}</span> {itemCount}
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-300">{labels.paymentMethod}</span> {paymentMethodText}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => onViewOrder(order.id)}
              className="text-yellow-700 border-yellow-700 hover:bg-yellow-50 hover:text-yellow-800 dark:text-yellow-500 dark:border-yellow-500 dark:hover:bg-yellow-950"
            >
              {labels.viewDetails}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
