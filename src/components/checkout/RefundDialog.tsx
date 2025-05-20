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
import { RefreshCcw, CreditCard, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  const [success, setSuccess] = useState<boolean>(false);
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
      // Check if user is authenticated
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      
      if (!session) {
        throw new Error('Authentication required for refund');
      }
      
      // Format data for API
      const refundData = {
        order_id: values.order_id,
        amount: Number(values.amount.toFixed(5))
      };
      
      // Send refund request
      const response = await VirtualCardService.createRefundTransaction(refundData);
      
      setSuccess(true);
      
      // Use template literals for string interpolation
      toast({
        title: t('refundSuccess'),
        description: t('refundSuccessDetail', {
          amount: values.amount,
          id: `REF-${response.refund_txn_id}`
        }),
      });
      
      // Wait a moment before closing dialog and triggering success
      setTimeout(() => {
        form.reset();
        onOpenChange(false);
        if (onSuccess) onSuccess();
      }, 2000);
      
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
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!loading) onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden bg-gradient-to-br from-white to-primary/5 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
        
        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-xl mb-2">{t('refundSuccess')}</DialogTitle>
            <DialogDescription>
              {t('refundCompleted')}
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <RefreshCcw className="h-5 w-5 text-red-500" />
                {t('requestRefund')}
              </DialogTitle>
              <DialogDescription className="text-base pt-1">
                {t('refundDescription')}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRefund)} className="space-y-4 mt-2">
                <FormField
                  control={form.control}
                  name="order_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">{t('orderNumber')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          disabled
                          className="bg-muted/40"
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
                      <FormLabel className="font-medium">{t('amountST')}</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.00001" 
                            min="1"
                            max={amount}
                            className="pl-9 focus-visible:ring-primary/30"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              field.onChange(isNaN(value) ? 0 : Math.min(value, amount));
                            }}
                          />
                        </FormControl>
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-md mt-4 border border-amber-200 dark:border-amber-800/50">
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    {t('refundTimeframe')}
                  </p>
                </div>
                
                <DialogFooter className="mt-6 gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => onOpenChange(false)} 
                    disabled={loading}
                    className="border-gray-300"
                  >
                    {t('cancel')}
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('processing')}
                      </div>
                    ) : (
                      <span>{t('confirmRefund')}</span>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RefundDialog;
