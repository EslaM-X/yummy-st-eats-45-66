
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw, CreditCard, Wallet, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { VirtualCardService, Transaction } from '@/services/VirtualCardService';
import CardSection from '@/components/wallet/CardSection';
import WalletBalance from '@/components/wallet/WalletBalance';
import TransactionList from '@/components/wallet/TransactionList';

// بيانات البطاقة الافتراضية (يمكن استبدالها بالاستعلام من API)
const virtualCardData = {
  cardNumber: '4111222233334444',
  expiryDate: '12/26',
  cvv: '123',
  balance: 2580.75,
  status: 'active' as 'active' | 'frozen' | 'disabled',
};

const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('wallet');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // استعلام بيانات المعاملات
  const fetchTransactions = async (forceRefresh = false) => {
    try {
      setLoading(true);
      const userTransactions = await VirtualCardService.getUserTransactions(10, forceRefresh);
      setTransactions(userTransactions);
    } catch (error) {
      console.error('خطأ في استرداد بيانات المعاملات:', error);
      toast({
        title: 'تعذر تحميل البيانات',
        description: 'حدث خطأ أثناء تحميل بيانات المعاملات. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // تحميل البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchTransactions();
    // تنظيف التخزين المؤقت عند مغادرة الصفحة
    return () => {
      VirtualCardService.clearTransactionsCache();
    };
  }, []);

  // تنسيق المعاملات لعرضها في قائمة المعاملات
  const formatTransactionsForList = () => {
    return transactions.map(transaction => ({
      id: transaction.id.toString(),
      description: transaction.type === 'payment' 
        ? `عملية دفع #${transaction.transaction_id}` 
        : `عملية استرداد #${transaction.transaction_id}`,
      amount: transaction.amount,
      date: new Date(transaction.created_at).toLocaleString(),
      status: transaction.status,
    }));
  };

  // تحديث البيانات
  const handleRefresh = () => {
    fetchTransactions(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* رأس الصفحة */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">محفظتي</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                  إدارة المحفظة الرقمية وبطاقة ST الافتراضية
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center" 
                  onClick={handleRefresh}
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  تحديث
                </Button>
              </div>
            </div>
          </div>

          {/* ملخص الحساب */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <WalletBalance 
                balance={3750.5} 
                currency="ST"
                pendingAmount={125.25}
                lastUpdate={new Date().toISOString()}
              />
              
              <Card className="col-span-1 lg:col-span-2 flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                <div>
                  <h3 className="text-lg font-medium">تحتاج لعمليات دفع أكثر؟</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">يمكنك تعبئة رصيدك أو طلب بطاقة إضافية</p>
                </div>
                <Button onClick={() => navigate('/add-funds')}>
                  تعبئة الرصيد
                  <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Card>
            </div>
          </div>

          {/* علامات التبويب الرئيسية */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="wallet" className="text-base py-3">
                <Wallet className="h-4 w-4 mr-2" />
                المحفظة
              </TabsTrigger>
              <TabsTrigger value="card" className="text-base py-3">
                <CreditCard className="h-4 w-4 mr-2" />
                البطاقة الافتراضية
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wallet" className="space-y-8 animate-in fade-in-50">
              <div>
                <h2 className="text-xl font-semibold mb-4">آخر المعاملات</h2>
                
                {loading ? (
                  // عناصر تحميل
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="ml-3 space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <TransactionList transactions={formatTransactionsForList()} />
                )}
                
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => navigate('/transactions')}>
                    عرض كل المعاملات
                    <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="card" className="animate-in fade-in-50">
              <CardSection virtualCard={virtualCardData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WalletPage;
