import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import RefundDialog from '@/components/checkout/RefundDialog';

const CheckoutPage: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
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
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: language === 'ar' ? "تمت العملية بنجاح" : "Process completed successfully",
        description: language === 'ar' ? "تمت عملية الدفع بنجاح" : "Payment process successfully",
      });
    }, 2000);
  };
  
  const handleRefundSuccess = () => {
    // Handle successful refund
    toast({
      title: "تم الاسترداد بنجاح",
      description: "تم استرداد المبلغ بنجاح وإضافته إلى رصيد محفظتك",
    });
    
    // Reload page or update state as needed
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
            <Button 
              type="button" 
              variant="link"
              onClick={() => setIsRefundDialogOpen(true)}
            >
              Open Refund Dialog
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Refund Dialog */}
      {isRefundDialogOpen && (
        <RefundDialog
          isOpen={isRefundDialogOpen}
          onClose={() => setIsRefundDialogOpen(false)}
          orderDetails={{
            orderId: 1234,
            amount: 150.75,
            cardNumber: "**** **** **** 4321"
          }}
          onSuccess={handleRefundSuccess}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
