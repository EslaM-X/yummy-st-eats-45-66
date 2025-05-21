
import React from 'react';
import { Transaction } from '@/services/VirtualCardService';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import { TableCell, TableRow } from "@/components/ui/table";

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

  const getTransactionTypeLabel = (type: string) => {
    if (language === 'ar') {
      switch (type.toLowerCase()) {
        case 'deposit': return 'إيداع';
        case 'withdrawal': return 'سحب';
        case 'payment': return 'دفع';
        case 'refund': return 'استرداد';
        default: return type;
      }
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const currency = language === 'ar' ? 'ر.س' : 'SAR';
  
  // استخدام تاريخ المعاملة أو تنسيق تاريخ الإنشاء
  const displayDate = transaction.date || new Date(transaction.created_at).toLocaleDateString();

  return (
    <TableRow>
      <TableCell className="font-medium">{displayDate}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>
        <Badge variant="outline">
          {getTransactionTypeLabel(transaction.type)}
        </Badge>
      </TableCell>
      <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} {currency}
      </TableCell>
      <TableCell>
        <Badge variant={getStatusVariant(transaction.status) as any}>
          {translatedStatus(transaction.status)}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;
