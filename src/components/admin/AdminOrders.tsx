
import React, { useState } from 'react';
import { Search, Filter, Eye, RefreshCw, Check, X, Map, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  restaurant: {
    name: string;
    address: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: 'جديد' | 'قيد التحضير' | 'قيد التوصيل' | 'مكتمل' | 'ملغي';
  paymentMethod: 'بطاقة' | 'نقداً عند الاستلام' | 'محفظة إلكترونية';
  total: number;
  orderDate: string;
  deliveryTime: string | null;
}

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
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>الطلبات</CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث عن طلب..."
                className="pl-8 pr-4 w-full"
              />
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="تصفية حسب التاريخ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأيام</SelectItem>
                <SelectItem value="today">اليوم</SelectItem>
                <SelectItem value="yesterday">الأمس</SelectItem>
                <SelectItem value="week">آخر 7 أيام</SelectItem>
                <SelectItem value="month">آخر 30 يوم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="new">جديد</TabsTrigger>
              <TabsTrigger value="preparing">قيد التحضير</TabsTrigger>
              <TabsTrigger value="delivering">قيد التوصيل</TabsTrigger>
              <TabsTrigger value="completed">مكتمل</TabsTrigger>
              <TabsTrigger value="cancelled">ملغي</TabsTrigger>
            </TabsList>
          </Tabs>
          
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
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
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
                          <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order.id)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">عرض</span>
                          </Button>
                          
                          {order.status === 'جديد' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                                onClick={() => handleUpdateStatus(order.id, 'قيد التحضير')}
                              >
                                <RefreshCw className="h-4 w-4" />
                                <span className="sr-only">بدء التحضير</span>
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700 hover:bg-red-100"
                                onClick={() => handleUpdateStatus(order.id, 'ملغي')}
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
                              onClick={() => handleUpdateStatus(order.id, 'قيد التوصيل')}
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
                              onClick={() => handleUpdateStatus(order.id, 'مكتمل')}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
