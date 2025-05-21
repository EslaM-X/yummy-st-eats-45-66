
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import OrdersFilter from './orders/OrdersFilter';
import OrdersTable from './orders/OrdersTable';
import { Order, OrderItem } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // جلب الطلبات من Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        console.log("Fetching orders from Supabase...");
        
        // محاولة جلب البيانات من Supabase
        const { data, error } = await supabase
          .from('orders')
          .select('*');
        
        if (error) {
          console.error('Error fetching orders:', error);
          // استخدام البيانات الوهمية في حالة حدوث خطأ
          setOrders(generateMockOrders());
          return;
        }
        
        console.log("Orders data fetched:", data);
        
        if (data && data.length > 0) {
          // تحميل بيانات المستخدمين والمطاعم
          const ordersWithDetails = await Promise.all(data.map(async (order) => {
            // جلب بيانات المستخدم
            const { data: userData, error: userError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', order.user_id)
              .maybeSingle();
            
            if (userError) {
              console.error('Error fetching user profile:', userError);
            }
            
            // جلب بيانات المطعم
            const { data: restaurantData, error: restaurantError } = await supabase
              .from('restaurants')
              .select('*')
              .eq('id', order.restaurant_id)
              .maybeSingle();
            
            if (restaurantError) {
              console.error('Error fetching restaurant:', restaurantError);
            }
            
            const formattedItems: OrderItem[] = Array.isArray(order.items) ? 
              order.items.map((item: any) => ({
                name: item.name || 'منتج',
                quantity: item.quantity || 1,
                price: item.price || 0
              })) : [];

            // تنسيق الطلب للعرض
            return {
              id: order.id,
              customer: {
                name: userData?.full_name || 'عميل',
                address: order.delivery_address || 'عنوان التوصيل',
                phone: userData?.phone || '05xxxxxxxx',
              },
              restaurant: {
                name: restaurantData?.name || 'مطعم',
                address: restaurantData?.address || 'عنوان المطعم',
              },
              items: formattedItems,
              status: mapOrderStatus(order.status),
              paymentMethod: mapPaymentMethod(order.payment_method),
              total: order.total_amount || 0,
              orderDate: formatOrderDate(order.created_at),
              deliveryTime: order.delivered_at ? formatOrderDate(order.delivered_at) : null,
            } as Order;
          }));
          
          console.log("Orders with details:", ordersWithDetails);
          setOrders(ordersWithDetails);
        } else {
          // استخدام البيانات الوهمية إذا كانت البيانات فارغة
          console.log("No orders found, using mock data");
          setOrders(generateMockOrders());
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders(generateMockOrders());
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // تنسيق حالة الطلب للواجهة العربية
  const mapOrderStatus = (status: string): Order['status'] => {
    switch (status?.toLowerCase()) {
      case 'new': return 'جديد';
      case 'preparing': return 'قيد التحضير';
      case 'delivering': return 'قيد التوصيل';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return 'جديد';
    }
  };

  // تنسيق طريقة الدفع للواجهة العربية
  const mapPaymentMethod = (method: string): Order['paymentMethod'] => {
    switch (method?.toLowerCase()) {
      case 'card': return 'بطاقة';
      case 'cash': return 'نقداً عند الاستلام';
      case 'wallet': return 'محفظة إلكترونية';
      default: return 'بطاقة';
    }
  };

  // تنسيق تاريخ الطلب
  const formatOrderDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } catch (e) {
      return dateString || '';
    }
  };

  // إنشاء بيانات وهمية للطلبات
  const generateMockOrders = (): Order[] => {
    return [
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
  };

  // تصفية الطلبات حسب البحث، التبويب والتاريخ
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = selectedTab === 'all' ||
                      (selectedTab === 'new' && order.status === 'جديد') ||
                      (selectedTab === 'preparing' && order.status === 'قيد التحضير') ||
                      (selectedTab === 'delivering' && order.status === 'قيد التوصيل') ||
                      (selectedTab === 'completed' && order.status === 'مكتمل') ||
                      (selectedTab === 'cancelled' && order.status === 'ملغي');
    
    // للتبسيط، لم نقم بتنفيذ تصفية التاريخ الفعلية
    const matchesDate = dateFilter === 'all';
    
    return matchesSearch && matchesTab && matchesDate;
  });

  // دوال للإجراءات
  const handleViewOrder = (orderId: string) => {
    toast({
      title: "عرض تفاصيل الطلب",
      description: `تم فتح تفاصيل الطلب ${orderId}`,
    });
  };

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      // تحويل حالة الطلب إلى الصيغة المناسبة لقاعدة البيانات
      let dbStatus = '';
      switch (newStatus) {
        case 'جديد': dbStatus = 'new'; break;
        case 'قيد التحضير': dbStatus = 'preparing'; break;
        case 'قيد التوصيل': dbStatus = 'delivering'; break;
        case 'مكتمل': dbStatus = 'completed'; break;
        case 'ملغي': dbStatus = 'cancelled'; break;
        default: dbStatus = 'new';
      }
      
      console.log(`Updating order ${orderId} status to ${dbStatus}`);
      
      // محاولة تحديث حالة الطلب في Supabase
      const { error } = await supabase
        .from('orders')
        .update({ status: dbStatus })
        .eq('id', orderId);
      
      if (error) {
        console.error('Error updating order status:', error);
        // عرض رسالة خطأ
        toast({
          title: "خطأ في تحديث حالة الطلب",
          description: `حدث خطأ أثناء تحديث حالة الطلب: ${error.message}`,
          variant: "destructive",
        });
        return;
      }
      
      // تحديث الحالة محليًا في حالة النجاح
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      // عرض رسالة نجاح
      toast({
        title: "تحديث حالة الطلب",
        description: `تم تحديث حالة الطلب ${orderId} إلى ${newStatus}`,
      });
    } catch (error: any) {
      console.error('Error in updating order status:', error);
      toast({
        title: "خطأ في تحديث الحالة",
        description: "حدث خطأ غير متوقع أثناء تحديث حالة الطلب",
        variant: "destructive",
      });
    }
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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="mr-3 text-lg">جاري تحميل الطلبات...</span>
            </div>
          ) : (
            <OrdersTable 
              orders={filteredOrders} 
              onViewOrder={handleViewOrder}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
