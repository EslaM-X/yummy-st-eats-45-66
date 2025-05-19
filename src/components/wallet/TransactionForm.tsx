
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { VirtualCardService, PaymentRequest, RefundRequest } from '@/services/VirtualCardService';

// نموذج التحقق لمعاملة الدفع
const paymentSchema = z.object({
  card_number: z.string()
    .min(16, "رقم البطاقة يجب أن يكون 16 رقماً")
    .max(19)
    .refine(val => VirtualCardService.isCardNumberValid(val), {
      message: "رقم البطاقة غير صالح"
    }),
  cvv: z.string()
    .min(3, "الرمز السري يجب أن يكون 3 أرقام")
    .max(4)
    .refine(val => VirtualCardService.isCvvValid(val), {
      message: "رمز CVV غير صالح"
    }),
  amount: z.coerce.number()
    .min(1, "المبلغ يجب أن يكون أكبر من 0")
    .multipleOf(0.00001, "الدقة المطلوبة هي 5 أرقام عشرية"),
  order_id: z.coerce.number().min(1, "رقم الطلب مطلوب")
});

// نموذج التحقق لمعاملة الاسترداد
const refundSchema = z.object({
  order_id: z.coerce.number().min(1, "رقم الطلب مطلوب"),
  amount: z.coerce.number()
    .min(1, "المبلغ يجب أن يكون أكبر من 0")
    .multipleOf(0.00001, "الدقة المطلوبة هي 5 أرقام عشرية")
});

type PaymentFormValues = z.infer<typeof paymentSchema>;
type RefundFormValues = z.infer<typeof refundSchema>;

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
  const { toast } = useToast();

  // نموذج الدفع
  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      card_number: defaultCardNumber,
      cvv: defaultCvv,
      amount: 0,
      order_id: 0
    },
  });

  // نموذج الاسترداد
  const refundForm = useForm<RefundFormValues>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      order_id: 0,
      amount: 0
    },
  });

  // معالجة عملية الدفع باستخدام API
  const handlePayment = async (values: PaymentFormValues) => {
    setLoading(true);
    try {
      // تنسيق البيانات للواجهة البرمجية
      const paymentData: PaymentRequest = {
        card_number: values.card_number.replace(/\s+/g, ''),
        cvv: values.cvv,
        amount: Number(values.amount.toFixed(5)),
        order_id: values.order_id
      };
      
      // إرسال طلب الدفع
      const response = await VirtualCardService.createPaymentTransaction(paymentData);
      
      toast({
        title: "تمت المعاملة بنجاح",
        description: `تم دفع ${values.amount} ST بنجاح. معرف المعاملة: ${response.transaction_id}`,
      });
      
      paymentForm.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "فشلت المعاملة",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء معالجة المعاملة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // معالجة عملية الاسترداد باستخدام API
  const handleRefund = async (values: RefundFormValues) => {
    setLoading(true);
    try {
      // تنسيق البيانات للواجهة البرمجية
      const refundData: RefundRequest = {
        order_id: values.order_id,
        amount: Number(values.amount.toFixed(5))
      };
      
      // إرسال طلب الاسترداد
      const response = await VirtualCardService.createRefundTransaction(refundData);
      
      toast({
        title: "تم الاسترداد بنجاح",
        description: `تم استرداد ${values.amount} ST بنجاح. معرف المعاملة: REF-${response.refund_txn_id}`,
      });
      
      refundForm.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "فشل الاسترداد",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء معالجة عملية الاسترداد. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <Form {...paymentForm}>
              <form onSubmit={paymentForm.handleSubmit(handlePayment)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={paymentForm.control}
                    name="card_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم البطاقة</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="XXXX XXXX XXXX XXXX" 
                            {...field} 
                            onChange={(e) => {
                              // تنسيق رقم البطاقة أثناء الكتابة (إضافة مسافات)
                              const value = e.target.value.replace(/\s+/g, '').substring(0, 16);
                              const parts = [];
                              for (let i = 0; i < value.length; i += 4) {
                                parts.push(value.substring(i, i + 4));
                              }
                              field.onChange(parts.join(' '));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={paymentForm.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رمز CVV</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123" 
                            {...field} 
                            maxLength={4} 
                            onChange={(e) => {
                              // السماح بالأرقام فقط
                              field.onChange(e.target.value.replace(/\D/g, ''));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={paymentForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المبلغ (ST)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.00001" 
                            min="1" 
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              field.onChange(isNaN(value) ? 0 : value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={paymentForm.control}
                    name="order_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الطلب</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              field.onChange(isNaN(value) ? 0 : value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'جارٍ المعالجة...' : 'إجراء الدفع'}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="refund">
            <Form {...refundForm}>
              <form onSubmit={refundForm.handleSubmit(handleRefund)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={refundForm.control}
                    name="order_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الطلب</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              field.onChange(isNaN(value) ? 0 : value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={refundForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المبلغ (ST)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.00001" 
                            min="1" 
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              field.onChange(isNaN(value) ? 0 : value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'جارٍ المعالجة...' : 'طلب استرداد'}
                </Button>
              </form>
            </Form>
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
