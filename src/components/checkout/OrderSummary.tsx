
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CartItem } from '@/contexts/CartContext';

interface OrderSummaryProps {
  cartItems: CartItem[];
  amount: number;
  orderId?: number;
  onRefundClick?: () => void;
  paymentComplete?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  cartItems = [], 
  amount = 0, 
  orderId,
  onRefundClick,
  paymentComplete = false 
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('orderSummary')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.quantity} × {item.price} ST
                  </p>
                </div>
                <span className="font-medium">{item.price * item.quantity} ST</span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-2">
              {t('noProductsInCart')}
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">{t('deliveryFee')}:</span>
            <span>15 ST</span>
          </div>
          
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>{t('total')}:</span>
            <span>{amount} ST</span>
          </div>
          
          {paymentComplete && orderId && onRefundClick && (
            <Button 
              onClick={onRefundClick} 
              variant="outline" 
              className="w-full mt-4 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
              type="button"
            >
              <RefreshCcw className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" /> {t('requestRefund')}
            </Button>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">{t('securePaymentInfo')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('securePaymentDescription')}
          </p>
          {paymentComplete && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              {t('refundTimeframe')}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
