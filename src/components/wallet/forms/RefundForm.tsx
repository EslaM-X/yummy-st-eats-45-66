
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

// نموذج التحقق لمعاملة الاسترداد
const refundSchema = z.object({
  order_id: z.coerce.number().min(1, "رقم الطلب مطلوب"),
  amount: z.coerce.number()
    .min(1, "المبلغ يجب أن يكون أكبر من 0")
    .multipleOf(0.00001, "الدقة المطلوبة هي 5 أرقام عشرية")
});

export type RefundFormValues = z.infer<typeof refundSchema>;

interface RefundFormProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  onSuccess?: () => void;
}

export const RefundForm: React.FC<RefundFormProps> = ({
  loading,
  setLoading,
  onSuccess
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  // نموذج الاسترداد
  const form = useForm<RefundFormValues>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      order_id: 0,
      amount: 0
    },
  });

  // معالجة عملية الاسترداد باستخدام API
  const handleRefund = async (values: RefundFormValues) => {
    setLoading(true);
    try {
      // تنسيق البيانات للواجهة البرمجية
      const refundData = {
        order_id: values.order_id,
        amount: Number(values.amount.toFixed(5))
      };
      
      // إرسال طلب الاسترداد
      const response = await VirtualCardService.createRefundTransaction(refundData);
      
      toast({
        title: "تم الاسترداد بنجاح",
        description: `تم استرداد ${values.amount} ST بنجاح. معرف المعاملة: REF-${response.refund_txn_id}`,
      });
      
      form.reset();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRefund)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
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
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'جارٍ المعالجة...' : 'طلب استرداد'}
        </Button>
      </form>
    </Form>
  );
};

export default RefundForm;
