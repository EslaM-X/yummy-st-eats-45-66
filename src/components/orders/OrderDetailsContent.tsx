
import React from 'react';
import { Card } from "@/components/ui/card";
import { formatDate } from '@/utils/formatUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import OrderItemsList from './OrderItemsList';
import DeliveryInfo from './DeliveryInfo';
import OrderSummary from './OrderSummary';
import OrderStatusBadge from './OrderStatusBadge';

interface OrderDetailsContentProps {
  order: any;
}

const OrderDetailsContent: React.FC<OrderDetailsContentProps> = ({ order }) => {
  const { language } = useLanguage();
  
  const labels = {
    orderStatus: language === 'en' ? 'Status' : 'الحالة',
    orderDate: language === 'en' ? 'Order Date' : 'تاريخ الطلب',
    paymentMethod: language === 'en' ? 'Payment Method' : 'طريقة الدفع',
    orderHistory: language === 'en' ? 'Order History' : 'سجل الطلب',
    status: language === 'en' ? 'Status' : 'الحالة',
    date: language === 'en' ? 'Date' : 'التاريخ',
    notes: language === 'en' ? 'Notes' : 'ملاحظات',
    card: language === 'en' ? 'Card' : 'بطاقة',
    cash: language === 'en' ? 'Cash' : 'نقدي',
  };

  const paymentMethodText = order.payment_method === 'card' ? labels.card : labels.cash;
  const orderItems = order.order_items || [];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="space-y-6">
        <OrderItemsList items={orderItems} />
        
        <div>
          <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
            {labels.orderHistory}
          </h4>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {labels.status}
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {labels.date}
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      {labels.notes}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(order.order_tracking || []).map((track: any) => (
                    <tr key={track.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <td className="py-3 px-4">
                        <OrderStatusBadge status={track.status} />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(track.created_at, language)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {track.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
            {language === 'en' ? 'Order Information' : 'معلومات الطلب'}
          </h4>
          <Card className="p-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{labels.orderStatus}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{labels.orderDate}</span>
                <span>{formatDate(order.created_at, language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{labels.paymentMethod}</span>
                <span>{paymentMethodText}</span>
              </div>
            </div>
          </Card>
        </div>
        
        <DeliveryInfo 
          address={order.delivery_address} 
          customer_name={order.customer_name}
          customer_phone={order.customer_phone}
          notes={order.delivery_notes}
        />
        
        <OrderSummary totalAmount={order.total_amount} />
      </div>
    </div>
  );
};

export default OrderDetailsContent;
