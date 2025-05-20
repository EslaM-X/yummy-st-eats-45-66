
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { VirtualCardService } from '@/services/VirtualCardService';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, RefreshCcw, TrendingUp } from 'lucide-react';

const TransactionStats: React.FC = () => {
  const [stats, setStats] = useState({
    total_payments: 0,
    total_refunds: 0,
    payment_count: 0,
    refund_count: 0,
    net_revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadStats = async () => {
    try {
      setLoading(true);
      const transactionStats = await VirtualCardService.getTransactionStats();
      setStats(transactionStats);
    } catch (error) {
      console.error('Failed to fetch transaction stats:', error);
      toast({
        title: "خطأ في تحميل الإحصائيات",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء تحميل إحصائيات المعاملات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Format number with commas and fixed decimal places
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800/30">
        <CardContent className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-700"></div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1">إجمالي المدفوعات</h3>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                    {formatCurrency(stats.total_payments)} <span className="text-sm">ST</span>
                  </div>
                </div>
                <div className="p-2 bg-purple-200 dark:bg-purple-800/50 rounded-lg">
                  <CreditCard className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                </div>
              </div>
              <div className="mt-2 text-xs text-purple-700 dark:text-purple-400">
                عدد العمليات: {stats.payment_count}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800/30">
        <CardContent className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-700"></div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">إجمالي المستردات</h3>
                  <div className="text-2xl font-bold text-amber-900 dark:text-amber-200">
                    {formatCurrency(stats.total_refunds)} <span className="text-sm">ST</span>
                  </div>
                </div>
                <div className="p-2 bg-amber-200 dark:bg-amber-800/50 rounded-lg">
                  <RefreshCcw className="h-6 w-6 text-amber-700 dark:text-amber-300" />
                </div>
              </div>
              <div className="mt-2 text-xs text-amber-700 dark:text-amber-400">
                عدد العمليات: {stats.refund_count}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800/30">
        <CardContent className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">صافي الإيرادات</h3>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-200">
                    {formatCurrency(stats.net_revenue)} <span className="text-sm">ST</span>
                  </div>
                </div>
                <div className="p-2 bg-green-200 dark:bg-green-800/50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-700 dark:text-green-300" />
                </div>
              </div>
              <div className="mt-2 text-xs text-green-700 dark:text-green-400">
                معدل الاسترداد: {stats.refund_count > 0 ? Math.round((stats.total_refunds / stats.total_payments) * 100) : 0}%
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionStats;
