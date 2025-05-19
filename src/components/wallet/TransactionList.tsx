
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ChevronRight } from 'lucide-react';

export interface Transaction {
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

export default TransactionList;
