
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, History, PlusCircle, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WalletSection from '@/components/wallet/WalletSection';
import CardSection from '@/components/wallet/CardSection';
import { Transaction } from '@/components/wallet/TransactionList';

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(500); // Default balance in ST coins
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

  const transactions: Transaction[] = [
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
          
          {/* الأقسام الرئيسية: المحفظة والبطاقة الافتراضية */}
          <Tabs value={mainTab} onValueChange={setMainTab} className="mb-8">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="wallet" className="flex-1">
                <Wallet className="h-4 w-4 mr-2" /> المحفظة
              </TabsTrigger>
              <TabsTrigger value="card" className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" /> البطاقة الافتراضية
              </TabsTrigger>
            </TabsList>
          
            {/* قسم المحفظة */}
            <TabsContent value="wallet">
              <WalletSection 
                balance={balance} 
                transactions={transactions} 
                onAddMoney={handleAddMoney} 
              />
            </TabsContent>
            
            {/* قسم البطاقة الافتراضية */}
            <TabsContent value="card">
              <CardSection virtualCard={virtualCard} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WalletPage;
