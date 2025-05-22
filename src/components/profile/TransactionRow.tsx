
import React from 'react';
import { format } from 'date-fns';
import { Transaction } from '@/services/VirtualCardService';
import { Badge } from "@/components/ui/badge";
import { arSA } from 'date-fns/locale';

interface TransactionRowProps {
  transaction: any; // Using any for now since we're adapting to order type
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const formattedDate = format(new Date(transaction.created_at), 'dd/MM/yyyy hh:mm a', { locale: arSA });
  
  // التكيف مع بيانات الطلب بدلاً من المعاملة المالية المباشرة
  const status = transaction.status;
  const amount = transaction.total_amount || 0;
  
  // تحديد نوع المعاملة من حالة الطلب
  const isRefund = status.includes('refund');
  const isPaid = status === 'paid';
  
  // تحديد لون الشارة بناءً على الحالة
  let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "default";
  
  if (status === 'paid') {
    badgeVariant = "default"; // أخضر
  } else if (status === 'refund_requested') {
    badgeVariant = "secondary"; // أصفر
  } else if (status === 'refunded') {
    badgeVariant = "destructive"; // أحمر
  } else {
    badgeVariant = "outline"; // رمادي
  }
  
  // ترجمة حالات الطلب
  const statusTranslation: Record<string, string> = {
    'placed': 'تم الطلب',
    'paid': 'تم الدفع',
    'refund_requested': 'طلب استرداد',
    'refunded': 'تم الاسترداد',
    'processing': 'قيد المعالجة',
    'delivered': 'تم التوصيل',
    'cancelled': 'ملغي'
  };

  return (
    <tr className="hover:bg-muted/50">
      <td className="p-3 text-sm">{transaction.id.substring(0, 8)}...</td>
      <td className="p-3 text-sm">{formattedDate}</td>
      <td className="p-3 text-sm">
        <Badge variant={badgeVariant}>
          {statusTranslation[status] || status}
        </Badge>
      </td>
      <td className="p-3 text-sm font-medium" dir="ltr">
        <span className={isRefund ? 'text-red-500' : 'text-green-600'}>
          {isRefund && '-'}{amount.toFixed(2)} ر.س
        </span>
      </td>
      <td className="p-3 text-sm text-muted-foreground">
        {transaction.payment_method || '-'}
      </td>
    </tr>
  );
};

export default TransactionRow;
