
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { VirtualCardService } from '@/services/VirtualCardService';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// نموذج التحقق لمعاملة الاسترداد
const refundSchema = z.object({
  order_id: z.number().min(1, "رقم الطلب مطلوب"),
  amount: z.coerce.number()
    .min(1, "المبلغ يجب أن يكون أكبر من 0")
    .multipleOf(0.00001, "الدقة المطلوبة هي 5 أرقام عشرية")
});

type RefundFormValues = z.infer<typeof refundSchema>;

interface RefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: number;
  amount: number;
  onSuccess?: () => void;
}

const RefundDialog: React.FC<RefundDialogProps> = ({
  open,
  onOpenChange,
  orderId,
  amount,
  onSuccess
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<RefundFormValues>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      order_id: orderId,
      amount: amount
    },
  });

  const handleRefund = async (values: RefundFormValues) => {
    if (!values.order_id || values.amount <= 0) {
      toast({
        title: "بيانات غير صالحة",
        description: "يرجى التأكد من إدخال رقم الطلب والمبلغ بشكل صحيح",
        variant: "destructive",
      });
      return;
    }

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
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>طلب استرداد</DialogTitle>
          <DialogDescription>
            أدخل المبلغ المراد استرداده لهذا الطلب. سيتم استرداده إلى بطاقة ST الافتراضية.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRefund)} className="space-y-4">
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
                      disabled
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
                      max={amount}
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
            
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                إلغاء
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'جارٍ المعالجة...' : 'تأكيد الاسترداد'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RefundDialog;
