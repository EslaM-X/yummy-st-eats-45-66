
import React from 'react';
import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
      <Button 
        variant="outline" 
        onClick={onBack}
      >
        العودة إلى طلباتي
      </Button>
      
      {orderStatus === 'new' && (
        <Button 
          variant="destructive" 
          onClick={onCancel}
        >
          إلغاء الطلب
        </Button>
      )}
    </div>
  );
};

export default OrderDetailActions;
