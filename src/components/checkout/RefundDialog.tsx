
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { VirtualCardService } from '@/services/VirtualCardService';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const RefundDialog: React.FC<RefundDialogProps> = ({
  open,
  onOpenChange,
  orderId,
  amount,
  onSuccess
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Refund validation schema with translations
  const refundSchema = z.object({
    order_id: z.number().min(1, t('orderIdRequired')),
    amount: z.coerce.number()
      .min(1, t('amountGreaterThanZero'))
      .multipleOf(0.00001, t('precisionRequired'))
      .max(amount, t('amountCannotExceedTotal'))
  });

  type RefundFormValues = z.infer<typeof refundSchema>;

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
        title: t('invalidData'),
        description: t('checkOrderIdAmount'),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Format data for API
      const refundData = {
        order_id: values.order_id,
        amount: Number(values.amount.toFixed(5))
      };
      
      // Send refund request
      const response = await VirtualCardService.createRefundTransaction(refundData);
      
      // Use template literals for string interpolation
      toast({
        title: t('refundSuccess'),
        description: `${t('amount')}: ${values.amount} ST, ${t('refundId')}: REF-${response.refund_txn_id}`,
      });
      
      form.reset();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: t('refundFailed'),
        description: error instanceof Error ? error.message : t('refundProcessError'),
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
          <DialogTitle>{t('requestRefund')}</DialogTitle>
          <DialogDescription>
            {t('refundDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRefund)} className="space-y-4">
            <FormField
              control={form.control}
              name="order_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('orderNumber')}</FormLabel>
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
                  <FormLabel>{t('amountST')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.00001" 
                      min="1"
                      max={amount}
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(isNaN(value) ? 0 : Math.min(value, amount));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                {t('cancel')}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? t('processing') : t('confirmRefund')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

interface RefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: number;
  amount: number;
  onSuccess?: () => void;
}

export default RefundDialog;
