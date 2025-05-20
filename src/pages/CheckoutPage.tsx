import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import RefundDialog from '@/components/checkout/RefundDialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingBag, CheckCircle, CreditCard } from 'lucide-react';

interface LocationState {
  amount: number;
  cartItems: any[];
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId] = useState(Math.floor(Math.random() * 100000)); // Random order ID for display
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Safely extract data from location.state with fallback values
  const { amount = 0, cartItems = [] } = (location.state as LocationState) || {};
  
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [refundProcessed, setRefundProcessed] = useState(false);

  // Redirect to cart if no information was passed
  useEffect(() => {
    if (!location.state || amount <= 0) {
      navigate('/cart');
    }
  }, [location.state, navigate, amount]);

  // Payment success handler
  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    // Store the order information in localStorage for persistence
    localStorage.setItem('lastCompletedOrder', JSON.stringify({
      orderId,
      amount,
      date: new Date().toISOString(),
      items: cartItems
    }));
  };

  // Refund request handler
  const handleRefundRequest = () => {
    setRefundDialogOpen(true);
  };

  // Refund success handler
  const handleRefundSuccess = () => {
    setRefundProcessed(true);
    
    toast({
      title: t('refundCompleted'),
      description: t('redirectingToHome'),
    });
    
    // Remove the completed order from storage since it's been refunded
    localStorage.removeItem('lastCompletedOrder');
    
    // Wait a moment before redirecting
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Header />
      <main className="flex-grow py-10 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        {/* تعديل البادينج ليكون 0 على الشاشات الصغيرة، والباقي كما هو */}
        <div className="container mx-auto px-0 sm:px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3">
              {paymentComplete ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <CreditCard className="h-8 w-8 text-primary" />
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {paymentComplete ? t('paymentSuccessful') : t('completePayment')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {paymentComplete 
                ? t('orderCompletedMessage') 
                : t('enterCardDetails')
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!paymentComplete ? (
                <CheckoutForm
                  amount={amount}
                  orderId={orderId}
                  cartItems={cartItems}
                  onSuccess={handlePaymentSuccess}
                />
              ) : (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-primary/10 transition-all hover:shadow-xl relative overflow-hidden bg-gradient-to-br from-white to-primary/5 dark:from-gray-900 dark:to-gray-800">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="w-10 h-10 text-green-500 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
                    {t('orderDetails')}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">{t('orderNumber')}:</span>
                      <span className="font-medium text-primary">{orderId}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">{t('totalAmount')}:</span>
                      <span className="font-medium text-primary">{amount} ST</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      {/* تعديل التسمية لتظهر وفقا للغة: Meal Cards أو بطاقات الطعام */}
                      <span className="text-gray-600 dark:text-gray-400">
                        {language === "en" ? "Meal Cards" : "بطاقات الطعام"}:
                      </span>
                      <span className="font-medium text-primary">{amount} ST</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">{t('orderStatus')}:</span>
                      <span className="font-medium px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {refundProcessed ? t('refunded') : t('completed')}
                      </span>
                    </div>
                    {refundProcessed && (
                      <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">{t('refundStatus')}:</span>
                        <span className="font-medium px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">{t('processed')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                amount={amount}
                orderId={orderId}
                onRefundClick={handleRefundRequest}
                paymentComplete={paymentComplete && !refundProcessed}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <RefundDialog 
        open={refundDialogOpen}
        onOpenChange={setRefundDialogOpen}
        orderId={orderId}
        amount={amount}
        onSuccess={handleRefundSuccess}
      />
    </div>
  );
};

export default CheckoutPage;
