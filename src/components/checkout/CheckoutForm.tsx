
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ShieldCheck, LockKeyhole } from 'lucide-react';
import { VirtualCardService } from '@/services/VirtualCardService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CardNumberInput from './CardNumberInput';
import CvvInput from './CvvInput';
import SubmitPaymentButton from './SubmitPaymentButton';
import { supabase } from '@/integrations/supabase/client';

// Payment form validation schema
const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: 'Card number must be at least 16 digits' })
    .max(19, { message: 'Card number must not exceed 19 digits' })
    .refine(val => VirtualCardService.isCardNumberValid(val), {
      message: 'Invalid card number format or checksum',
    }),
  cvv: z.string()
    .min(3, { message: 'CVV must be at least 3 digits' })
    .max(4, { message: 'CVV must not exceed 4 digits' })
    .refine(val => VirtualCardService.isCvvValid(val), {
      message: 'Invalid CVV format',
    }),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface CheckoutFormProps {
  amount: number;
  orderId: number;
  cartItems: any[];
  onSuccess?: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  amount, 
  orderId, 
  cartItems,
  onSuccess 
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { clearCart } = useCart();
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cvv: '',
    },
  });

  // Handle form submission
  const handleSubmit = async (values: PaymentFormValues) => {
    setLoading(true);
    
    try {
      // Check if user is authenticated
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      
      // Prepare payment data
      const paymentData = {
        card_number: values.cardNumber.replace(/\s+/g, ''),
        cvv: values.cvv,
        amount: Number(amount.toFixed(5)),
        order_id: orderId
      };
      
      // Process payment
      const response = await VirtualCardService.createPaymentTransaction(paymentData);
      
      // Show success message
      toast({
        title: t('paymentSuccessful'),
        description: `${t('transactionId')}: ${response.transaction_id}`,
      });
      
      // Clear the cart
      clearCart();
      
      // Store the order information in localStorage for persistence
      localStorage.setItem('lastCompletedOrder', JSON.stringify({
        orderId,
        amount,
        date: new Date().toISOString(),
        items: cartItems,
        transactionId: response.transaction_id
      }));
      
      // Handle success flow
      if (onSuccess) {
        onSuccess();
      } else {
        // Redirect after successful payment with slight delay for UX
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      }
    } catch (error) {
      // Improved error handling with more descriptive messages
      toast({
        title: t('paymentFailed'),
        description: error instanceof Error ? error.message : t('paymentProcessError'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-2 border-primary/10 overflow-hidden bg-gradient-to-br from-white to-primary/5 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-500"></div>
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
            <div className="p-1.5 rounded-full bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            {t('paymentDetails')}
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <div className="p-1 rounded-full bg-amber-500/10">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
            </div>
            <div className="p-1 rounded-full bg-emerald-500/10">
              <LockKeyhole className="h-4 w-4 text-emerald-500" />
            </div>
          </div>
        </div>
        <CardDescription className="text-muted-foreground">
          {t('enterVirtualCardDetails')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="bg-primary/5 rounded-lg p-4 mb-4">
              <div className="text-sm font-medium text-primary mb-2">{t('securePaymentInfo')}</div>
              <div className="text-xs text-muted-foreground">{t('securePaymentDescription')}</div>
            </div>
            
            <CardNumberInput form={form} />
            <CvvInput form={form} />
            
            <div className="pt-4">
              <SubmitPaymentButton loading={loading} amount={amount} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
