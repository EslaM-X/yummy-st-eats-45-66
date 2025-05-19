
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import OrdersFilter from './orders/OrdersFilter';
import OrdersTable from './orders/OrdersTable';
import { Order } from '@/types/admin';

const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const { toast } = useToast();

  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: 'ORD-7243',
      customer: {
        name: 'أحمد محمد',
        address: 'شارع العليا، الرياض',
        phone: '0561234567',
      },
      restaurant: {
        name: 'مطعم البيت السوري',
        address: 'شارع العليا، الرياض',
      },
      items: [
        { name: 'شاورما لحم', quantity: 2, price: 35 },
        { name: 'حمص', quantity: 1, price: 15 },
        { name: 'عصير ليمون بالنعناع', quantity: 2, price: 12 },
      ],
      status: 'مكتمل',
      paymentMethod: 'بطاقة',
      total: 145,
      orderDate: '2025-05-19 10:30',
      deliveryTime: '2025-05-19 11:15',
    },
    {
      id: 'ORD-7244',
      customer: {
        name: 'نورة سعد',
        address: 'حي النهضة، الرياض',
        phone: '0598765432',
      },
      restaurant: {
        name: 'بيتزا الشام',
        address: 'شارع التحلية، جدة',
      },
      items: [
        { name: 'بيتزا مارجريتا متوسطة', quantity: 1, price: 45 },
        { name: 'كولا', quantity: 2, price: 6 },
        { name: 'سلطة سيزر صغيرة', quantity: 1, price: 10 },
      ],
      status: 'قيد التوصيل',
      paymentMethod: 'محفظة إلكترونية',
      total: 67,
      orderDate: '2025-05-19 13:45',
      deliveryTime: null,
    },
    {
      id: 'ORD-7245',
      customer: {
        name: 'عبدالله خالد',
        address: 'حي السلامة، جدة',
        phone: '0551122334',
      },
      restaurant: {
        name: 'برجر فاكتوري',
        address: 'حي النخيل، الرياض',
      },
      items: [
        { name: 'برجر دجاج حار', quantity: 1, price: 39 },
        { name: 'بطاطس صغير', quantity: 1, price: 12 },
        { name: 'آيس كريم', quantity: 1, price: 14 },
      ],
      status: 'قيد التحضير',
      paymentMethod: 'نقداً عند الاستلام',
      total: 89,
      orderDate: '2025-05-19 14:20',
      deliveryTime: null,
    },
    {
      id: 'ORD-7246',
      customer: {
        name: 'سارة علي',
        address: 'حي الروابي، الرياض',
        phone: '0533221144',
      },
      restaurant: {
        name: 'شاورما على كيفك',
        address: 'شارع الملك فهد، الدمام',
      },
      items: [
        { name: 'شاورما دجاج سبيشال', quantity: 3, price: 28 },
        { name: 'بطاطس كبير', quantity: 1, price: 18 },
        { name: 'سلطة خضار', quantity: 1, price: 10 },
      ],
      status: 'جديد',
      paymentMethod: 'بطاقة',
      total: 120,
      orderDate: '2025-05-19 15:05',
      deliveryTime: null,
    },
    {
      id: 'ORD-7247',
      customer: {
        name: 'محمد عمر',
        address: 'حي المروج، الرياض',
        phone: '0549876543',
      },
      restaurant: {
        name: 'مطعم الأصيل',
        address: 'حي العزيزية، الخبر',
      },
      items: [
        { name: 'برياني لحم كامل', quantity: 1, price: 120 },
        { name: 'دجاج تندوري', quantity: 1, price: 95 },
        { name: 'خبز نان بالثوم', quantity: 3, price: 8 },
      ],
      status: 'ملغي',
      paymentMethod: 'محفظة إلكترونية',
      total: 240,
      orderDate: '2025-05-19 12:10',
      deliveryTime: null,
    },
  ];

  // Filter orders based on search term, tab, and date filter
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = selectedTab === 'all' ||
                      (selectedTab === 'new' && order.status === 'جديد') ||
                      (selectedTab === 'preparing' && order.status === 'قيد التحضير') ||
                      (selectedTab === 'delivering' && order.status === 'قيد التوصيل') ||
                      (selectedTab === 'completed' && order.status === 'مكتمل') ||
                      (selectedTab === 'cancelled' && order.status === 'ملغي');
    
    // For simplicity, we're not implementing actual date filtering
    const matchesDate = dateFilter === 'all';
    
    return matchesSearch && matchesTab && matchesDate;
  });

  // Functions for actions
  const handleViewOrder = (orderId: string) => {
    toast({
      title: "عرض تفاصيل الطلب",
      description: `تم فتح تفاصيل الطلب ${orderId}`,
    });
  };

  const handleUpdateStatus = (orderId: string, status: string) => {
    toast({
      title: "تحديث حالة الطلب",
      description: `تم تحديث حالة الطلب ${orderId} إلى ${status}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>الطلبات</CardTitle>
          <OrdersFilter 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
          />
        </CardHeader>
        <CardContent>
          <OrdersTable 
            orders={filteredOrders} 
            onViewOrder={handleViewOrder}
            onUpdateStatus={handleUpdateStatus}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
