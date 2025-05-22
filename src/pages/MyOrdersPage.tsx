
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { OrderService } from '@/services/OrderService';
import { useAuth } from '@/contexts/AuthContext';

const MyOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchOrders();
  }, [user, navigate, activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const status = activeTab !== 'all' ? activeTab : undefined;
      const { data, error } = await OrderService.getUserOrders(status);
      
      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: "خطأ في جلب الطلبات",
        description: "حدث خطأ أثناء محاولة جلب طلباتك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format the date in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to get the appropriate badge color based on order status
  const getStatusBadge = (status: string) => {
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

  // Function to translate order status to Arabic
  const getStatusInArabic = (status: string) => {
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

  const handleViewOrder = (orderId: string) => {
    navigate(`/my-orders/${orderId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            طلباتي
          </h1>

          <div className="mb-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">كل الطلبات</TabsTrigger>
                <TabsTrigger value="new" className="flex-1">قيد المراجعة</TabsTrigger>
                <TabsTrigger value="preparing" className="flex-1">قيد التحضير</TabsTrigger>
                <TabsTrigger value="delivering" className="flex-1">قيد التوصيل</TabsTrigger>
                <TabsTrigger value="completed" className="flex-1">مكتملة</TabsTrigger>
                <TabsTrigger value="cancelled" className="flex-1">ملغاة</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                          <Skeleton className="h-6 w-24 mb-2" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-10 w-24" />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : orders.length > 0 ? (
            // Orders list
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {order.restaurants?.name || 'مطعم'}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                          {getStatusInArabic(order.status)}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="text-sm">
                          <span className="font-medium text-gray-600 dark:text-gray-300">رقم الطلب:</span> {order.id}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-600 dark:text-gray-300">المبلغ الإجمالي:</span> {order.total_amount} ST
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-600 dark:text-gray-300">عدد المنتجات:</span> {order.items.length}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-600 dark:text-gray-300">طريقة الدفع:</span> {order.payment_method === 'card' ? 'بطاقة' : 'نقدي'}
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => handleViewOrder(order.id)}
                          className="text-yellow-700 border-yellow-700 hover:bg-yellow-50 hover:text-yellow-800 dark:text-yellow-500 dark:border-yellow-500 dark:hover:bg-yellow-950"
                        >
                          تفاصيل الطلب
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Empty state
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">لا توجد طلبات</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {activeTab === 'all' 
                  ? 'لم تقم بإنشاء أي طلبات حتى الآن.'
                  : 'لا توجد طلبات بهذه الحالة حالياً.'}
              </p>
              <Button asChild className="bg-yellow-800 hover:bg-yellow-900 text-white">
                <a href="/products">تصفح المنتجات</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyOrdersPage;
