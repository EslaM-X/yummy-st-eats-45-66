
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import RefundDialog from '@/components/checkout/RefundDialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocationState {
  amount: number;
  cartItems: any[];
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId] = useState(Math.floor(Math.random() * 100000)); // Random order ID for display
  const { toast } = useToast();
  const { t } = useLanguage();
  
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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {paymentComplete ? t('paymentSuccessful') : t('completePayment')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
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
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900">
                    <svg className="w-8 h-8 text-green-500 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-center mb-4">{t('orderDetails')}</h2>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">{t('orderNumber')}:</span>
                      <span className="font-medium">{orderId}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">{t('totalAmount')}:</span>
                      <span className="font-medium">{amount} ST</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">{t('orderStatus')}:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {refundProcessed ? t('refunded') : t('completed')}
                      </span>
                    </div>
                    {refundProcessed && (
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-400">{t('refundStatus')}:</span>
                        <span className="font-medium text-amber-600 dark:text-amber-400">{t('processed')}</span>
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
