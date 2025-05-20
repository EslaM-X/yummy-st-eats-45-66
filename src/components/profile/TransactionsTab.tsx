
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { VirtualCardService } from '@/services/VirtualCardService';
import { Transaction } from '@/components/wallet/TransactionList';

const TransactionsTab: React.FC = () => {
  const { user } = useAuth();
  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();

  // استرجاع المعاملات
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      setLoadingTransactions(true);
      try {
        const userTransactions = await VirtualCardService.getUserTransactions();
        
        // تحويل البيانات إلى الشكل المطلوب لمكوّن TransactionList
        const formattedTransactions: Transaction[] = userTransactions.map(tx => ({
          id: tx.transaction_id,
          description: tx.type === 'payment' 
            ? language === 'ar' ? 'دفع' : 'Payment' 
            : language === 'ar' ? 'استرداد' : 'Refund',
          amount: tx.amount,
          date: new Date(tx.created_at).toLocaleDateString(),
          status: tx.status
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
        {loadingTransactions ? (
          <div className="py-10 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-gray-500">
              {language === 'ar' ? 'جارٍ تحميل المعاملات...' : 'Loading transactions...'}
            </p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {language === 'ar' ? 'لا توجد معاملات' : 'No transactions found'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsTab;
