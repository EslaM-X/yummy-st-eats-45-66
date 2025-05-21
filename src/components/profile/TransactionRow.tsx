
import React from 'react';
import { Transaction } from '@/services/VirtualCardService';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const { language } = useLanguage();

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'مكتمل':
        return 'success';
      case 'pending':
      case 'قيد الانتظار':
        return 'secondary';
      case 'failed':
      case 'فشل':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  const translatedStatus = (status: string) => {
    if (language === 'ar') {
      switch (status.toLowerCase()) {
        case 'completed': return 'مكتمل';
        case 'pending': return 'قيد الانتظار';
        case 'failed': return 'فشل';
        case 'refunded': return 'مسترد';
        case 'payment': return 'دفع';
        default: return status;
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const currency = language === 'ar' ? 'ر.س' : 'SAR';
  
  // استخدام تاريخ المعاملة أو تنسيق تاريخ الإنشاء
  const displayDate = transaction.date || new Date(transaction.created_at).toLocaleDateString();

  return (
    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{transaction.description}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{displayDate}</p>
      </div>
      <div className="ml-4 rtl:mr-4 rtl:ml-0 flex-shrink-0 text-right">
        <p className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} {currency}
        </p>
        <Badge variant={getStatusVariant(transaction.status) as any} className="mt-1 text-xs">
          {translatedStatus(transaction.status)}
        </Badge>
      </div>
    </div>
  );
};

export default TransactionRow;
