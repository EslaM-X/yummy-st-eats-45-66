
import { Button } from './ui/button';
import { CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface PaymentButtonProps {
  amount: number;
  productName?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

const PaymentButton = ({ amount, productName, className, variant = "default" }: PaymentButtonProps) => {
  const { t } = useLanguage();

  const handlePayment = () => {
    // Demo functionality - In a real app, this would integrate with a payment gateway
    toast.success(`${t('paymentSuccess')}: ${amount} ST`);
    
    // Simulate a payment flow for demo purposes
    // In production, this would redirect to a payment processor
    // window.open('payment-gateway-url', '_blank');
  };

  return (
    <Button 
      onClick={handlePayment} 
      className={`payment-button ${className || ""}`}
      variant={variant}
    >
      <CreditCard className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
      {t('payNow')} {amount} ST
    </Button>
  );
};

export default PaymentButton;
