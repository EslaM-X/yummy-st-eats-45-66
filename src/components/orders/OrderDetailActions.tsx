
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderDetailActionsProps {
  orderStatus: string;
  onBack: () => void;
  onCancel: () => void;
}

const OrderDetailActions: React.FC<OrderDetailActionsProps> = ({ 
  orderStatus,
  onBack,
  onCancel
}) => {
  const { language } = useLanguage();
  
  const backButtonText = language === 'en' ? 'Back to My Orders' : 'العودة إلى طلباتي';
  const cancelButtonText = language === 'en' ? 'Cancel Order' : 'إلغاء الطلب';
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
      <Button 
        variant="outline" 
        onClick={onBack}
      >
        {backButtonText}
      </Button>
      
      {orderStatus === 'new' && (
        <Button 
          variant="destructive" 
          onClick={onCancel}
        >
          {cancelButtonText}
        </Button>
      )}
    </div>
  );
};

export default OrderDetailActions;
