
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ShieldCheck, LockKeyhole } from 'lucide-react';
import { VirtualCardService } from '@/services/VirtualCardService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatCardNumber } from '@/services/card/cardValidation';

// Improved schema with more descriptive validation messages
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
  const { t, language } = useLanguage();
  const { clearCart } = useCart();
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cvv: '',
    },
  });

  // Improved card number formatting
  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(event.target.value);
    form.setValue('cardNumber', formattedValue);
  };

  // Handle form submission with better error handling
  const handleSubmit = async (values: PaymentFormValues) => {
    setLoading(true);
    
    try {
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
            
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-primary">{t('cardNumber')}</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        placeholder="1234 5678 9012 3456" 
                        {...field}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className="pl-10 bg-white dark:bg-gray-950 border-2 h-12 transition-all duration-200 focus-visible:ring-primary/30"
                        inputMode="numeric"
                        autoComplete="cc-number"
                      />
                    </FormControl>
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-primary">{t('cvvCode')}</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        placeholder="123" 
                        {...field}
                        maxLength={4}
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        className="pl-10 bg-white dark:bg-gray-950 border-2 h-12 transition-all duration-200 focus-visible:ring-primary/30"
                      />
                    </FormControl>
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-medium relative overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('processing')}
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">{`${t('completePayment')} - ${amount} ST`}</span>
                    <span className="absolute inset-0 bg-white/20 transform translate-y-full transition-transform hover:translate-y-0 duration-300 ease-in-out"></span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
