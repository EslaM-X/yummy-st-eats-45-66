
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';

// نموذج التحقق لمعاملة الدفع
const paymentSchema = z.object({
  card_number: z.string().min(16, "رقم البطاقة يجب أن يكون 16 رقماً").max(19),
  cvv: z.string().min(3, "الرمز السري يجب أن يكون 3 أرقام").max(4),
  amount: z.coerce.number().min(1, "المبلغ يجب أن يكون أكبر من 0"),
  order_id: z.coerce.number().min(1, "رقم الطلب مطلوب")
});

// نموذج التحقق لمعاملة الاسترداد
const refundSchema = z.object({
  order_id: z.coerce.number().min(1, "رقم الطلب مطلوب"),
  amount: z.coerce.number().min(1, "المبلغ يجب أن يكون أكبر من 0")
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

  // عملية الدفع - محاكاة فقط
  const handlePayment = async (values: PaymentFormValues) => {
    setLoading(true);
    try {
      // هنا سيتم إرسال البيانات إلى الـ API
      console.log("إرسال معاملة دفع:", values);
      
      // محاكاة طلب API - في التطبيق الحقيقي سيكون هناك اتصال فعلي بـ API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تمت المعاملة بنجاح",
        description: `تم دفع ${values.amount} ST بنجاح. معرف المعاملة: TXN-${Math.floor(Math.random() * 1000)}`,
      });
      
      paymentForm.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "فشلت المعاملة",
        description: "حدث خطأ أثناء معالجة المعاملة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // عملية الاسترداد - محاكاة فقط
  const handleRefund = async (values: RefundFormValues) => {
    setLoading(true);
    try {
      // هنا سيتم إرسال البيانات إلى الـ API
      console.log("إرسال معاملة استرداد:", values);
      
      // محاكاة طلب API - في التطبيق الحقيقي سيكون هناك اتصال فعلي بـ API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم الاسترداد بنجاح",
        description: `تم استرداد ${values.amount} ST بنجاح. معرف المعاملة: REF-${Math.floor(Math.random() * 1000)}`,
      });
      
      refundForm.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "فشل الاسترداد",
        description: "حدث خطأ أثناء معالجة عملية الاسترداد. يرجى المحاولة مرة أخرى.",
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
        <CardDescription>يمكنك إجراء عمليات الدفع أو الاسترداد</CardDescription>
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
                          <Input placeholder="XXXX XXXX XXXX XXXX" {...field} />
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
                          <Input placeholder="123" {...field} maxLength={4} />
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
                          <Input type="number" step="0.01" min="1" {...field} />
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
                          <Input type="number" min="1" {...field} />
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
                          <Input type="number" min="1" {...field} />
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
                          <Input type="number" step="0.01" min="1" {...field} />
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
        <p className="mb-1">🔑 جميع المعاملات تتطلب مصادقة وتتم بشكل آمن.</p>
        <p>💡 تتم معالجة المدفوعات والاستردادات بدقة 5 خانات عشرية.</p>
      </CardFooter>
    </Card>
  );
};

export default TransactionForm;
