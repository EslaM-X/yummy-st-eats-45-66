
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/contexts/LanguageContext';
import PaymentForm from './forms/PaymentForm';
import RefundForm from './forms/RefundForm';

interface TransactionFormProps {
  defaultCardNumber?: string;
  defaultCvv?: string;
  onSuccess?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  defaultCardNumber = "",
  defaultCvv = "",
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<string>("payment");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>معاملات بطاقة ST</CardTitle>
        <CardDescription>يمكنك إجراء عمليات الدفع أو الاسترداد باستخدام API المركزي</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="payment">دفع</TabsTrigger>
            <TabsTrigger value="refund">استرداد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payment">
            <PaymentForm 
              defaultCardNumber={defaultCardNumber} 
              defaultCvv={defaultCvv} 
              loading={loading}
              setLoading={setLoading}
              onSuccess={onSuccess}
            />
          </TabsContent>
          
          <TabsContent value="refund">
            <RefundForm 
              loading={loading}
              setLoading={setLoading}
              onSuccess={onSuccess}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
        <p className="mb-1">🔑 جميع المعاملات تتم بواسطة واجهة برمجة التطبيقات المركزية لـ Salla.</p>
        <p>💡 تتم معالجة المدفوعات والاستردادات بدقة 5 خانات عشرية كما هو مطلوب.</p>
      </CardFooter>
    </Card>
  );
};

export default TransactionForm;
