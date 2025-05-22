
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart } from '@/components/ui/chart';
import { VirtualCardService } from '@/services/VirtualCardService';

type TransactionStatsState = {
  total_payments: number;
  total_refunds: number;
  payment_count: number;
  refund_count: number;
  net_revenue: number;
};

const TransactionStats = () => {
  const [stats, setStats] = useState<TransactionStatsState>({
    total_payments: 0,
    total_refunds: 0,
    payment_count: 0,
    refund_count: 0,
    net_revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    const fetchTransactionStats = async () => {
      try {
        setLoading(true);
        const { data: transactions } = await VirtualCardService.getUserTransactions();
        
        // حساب إحصائيات المعاملات
        let totalPayments = 0;
        let totalRefunds = 0;
        let paymentCount = 0;
        let refundCount = 0;
        
        if (transactions && transactions.length > 0) {
          transactions.forEach((transaction: any) => {
            if (transaction.transaction_type === 'payment') {
              totalPayments += transaction.amount;
              paymentCount++;
            } else if (transaction.transaction_type === 'refund') {
              totalRefunds += transaction.amount;
              refundCount++;
            }
          });
        }

        setStats({
          total_payments: totalPayments,
          total_refunds: totalRefunds,
          payment_count: paymentCount,
          refund_count: refundCount,
          net_revenue: totalPayments - totalRefunds
        });
      } catch (error) {
        console.error("Error fetching transaction stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionStats();
  }, [timeframe]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">إحصائيات المعاملات</CardTitle>
        <Tabs defaultValue="week" value={timeframe} onValueChange={setTimeframe}>
          <TabsList className="grid grid-cols-3 h-8">
            <TabsTrigger value="week">أسبوع</TabsTrigger>
            <TabsTrigger value="month">شهر</TabsTrigger>
            <TabsTrigger value="year">سنة</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">المدفوعات</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{stats.total_payments.toFixed(2)}</span>
                  <span className="text-xs text-gray-500">ر.س</span>
                </div>
                <span className="text-xs text-gray-500">({stats.payment_count} عملية)</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">المبالغ المستردة</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{stats.total_refunds.toFixed(2)}</span>
                  <span className="text-xs text-gray-500">ر.س</span>
                </div>
                <span className="text-xs text-gray-500">({stats.refund_count} عملية)</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">صافي الإيرادات</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{stats.net_revenue.toFixed(2)}</span>
                <span className="text-sm text-gray-500">ر.س</span>
              </div>
            </div>
            
            <BarChart
              data={[
                {
                  name: 'المدفوعات',
                  total: stats.total_payments
                },
                {
                  name: 'المسترد',
                  total: stats.total_refunds
                },
                {
                  name: 'الصافي',
                  total: stats.net_revenue
                }
              ]}
              category="name"
              index="name"
              categories={['total']}
              colors={['#0ea5e9']}
              valueFormatter={(v) => `${v} ر.س`}
              yAxisWidth={48}
              height={200}
              className="mt-6"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionStats;
