
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import TransactionListDisplay from './TransactionListDisplay';
import { Transaction } from '@/components/wallet/TransactionList';
import { VirtualCardService } from '@/services/VirtualCardService';

const TransactionsTab: React.FC = () => {
  const { language } = useLanguage();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const userTransactions = await VirtualCardService.getUserTransactions();
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Failed to load transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'ar' ? 'سجل المعاملات' : 'Transaction History'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionListDisplay 
          transactions={transactions}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default TransactionsTab;
