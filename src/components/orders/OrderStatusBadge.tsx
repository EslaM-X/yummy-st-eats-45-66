
import React from 'react';

type OrderStatus = 'new' | 'preparing' | 'delivering' | 'completed' | 'cancelled';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'preparing':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
    case 'delivering':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

export const getStatusInArabic = (status: string) => {
  switch (status) {
    case 'new':
      return 'جديد';
    case 'preparing':
      return 'قيد التحضير';
    case 'delivering':
      return 'قيد التوصيل';
    case 'completed':
      return 'مكتمل';
    case 'cancelled':
      return 'ملغي';
    default:
      return status;
  }
};

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className = '' }) => {
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(status)} ${className}`}>
      {getStatusInArabic(status)}
    </span>
  );
};

export default OrderStatusBadge;
