
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { OrderService } from '@/services/OrderService';
import { useAuth } from '@/contexts/AuthContext';

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId, user, navigate]);

  const fetchOrderDetails = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await OrderService.getOrderById(id);
      
      if (error) throw error;
      if (!data) {
        throw new Error('لم يتم العثور على الطلب');
      }
      
      setOrder(data);
    } catch (error: any) {
      console.error('Error fetching order details:', error);
      toast({
        title: "خطأ في جلب تفاصيل الطلب",
        description: error.message || "حدث خطأ أثناء محاولة جلب تفاصيل الطلب",
        variant: "destructive",
      });
      navigate('/my-orders');
    } finally {
      setLoading(false);
    }
  };

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

  const handleCancelOrder = async () => {
    if (!order || !orderId) return;
    
    if (window.confirm('هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟')) {
      try {
        const { success, error } = await OrderService.cancelOrder(orderId);
        
        if (!success || error) {
          throw error || new Error('فشل إلغاء الطلب');
        }
        
        toast({
          title: "تم إلغاء الطلب بنجاح",
          description: "تم إلغاء طلبك بنجاح",
        });
        
        // Fetch updated order details
        fetchOrderDetails(orderId);
      } catch (error: any) {
        console.error('Error cancelling order:', error);
        toast({
          title: "فشل إلغاء الطلب",
          description: error.message || "حدث خطأ أثناء محاولة إلغاء الطلب",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-12 w-48 mb-8" />
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center py-16">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                لم يتم العثور على الطلب
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                عذراً، لم نتمكن من العثور على الطلب المطلوب.
              </p>
              <Button 
                onClick={() => navigate('/my-orders')}
                className="bg-yellow-800 hover:bg-yellow-900 text-white"
              >
                العودة إلى طلباتي
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  تفاصيل الطلب
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  رقم الطلب: <span className="font-medium">{order.id}</span>
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                  {getStatusInArabic(order.status)}
                </span>
              </div>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">معلومات المطعم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  {order.restaurants?.logo_url && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 mb-4 sm:mb-0">
                      <img 
                        src={order.restaurants.logo_url} 
                        alt={order.restaurants.name || 'شعار المطعم'} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=80&h=80";
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {order.restaurants?.name || 'مطعم'}
                    </h3>
                    {order.restaurants?.phone && (
                      <p className="text-gray-600 dark:text-gray-400">
                        رقم الهاتف: {order.restaurants.phone}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">تفاصيل الطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                      المنتجات
                    </h4>
                    <div className="space-y-4">
                      {order.order_items?.map((item: any, index: number) => (
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
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                      بيانات التوصيل
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                      <p className="text-gray-700 dark:text-gray-300">
                        عنوان التوصيل: {order.delivery_address}
                      </p>
                      {order.customer_name && (
                        <p className="text-gray-700 dark:text-gray-300">
                          اسم المستلم: {order.customer_name}
                        </p>
                      )}
                      {order.customer_phone && (
                        <p className="text-gray-700 dark:text-gray-300">
                          رقم الهاتف: {order.customer_phone}
                        </p>
                      )}
                      {order.delivery_notes && (
                        <p className="text-gray-700 dark:text-gray-300">
                          ملاحظات: {order.delivery_notes}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                      ملخص الطلب
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                      <div className="flex justify-between py-2">
                        <span>المجموع الفرعي:</span>
                        <span>{order.total_amount - 15} ST</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>رسوم التوصيل:</span>
                        <span>15 ST</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between py-2 font-bold">
                        <span>المجموع:</span>
                        <span>{order.total_amount} ST</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/my-orders')}
              >
                العودة إلى طلباتي
              </Button>
              
              {order.status === 'new' && (
                <Button 
                  variant="destructive" 
                  onClick={handleCancelOrder}
                >
                  إلغاء الطلب
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
