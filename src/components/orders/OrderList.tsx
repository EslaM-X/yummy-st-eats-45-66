
import React from 'react';
import OrderCard from './OrderCard';

interface OrderListProps {
  orders: any[];
  onViewOrder: (id: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onViewOrder }) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard 
          key={order.id} 
          order={order} 
          onViewOrder={onViewOrder} 
        />
      ))}
    </div>
  );
};

export default OrderList;
