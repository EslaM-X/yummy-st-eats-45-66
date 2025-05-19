
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Calendar, ArrowUpRight, ArrowDownLeft, ChevronRight, PlusCircle, History, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import VirtualCard from '@/components/wallet/VirtualCard';
import TransactionForm from '@/components/wallet/TransactionForm';
import ApiDocumentation from '@/components/wallet/ApiDocumentation';

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(500); // Default balance in ST coins
  const [activeTab, setActiveTab] = useState("all");
  const [mainTab, setMainTab] = useState("wallet");
  const { toast } = useToast();

  // بيانات افتراضية للبطاقة الافتراضية
  const virtualCard = {
    cardNumber: "4532123499983456",
    expiryDate: "09/26",
    cvv: "123",
    balance: 350,
    status: 'active' as 'active' | 'frozen' | 'disabled'
  };

  const transactions = [
    { id: 't1', description: 'مطعم الأصيل', amount: -75, date: '15 مايو 2025', status: 'مكتمل' },
    { id: 't2', description: 'إيداع رصيد', amount: 200, date: '10 مايو 2025', status: 'مكتمل' },
    { id: 't3', description: 'سوشي تايم', amount: -120, date: '5 مايو 2025', status: 'مكتمل' },
    { id: 't4', description: 'بيتزا بلس', amount: -50, date: '1 مايو 2025', status: 'مكتمل' },
  ];

  const handleAddMoney = () => {
    setBalance(prev => prev + 100);
    toast({
      title: "تم شحن الرصيد",
      description: "تم إضافة 100 عملة ST إلى محفظتك",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
              محفظتي الإلكترونية
            </h1>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-dashed border-2"
                onClick={() => toast({
                  title: "قريبًا",
                  description: "هذه الميزة ستكون متاحة قريبًا",
                })}
              >
                <History className="h-4 w-4" />
                <span>سجل المعاملات</span>
              </Button>
              <Button 
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white flex items-center gap-2"
                onClick={handleAddMoney}
              >
                <PlusCircle className="h-4 w-4" />
                <span>إضافة رصيد</span>
              </Button>
            </div>
          </div>
          
          {/* الأقسام الرئيسية: المحفظة والبطاقة الافتراضية ووثائق API */}
          <Tabs value={mainTab} onValueChange={setMainTab} className="mb-8">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="wallet" className="flex-1">
                <Wallet className="h-4 w-4 mr-2" /> المحفظة
              </TabsTrigger>
              <TabsTrigger value="card" className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" /> البطاقة الافتراضية
              </TabsTrigger>
              <TabsTrigger value="api" className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M17 6.1H3"></path><path d="M21 12.1H3"></path><path d="M15.1 18H3"></path></svg>
                API
              </TabsTrigger>
            </TabsList>
          
            {/* قسم المحفظة */}
            <TabsContent value="wallet">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <Card className="col-span-1 lg:col-span-1 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500"></div>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,_#ffffff_0%,_transparent_58%)]"></div>
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl text-white">رصيد محفظتك</CardTitle>
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                          <Wallet className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10 flex flex-col items-center justify-center py-8">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-white mb-1">{balance}</span>
                        <span className="text-xl ml-2 text-white/80">ST</span>
                      </div>
                      <div className="mt-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> تم التحديث: اليوم
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="relative z-10 flex justify-center gap-4 bg-white/10 backdrop-blur-sm">
                      <Button 
                        className="flex-1 bg-white hover:bg-white/90 text-amber-600"
                        onClick={handleAddMoney}
                      >
                        شحن الرصيد
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-white text-white hover:bg-white/20"
                        onClick={() => toast({
                          title: "قريبًا",
                          description: "هذه الميزة ستكون متاحة قريبًا",
                        })}
                      >
                        سحب الرصيد
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
                
                <Card className="col-span-1 lg:col-span-2 shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <CardTitle className="text-2xl flex items-center">
                      سجل المعاملات
                      <span className="ml-2 text-xs bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300 px-2 py-0.5 rounded-full">
                        {transactions.length}
                      </span>
                    </CardTitle>
                    <CardDescription>تفاصيل المعاملات السابقة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="all">الكل</TabsTrigger>
                        <TabsTrigger value="incoming">الواردة</TabsTrigger>
                        <TabsTrigger value="outgoing">الصادرة</TabsTrigger>
                      </TabsList>
                      <TabsContent value="all">
                        <TransactionList transactions={transactions} />
                      </TabsContent>
                      <TabsContent value="incoming">
                        <TransactionList transactions={transactions.filter(t => t.amount > 0)} />
                      </TabsContent>
                      <TabsContent value="outgoing">
                        <TransactionList transactions={transactions.filter(t => t.amount < 0)} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6">روابط سريعة</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <QuickLinkCard 
                    icon="🍔" 
                    title="طلب طعام" 
                    description="اطلب وجبتك المفضلة"
                    path="/restaurants"
                  />
                  <QuickLinkCard 
                    icon="🎁" 
                    title="قسائم الخصم" 
                    description="وفر على طلباتك القادمة"
                    path="#"
                  />
                  <QuickLinkCard 
                    icon="💳" 
                    title="طرق الدفع" 
                    description="أضف أو عدل طرق الدفع"
                    path="#"
                  />
                  <QuickLinkCard 
                    icon="⭐" 
                    title="نقاط الولاء" 
                    description="تعرف على مكافآتك"
                    path="/rewards"
                  />
                </div>
              </div>
              
              <Card className="mb-8 overflow-hidden border-0 shadow-md">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5">
                  <div className="bg-white dark:bg-gray-800 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">نظام الإحالة</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
                          ادع أصدقائك واحصل على 50 عملة ST لكل صديق ينضم!
                        </p>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                        onClick={() => toast({
                          title: "تم نسخ رابط الدعوة",
                          description: "شارك هذا الرابط مع أصدقائك للحصول على المكافأة",
                        })}
                      >
                        مشاركة رابط الدعوة
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* قسم البطاقة الافتراضية */}
            <TabsContent value="card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="order-2 lg:order-1">
                  <TransactionForm 
                    defaultCardNumber={virtualCard.cardNumber}
                    defaultCvv={virtualCard.cvv}
                    onSuccess={() => toast({
                      title: "تم تحديث البيانات",
                      description: "تم تحديث بيانات المحفظة والبطاقة بنجاح",
                    })}
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <VirtualCard 
                    cardNumber={virtualCard.cardNumber}
                    expiryDate={virtualCard.expiryDate}
                    cvv={virtualCard.cvv}
                    balance={virtualCard.balance}
                    status={virtualCard.status}
                  />
                  
                  <Card className="mt-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">حماية البطاقة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <p className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400 mr-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                          تشفير كامل لبيانات البطاقة
                        </p>
                        <p className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400 mr-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                          مراقبة نشاط البطاقة على مدار الساعة
                        </p>
                        <p className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400 mr-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                          إمكانية تجميد البطاقة فوراً عند الحاجة
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800/30">
                        <Button 
                          variant="outline" 
                          className="w-full border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          onClick={() => toast({
                            title: virtualCard.status === 'active' ? "تم تجميد البطاقة" : "تم تنشيط البطاقة",
                            description: virtualCard.status === 'active' ? "تم تجميد بطاقتك الافتراضية بنجاح" : "تم تنشيط بطاقتك الافتراضية بنجاح",
                          })}
                        >
                          {virtualCard.status === 'active' ? 'تجميد البطاقة' : 'تنشيط البطاقة'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* قسم توثيق API */}
            <TabsContent value="api">
              <ApiDocumentation />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// مكون قائمة المعاملات
interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">لا توجد معاملات لعرضها</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {transactions.map(transaction => (
        <div 
          key={transaction.id} 
          className="flex justify-between items-center p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center">
            <div className={`
              p-3 rounded-full mr-3 rtl:mr-0 rtl:ml-3
              ${transaction.amount > 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}
            `}>
              {transaction.amount > 0 ? (
                <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDownLeft className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              )}
            </div>
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className={`font-bold mr-3 rtl:mr-0 rtl:ml-3 ${transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
              {transaction.amount > 0 ? '+' : ''}{transaction.amount} ST
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

// مكون روابط سريعة
interface QuickLinkCardProps {
  icon: string;
  title: string;
  description: string;
  path: string;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ icon, title, description, path }) => {
  return (
    <a 
      href={path}
      className="block group"
    >
      <Card className="h-full border-0 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{icon}</span>
            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
            </div>
          </div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </Card>
    </a>
  );
};

export default WalletPage;
