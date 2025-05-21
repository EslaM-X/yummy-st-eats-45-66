
import React from 'react';
import { Transaction } from '@/services/VirtualCardService';
import TransactionRow from './TransactionRow';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableHeader, TableRow, TableHead } from "@/components/ui/table";

interface TransactionListDisplayProps {
  transactions: Transaction[];
  loading: boolean;
}

const TransactionListDisplay: React.FC<TransactionListDisplayProps> = ({ transactions, loading }) => {
  const { language } = useLanguage();

  if (loading) {
    return (
      <div className="py-10 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          {language === 'ar' ? 'جارٍ تحميل المعاملات...' : 'Loading transactions...'}
        </p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {language === 'ar' ? 'لا توجد معاملات لعرضها حالياً.' : 'No transactions to display at the moment.'}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{language === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
            <TableHead>{language === 'ar' ? 'الوصف' : 'Description'}</TableHead>
            <TableHead>{language === 'ar' ? 'النوع' : 'Type'}</TableHead>
            <TableHead className="text-right">{language === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
            <TableHead>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionListDisplay;
