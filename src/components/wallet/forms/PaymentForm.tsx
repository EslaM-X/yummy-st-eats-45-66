
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VirtualCardService } from '@/services/VirtualCardService';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCardNumber } from '@/services/card/cardValidation';

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

export type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  defaultCardNumber?: string;
  defaultCvv?: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  onSuccess?: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  defaultCardNumber = "",
  defaultCvv = "",
  loading,
  setLoading,
  onSuccess
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  // نموذج الدفع
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      card_number: defaultCardNumber,
      cvv: defaultCvv,
      amount: 0,
      order_id: 0
    },
  });

  // معالجة عملية الدفع باستخدام API
  const handlePayment = async (values: PaymentFormValues) => {
    setLoading(true);
    try {
      // تنسيق البيانات للواجهة البرمجية
      const paymentData = {
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
      
      form.reset();
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
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
                      const formattedValue = formatCardNumber(e.target.value);
                      field.onChange(formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
  );
};

export default PaymentForm;
