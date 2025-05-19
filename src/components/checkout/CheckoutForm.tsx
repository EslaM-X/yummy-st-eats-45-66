
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from 'lucide-react';
import { VirtualCardService } from '@/services/VirtualCardService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: 'Card number must be at least 16 digits' })
    .max(19, { message: 'Card number must not exceed 19 digits' })
    .refine(val => VirtualCardService.isCardNumberValid(val), {
      message: 'Invalid card number',
    }),
  cvv: z.string()
    .min(3, { message: 'CVV must be at least 3 digits' })
    .max(4, { message: 'CVV must not exceed 4 digits' })
    .refine(val => VirtualCardService.isCvvValid(val), {
      message: 'Invalid CVV',
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
  const { clearCart } = useCart(); // Add clearCart from useCart hook
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cvv: '',
    },
  });

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(event.target.value);
    form.setValue('cardNumber', formattedValue);
  };

  const handleSubmit = async (values: PaymentFormValues) => {
    setLoading(true);
    
    try {
      // Send payment request
      const paymentData = {
        card_number: values.cardNumber.replace(/\s+/g, ''),
        cvv: values.cvv,
        amount: Number(amount.toFixed(5)),
        order_id: orderId
      };
      
      const response = await VirtualCardService.createPaymentTransaction(paymentData);
      
      toast({
        title: t('paymentSuccessful'),
        description: `${t('transactionId')}: ${response.transaction_id}`,
      });
      
      // Clear the cart after successful payment
      clearCart();
      
      // Call success function if it exists
      if (onSuccess) {
        onSuccess();
      } else {
        // Wait a moment before redirecting
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      }
    } catch (error) {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          {t('paymentDetails')}
        </CardTitle>
        <CardDescription>
          {t('enterVirtualCardDetails')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('cardNumber')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="1234 5678 9012 3456" 
                      {...field}
                      onChange={handleCardNumberChange}
                      maxLength={19}
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
                  <FormLabel>{t('cvvCode')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123" 
                      {...field}
                      maxLength={4}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
              disabled={loading}
            >
              {loading ? t('processing') : `${t('completePayment')} - ${amount} ST`}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
