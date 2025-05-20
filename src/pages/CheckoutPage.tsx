
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import RefundDialog from '@/components/checkout/RefundDialog';
import { VirtualCardService } from '@/services/VirtualCardService';
import { supabase } from '@/integrations/supabase/client';

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const orderData = location.state || { amount: 0, cartItems: [] };

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState(orderData.amount || 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<any>(null);
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces after every 4 digits
    const value = e.target.value.replace(/\s/g, '').substring(0, 16);
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formattedValue);
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCvv(value);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    } else {
      setAmount(0);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cvv || amount <= 0) {
      toast({
        title: language === 'ar' ? "خطأ في البيانات" : "Data Error",
        description: language === 'ar' ? "الرجاء التأكد من إدخال جميع البيانات بشكل صحيح" : "Please make sure to enter all data correctly",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Check if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        throw new Error(language === 'ar' ? 'يجب تسجيل الدخول لإتمام عملية الدفع' : 'You must be logged in to complete the payment');
      }
      
      // Create unique order ID
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Process payment via VirtualCardService
      const response = await VirtualCardService.createPaymentTransaction({
        card_number: cardNumber,
        cvv: cvv,
        amount: Number(amount.toFixed(5)),
        order_id: orderId
      });
      
      // Set current transaction for potential refund
      setCurrentTransaction({
        transaction_id: response.transaction_id,
        order_id: orderId,
        amount: amount,
        card_number: cardNumber
      });
      
      toast({
        title: language === 'ar' ? "تمت العملية بنجاح" : "Process completed successfully",
        description: language === 'ar' ? "تمت عملية الدفع بنجاح" : "Payment process successfully",
      });
      
      // Store the order information
      localStorage.setItem('lastCompletedOrder', JSON.stringify({
        orderId,
        amount,
        date: new Date().toISOString(),
        items: orderData.cartItems || [],
        transactionId: response.transaction_id
      }));
      
      // Wait a bit before redirecting
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: language === 'ar' ? "فشل في العملية" : "Process Failed",
        description: error instanceof Error ? error.message : (language === 'ar' ? "حدث خطأ أثناء معالجة الدفع" : "An error occurred during payment processing"),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleRefundSuccess = () => {
    // Handle successful refund
    toast({
      title: "تم الاسترداد بنجاح",
      description: "تم استرداد المبلغ بنجاح وسيتم معالجة طلبك من قبل الإدارة",
    });
    
    // Clear transaction data
    setCurrentTransaction(null);
  };
  
  const openRefundDialog = () => {
    if (currentTransaction) {
      setIsRefundDialogOpen(true);
    } else {
      // Get last order from localStorage
      const lastOrder = JSON.parse(localStorage.getItem('lastCompletedOrder') || '{}');
      
      if (lastOrder.orderId && lastOrder.amount) {
        setCurrentTransaction({
          transaction_id: lastOrder.transactionId,
          order_id: lastOrder.orderId,
          amount: lastOrder.amount
        });
        setIsRefundDialogOpen(true);
      } else {
        toast({
          title: "لا توجد معاملات",
          description: "لا توجد معاملات سابقة يمكن استردادها",
          variant: "destructive",
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {language === 'ar' ? 'إتمام عملية الدفع' : 'Checkout'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                  {language === 'ar' ? 'رقم البطاقة' : 'Card Number'}
                </Label>
                <Input
                  type="text"
                  id="cardNumber"
                  placeholder="**** **** **** ****"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
                  maxLength={19}
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                  CVV
                </Label>
                <Input
                  type="text"
                  id="cvv"
                  placeholder="***"
                  value={cvv}
                  onChange={handleCvvChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
                  maxLength={3}
                />
              </div>
              <div>
                <Label htmlFor="amount" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                  {language === 'ar' ? 'المبلغ' : 'Amount'}
                </Label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={handleAmountChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
                  step="0.01"
                  min="0.01"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isProcessing}
              >
                {isProcessing
                  ? (language === 'ar' ? 'جاري المعالجة...' : 'Processing...')
                  : (language === 'ar' ? 'ادفع الآن' : 'Pay Now')}
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button 
                type="button" 
                variant="outline"
                onClick={openRefundDialog}
                className="w-full"
              >
                {language === 'ar' ? 'طلب استرداد' : 'Request Refund'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Refund Dialog */}
      {isRefundDialogOpen && currentTransaction && (
        <RefundDialog
          isOpen={isRefundDialogOpen}
          onClose={() => setIsRefundDialogOpen(false)}
          orderDetails={{
            orderId: currentTransaction.order_id,
            amount: currentTransaction.amount,
            cardNumber: currentTransaction.card_number ? `**** **** **** ${currentTransaction.card_number.slice(-4)}` : undefined
          }}
          onSuccess={handleRefundSuccess}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
