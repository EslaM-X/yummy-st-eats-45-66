
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import TransactionRow from './TransactionRow';

// تعديل التوقعات لاستخدام بيانات الطلبات بدلاً من المعاملات المالية
interface TransactionListDisplayProps {
  transactions: any[]; // سنستخدم any لأن بيانات الطلب ستكون متنوعة
  loading?: boolean;
}

const TransactionListDisplay: React.FC<TransactionListDisplayProps> = ({ transactions, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">جاري تحميل البيانات...</div>
        </CardContent>
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد معاملات حتى الآن</p>
            <p className="mt-2 text-sm text-muted-foreground">ستظهر هنا سجل معاملاتك وطلباتك عند إجراء أي عملية</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-3 text-left text-sm font-medium">المعرف</th>
                <th className="p-3 text-left text-sm font-medium">التاريخ</th>
                <th className="p-3 text-left text-sm font-medium">الحالة</th>
                <th className="p-3 text-left text-sm font-medium">المبلغ</th>
                <th className="p-3 text-left text-sm font-medium">طريقة الدفع</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionListDisplay;
