
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { VirtualCardService } from '@/services/VirtualCardService';
import { AlertCircle, CheckCircle2, ClockIcon, RefreshCw } from 'lucide-react';

const AdminRefunds: React.FC = () => {
  const [pendingRefunds, setPendingRefunds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  const loadPendingRefunds = async () => {
    try {
      setIsLoading(true);
      const refunds = await VirtualCardService.getPendingRefunds();
      setPendingRefunds(refunds);
    } catch (error) {
      console.error("Error loading pending refunds:", error);
      toast({
        title: "خطأ في تحميل طلبات الاسترداد",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPendingRefunds();
  }, []);

  const handleProcessRefund = async (refund: any) => {
    try {
      setProcessingId(refund.id);
      
      // Process the refund using our service
      await VirtualCardService.processRefund({
        orderId: refund.order_id,
        amount: refund.amount,
        reason: refund.reason || "Admin approved refund"
      });

      // Update local state to remove the processed refund
      setPendingRefunds(pendingRefunds.filter(r => r.id !== refund.id));
      
      toast({
        title: "تم معالجة الاسترداد",
        description: `تم معالجة استرداد بقيمة ${refund.amount} بنجاح للطلب ${refund.order_id}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error processing refund:", error);
      toast({
        title: "فشل في معالجة الاسترداد",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء معالجة طلب الاسترداد",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  };

  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">طلبات الاسترداد</CardTitle>
          <Button
            size="sm"
            onClick={loadPendingRefunds}
            variant="outline"
            className="flex items-center gap-1"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : pendingRefunds.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <CheckCircle2 className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-lg font-medium">لا توجد طلبات استرداد معلقة</p>
              <p className="text-sm">ستظهر طلبات الاسترداد الجديدة هنا عندما يقدمها العملاء</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRefunds.map((refund) => (
                <div 
                  key={refund.id} 
                  className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">طلب استرداد #{refund.id.substring(0, 8)}</h3>
                        <Badge 
                          variant="outline" 
                          className={getRefundStatusColor(refund.status)}
                        >
                          {refund.status === 'pending' && <ClockIcon className="h-3 w-3 mr-1" />}
                          {refund.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        تاريخ الطلب: {formatDate(refund.created_at)}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">العميل:</span> {refund.profiles?.full_name || 'غير معروف'}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">رقم الطلب:</span> {refund.order_id}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <div className="text-lg font-bold text-primary">
                        {refund.amount} ريال
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleProcessRefund(refund)}
                          disabled={processingId === refund.id}
                          className="w-full md:w-auto"
                        >
                          {processingId === refund.id ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              معالجة...
                            </>
                          ) : (
                            'موافقة واسترداد'
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedRefund(refund)}
                          className="w-full md:w-auto"
                        >
                          التفاصيل
                        </Button>
                      </div>
                    </div>
                  </div>
                  {selectedRefund?.id === refund.id && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-850 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-1">سبب الاسترداد:</h4>
                        <p className="text-sm bg-white dark:bg-gray-800 p-2 rounded border dark:border-gray-700">
                          {refund.reason || 'لم يتم تقديم سبب'}
                        </p>
                      </div>
                      {refund.orders && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">معلومات الطلب:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="bg-white dark:bg-gray-800 p-2 rounded border dark:border-gray-700">
                              <span className="font-medium">إجمالي الطلب:</span> {refund.orders.total_amount} ريال
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-2 rounded border dark:border-gray-700">
                              <span className="font-medium">تاريخ الطلب:</span> {formatDate(refund.orders.created_at)}
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-2 rounded border dark:border-gray-700 md:col-span-2">
                              <span className="font-medium">العنوان:</span> {refund.orders.delivery_address}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-end pt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedRefund(null)}
                        >
                          إغلاق التفاصيل
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRefunds;
