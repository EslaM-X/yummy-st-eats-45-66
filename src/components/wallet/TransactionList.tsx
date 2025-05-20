
import React from 'react';

export interface Transaction {
  id: string | number;
  description: string;
  amount: number;
  date: string;
  status: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

// This is a simple placeholder component after removing wallet functionality
const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div 
          key={transaction.id} 
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <div className="font-medium">{transaction.description}</div>
            <div className="text-sm text-gray-500">{transaction.date}</div>
          </div>
          <div className="text-right">
            <div className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.amount > 0 ? '+' : ''}{transaction.amount} ST
            </div>
            <div className="text-xs text-gray-500">{transaction.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
