
import React from 'react';
import { Eye, RefreshCw, X, Map, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Order } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onViewOrder,
  onUpdateStatus
}) => {
  // Get status badge style
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'جديد':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'قيد التحضير':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'قيد التوصيل':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'مكتمل':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'ملغي':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="px-4 py-3 text-right rtl:text-left">رقم الطلب</th>
            <th className="px-4 py-3 text-right rtl:text-left">العميل</th>
            <th className="px-4 py-3 text-right rtl:text-left">المطعم</th>
            <th className="px-4 py-3 text-right rtl:text-left">المبلغ</th>
            <th className="px-4 py-3 text-right rtl:text-left">الحالة</th>
            <th className="px-4 py-3 text-right rtl:text-left">التاريخ</th>
            <th className="px-4 py-3 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{order.customer.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{order.restaurant.name}</td>
                <td className="px-4 py-3 text-sm font-semibold">{order.total} ST</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{order.orderDate}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                    <Button variant="ghost" size="sm" onClick={() => onViewOrder(order.id)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">عرض</span>
                    </Button>
                    
                    {order.status === 'جديد' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                          onClick={() => onUpdateStatus(order.id, 'قيد التحضير')}
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">بدء التحضير</span>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-100"
                          onClick={() => onUpdateStatus(order.id, 'ملغي')}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">إلغاء</span>
                        </Button>
                      </>
                    )}
                    
                    {order.status === 'قيد التحضير' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                        onClick={() => onUpdateStatus(order.id, 'قيد التوصيل')}
                      >
                        <Map className="h-4 w-4" />
                        <span className="sr-only">بدء التوصيل</span>
                      </Button>
                    )}
                    
                    {order.status === 'قيد التوصيل' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-green-600 hover:text-green-700 hover:bg-green-100"
                        onClick={() => onUpdateStatus(order.id, 'مكتمل')}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">إكمال</span>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                لا يوجد طلبات مطابقة لمعايير البحث
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
