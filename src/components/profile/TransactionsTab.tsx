
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { VirtualCardService } from '@/services/VirtualCardService';
import TransactionListDisplay from './TransactionListDisplay';

const TransactionsTab: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await VirtualCardService.getUserTransactions();
      if (response.data) {
        setTransactions(response.data);
      } else {
        setTransactions([]);
      }
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "خطأ في جلب المعاملات",
        description: error.message || "حدث خطأ أثناء محاولة جلب سجل معاملاتك",
        variant: "destructive",
      });
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [toast]);

  const filteredTransactions = transactions.filter(tx => {
    switch (activeTab) {
      case 'payments':
        return tx.status === 'paid';
      case 'refunds':
        return tx.status === 'refunded' || tx.status === 'refund_requested';
      default:
        return true;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>سجل المعاملات</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="payments">المدفوعات</TabsTrigger>
            <TabsTrigger value="refunds">طلبات الاسترداد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <TransactionListDisplay transactions={filteredTransactions} loading={loading} />
          </TabsContent>
          
          <TabsContent value="payments">
            <TransactionListDisplay transactions={filteredTransactions} loading={loading} />
          </TabsContent>
          
          <TabsContent value="refunds">
            <TransactionListDisplay transactions={filteredTransactions} loading={loading} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransactionsTab;
