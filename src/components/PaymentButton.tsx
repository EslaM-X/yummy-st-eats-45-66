
import { Button } from './ui/button';
import { CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { VirtualCardService, PaymentRequest } from '@/services/VirtualCardService';

interface PaymentButtonProps {
  amount: number;
  productName?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  cardNumber?: string;
  cvv?: string;
}

const PaymentButton = ({ 
  amount, 
  productName, 
  className, 
  variant = "default",
  cardNumber,
  cvv
}: PaymentButtonProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    // إذا لم يتم توفير معلومات بطاقة، استخدم الشكل القديم
    if (!cardNumber || !cvv) {
      toast({
        title: `${t('paymentSuccess')}: ${amount} ST`,
        variant: "default",
      });
      return;
    }
    
    // إذا تم توفير معلومات البطاقة، استخدم API
    setLoading(true);
    
    try {
      // إنشاء طلب دفع
      const paymentData: PaymentRequest = {
        card_number: cardNumber.replace(/\s+/g, ''),
        cvv: cvv,
        amount: Number(amount.toFixed(5)),
        order_id: Math.floor(Math.random() * 10000) // إنشاء معرف طلب عشوائي للعرض
      };
      
      // إرسال الطلب
      const response = await VirtualCardService.createPaymentTransaction(paymentData);
      
      toast({
        title: `${t('paymentSuccess')}: ${amount} ST`,
        description: `معرف المعاملة: ${response.transaction_id}`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: `${t('paymentFailed')}`,
        description: error instanceof Error ? error.message : "حدث خطأ أثناء معالجة المعاملة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
