
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(500); // Default balance in ST coins

  const transactions = [
    { id: 't1', description: 'مطعم الأصيل', amount: -75, date: '15 مايو 2025', status: 'مكتمل' },
    { id: 't2', description: 'إيداع رصيد', amount: 200, date: '10 مايو 2025', status: 'مكتمل' },
    { id: 't3', description: 'سوشي تايم', amount: -120, date: '5 مايو 2025', status: 'مكتمل' },
    { id: 't4', description: 'بيتزا بلس', amount: -50, date: '1 مايو 2025', status: 'مكتمل' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            المحفظة الإلكترونية
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <Card className="col-span-1 lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">رصيد محفظتك</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <span className="text-5xl font-bold text-yellow-600 dark:text-yellow-500">{balance}</span>
                <span className="text-xl mt-2">عملة ST</span>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">شحن الرصيد</Button>
                <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white">سحب الرصيد</Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">سجل المعاملات</CardTitle>
                <CardDescription>عرض معاملاتك السابقة</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="all">الكل</TabsTrigger>
                    <TabsTrigger value="incoming">الواردة</TabsTrigger>
                    <TabsTrigger value="outgoing">الصادرة</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <div className="space-y-4">
                      {transactions.map(transaction => (
                        <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                          <div className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} ST
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="incoming">
                    <div className="space-y-4">
                      {transactions.filter(t => t.amount > 0).map(transaction => (
                        <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                          <div className="font-semibold text-green-600">
                            +{transaction.amount} ST
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="outgoing">
                    <div className="space-y-4">
                      {transactions.filter(t => t.amount < 0).map(transaction => (
                        <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                          <div className="font-semibold text-red-600">
                            {transaction.amount} ST
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">روابط سريعة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 hover:bg-yellow-50 dark:hover:bg-gray-700">
                <span className="text-3xl">🍔</span>
                <span className="mt-2">طلب طعام</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 hover:bg-yellow-50 dark:hover:bg-gray-700">
                <span className="text-3xl">🎁</span>
                <span className="mt-2">قسائم الخصم</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 hover:bg-yellow-50 dark:hover:bg-gray-700">
                <span className="text-3xl">💳</span>
                <span className="mt-2">طرق الدفع</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 hover:bg-yellow-50 dark:hover:bg-gray-700">
                <span className="text-3xl">⭐</span>
                <span className="mt-2">نقاط الولاء</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WalletPage;
