
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import OrderItemsList from './OrderItemsList';
import DeliveryInfo from './DeliveryInfo';
import OrderSummary from './OrderSummary';

interface OrderDetailsContentProps {
  order: any;
}

const OrderDetailsContent: React.FC<OrderDetailsContentProps> = ({ order }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">تفاصيل الطلب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <OrderItemsList items={order.order_items || []} />
          
          <DeliveryInfo 
            address={order.delivery_address}
            customer_name={order.customer_name}
            customer_phone={order.customer_phone}
            notes={order.delivery_notes}
          />
          
          <OrderSummary totalAmount={order.total_amount} />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetailsContent;
