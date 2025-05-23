
import React from 'react';
import OrderCard from './OrderCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderListProps {
  orders: any[];
  onViewOrder: (id: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onViewOrder }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-4" data-language={language}>
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
