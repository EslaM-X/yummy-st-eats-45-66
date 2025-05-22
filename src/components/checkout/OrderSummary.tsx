
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, ShoppingBag, CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CartItem } from '@/contexts/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  amount?: number;
  orderId?: number;
  onRefundClick?: () => void;
  paymentComplete?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  items = [], 
  amount = 0, 
  orderId,
  onRefundClick,
  paymentComplete = false 
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <Card className="shadow-lg border-2 border-primary/10 overflow-hidden bg-gradient-to-br from-white to-primary/5 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            {t('orderSummary')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-[240px] overflow-auto pr-2 space-y-2">
            {items && items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-2 group">
                  <div className="flex-1">
                    <p className="font-medium group-hover:text-primary transition-colors">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.quantity} × {item.price} ST
                    </p>
                  </div>
                  <span className="font-medium text-primary">{item.price * item.quantity} ST</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4 italic">
                {t('noProductsInCart')}
              </div>
            )}
          </div>
          
          <div className="flex justify-between bg-primary/5 p-2 rounded">
            <span className="text-gray-600 dark:text-gray-300">{t('deliveryFee')}:</span>
            <span>15 ST</span>
          </div>
          
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>{t('total')}:</span>
            <span className="text-primary">{amount} ST</span>
          </div>
          
          {paymentComplete && orderId && onRefundClick && (
            <Button 
              onClick={onRefundClick} 
              variant="outline" 
              className="w-full mt-4 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 transition-all duration-300 group"
              type="button"
            >
              <RefreshCcw className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 group-hover:rotate-180 transition-transform duration-500" /> 
              {t('requestRefund')}
            </Button>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-md border border-primary/10 overflow-hidden">
        <CardHeader className="py-3 bg-primary/5">
          <CardTitle className="text-sm flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            {t('securePaymentInfo')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('securePaymentDescription')}
          </p>
          {paymentComplete && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2 border-t border-dashed border-green-200 dark:border-green-800 pt-2">
              {t('refundTimeframe')}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
