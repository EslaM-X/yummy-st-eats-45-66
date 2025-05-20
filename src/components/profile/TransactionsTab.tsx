
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { VirtualCardService } from '@/services/VirtualCardService';
import { Transaction } from '@/components/wallet/TransactionList';
import TransactionListDisplay from './TransactionListDisplay'; // استيراد المكون الجديد

const TransactionsTab: React.FC = () => {
  const { user } = useAuth();
  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      setLoadingTransactions(true);
      try {
        const userTransactions = await VirtualCardService.getUserTransactions();
        
        const formattedTransactions: Transaction[] = userTransactions.map(tx => ({
          id: tx.transaction_id || tx.refund_txn_id || Math.random().toString(), // Ensure ID exists
          description: tx.type === 'payment' 
            ? language === 'ar' ? `دفع للطلب #${tx.metadata?.order_id || 'N/A'}` : `Payment for Order #${tx.metadata?.order_id || 'N/A'}`
            : tx.type === 'refund'
            ? language === 'ar' ? `استرداد للطلب #${tx.metadata?.order_id || 'N/A'}` : `Refund for Order #${tx.metadata?.order_id || 'N/A'}`
            : language === 'ar' ? 'معاملة غير معروفة' : 'Unknown Transaction',
          amount: parseFloat(tx.amount) || 0,
          date: new Date(tx.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
          }),
          status: tx.status || 'unknown'
        }));
        
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: language === 'ar' ? 'خطأ في استرجاع المعاملات' : 'Error Fetching Transactions',
          description: language === 'ar' 
            ? 'حدث خطأ أثناء استرجاع معاملاتك. يرجى المحاولة مرة أخرى.' 
            : 'There was an error retrieving your transactions. Please try again.',
          variant: "destructive",
        });
      } finally {
        setLoadingTransactions(false);
      }
    };
    
    fetchTransactions();
  }, [user, language, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'ar' ? 'سجل المعاملات' : 'Transaction History'}</CardTitle>
        <CardDescription>
          {language === 'ar' 
            ? 'عرض تاريخ معاملاتك السابقة وحالتها'
            : 'View your past transactions and their status'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionListDisplay transactions={transactions} loading={loadingTransactions} />
      </CardContent>
    </Card>
  );
};

export default TransactionsTab;
