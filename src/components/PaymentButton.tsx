
import { Button } from './ui/button';
import { CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentButtonProps {
  amount: number;
  productName?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  cartItems?: any[];
}

const PaymentButton = ({ 
  amount, 
  productName, 
  className, 
  variant = "default",
  cartItems = []
}: PaymentButtonProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    // Navigate to checkout page with product details
    navigate('/checkout', { 
      state: { 
        amount: amount,
        cartItems: cartItems.length ? cartItems : [
          {
            id: Math.random().toString(36).substring(7),
            name: productName || t('product'),
            price: amount,
            quantity: 1
          }
        ]
      } 
    });
  };

  return (
    <Button 
      onClick={handlePayment} 
      className={`payment-button ${className || ""}`}
      variant={variant}
      disabled={loading}
    >
      <CreditCard className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
      {loading ? `${t('processing')}...` : `${t('payNow')} ${amount} ST`}
    </Button>
  );
};

export default PaymentButton;
