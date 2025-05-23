
import React from 'react';

interface OrderItem {
  id?: string;
  product_name: string;
  product_price: number;
  quantity: number;
}

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
        المنتجات
      </h4>
      <div className="space-y-4">
        {items.map((item: any, index: number) => (
          <div key={item.id || index} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <div>
              <p className="font-medium">{item.product_name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.quantity} × {item.product_price} ST
              </p>
            </div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {(item.quantity * item.product_price).toFixed(2)} ST
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemsList;
