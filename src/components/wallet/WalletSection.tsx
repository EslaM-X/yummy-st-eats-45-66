
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { History, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WalletBalance from './WalletBalance';
import TransactionList from './TransactionList';
import QuickLinkCard from './QuickLinkCard';
import { Transaction } from './TransactionList';

interface WalletSectionProps {
  balance: number;
  transactions: Transaction[];
  onAddMoney: () => void;
}

const WalletSection: React.FC<WalletSectionProps> = ({ 
  balance, 
  transactions, 
  onAddMoney 
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <WalletBalance balance={balance} handleAddMoney={onAddMoney} />
        
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
            path="/rewards"
          />
          <QuickLinkCard 
            icon="💳" 
            title="واجهة برمجة البطاقات" 
            description="وثائق API للمطورين"
            path="https://salla-shop.com/salla-developer/"
            isExternal={true}
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
    </>
  );
};

export default WalletSection;
