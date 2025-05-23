
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from "@/components/ui/card";

interface OrderItem {
  id?: string;
  product_name: string;
  product_price: number;
  quantity: number;
  notes?: string;
}

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  const { language } = useLanguage();
  const title = language === 'en' ? 'Products' : 'المنتجات';
  
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
        {title}
      </h4>
      <Card className="p-4">
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              {language === 'en' ? 'No items found' : 'لا توجد عناصر'}
            </p>
          ) : (
            items.map((item: OrderItem, index: number) => (
              <div key={item.id || index} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{item.product_name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.quantity} × {item.product_price.toFixed(2)} ST
                  </p>
                  {item.notes && (
                    <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'en' ? 'Notes:' : 'ملاحظات:'} {item.notes}
                    </p>
                  )}
                </div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {(item.quantity * item.product_price).toFixed(2)} ST
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default OrderItemsList;
