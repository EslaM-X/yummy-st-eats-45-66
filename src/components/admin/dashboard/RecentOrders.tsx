
import React from 'react';

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'مكتمل' | 'قيد التوصيل' | 'قيد التحضير' | 'ملغي';
  time: string;
}

interface RecentOrdersProps {
  orders: Order[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'قيد التوصيل': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'قيد التحضير': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'ملغي': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-xs uppercase border-b dark:border-gray-700">
            <th className="px-4 py-3 text-right rtl:text-left">رقم الطلب</th>
            <th className="px-4 py-3 text-right rtl:text-left">العميل</th>
            <th className="px-4 py-3 text-right rtl:text-left">المبلغ</th>
            <th className="px-4 py-3 text-right rtl:text-left">الحالة</th>
            <th className="px-4 py-3 text-right rtl:text-left">الوقت</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-3 text-sm">{order.id}</td>
              <td className="px-4 py-3 text-sm">{order.customer}</td>
              <td className="px-4 py-3 text-sm">{order.amount} ST</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
