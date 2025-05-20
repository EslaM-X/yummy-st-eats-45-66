
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { VirtualCardService } from '@/services/VirtualCardService';
import { useTranslation } from 'react-i18next';

interface RefundDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderId: string | number;
    amount: number;
    cardNumber?: string;
  };
  onSuccess?: () => void;
}

const RefundDialog: React.FC<RefundDialogProps> = ({
  isOpen,
  onClose,
  orderDetails,
  onSuccess
}) => {
  const [refundAmount, setRefundAmount] = useState<number>(orderDetails.amount);
  const [reason, setReason] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0 && value <= orderDetails.amount) {
      setRefundAmount(value);
    }
  };
  
  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };
  
  const handleSubmit = async () => {
    if (refundAmount <= 0 || refundAmount > orderDetails.amount) {
      toast({
        title: t("refund.invalidAmount"),
        description: t("refund.amountError"),
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      const response = await VirtualCardService.processRefund({
        orderId: orderDetails.orderId,
        amount: refundAmount,
        reason: reason,
      });
      
      toast({
        title: t("refund.success"),
        description: t("refund.processed"),
        variant: "default",
      });
      
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error("Refund processing error:", error);
      toast({
        title: t("refund.failed"),
        description: t("refund.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("refund.title")}</DialogTitle>
          <DialogDescription>
            {t("refund.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="order-id" className="text-right">
              {t("refund.orderId")}
            </Label>
            <Input
              id="order-id"
              value={orderDetails.orderId}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="total-amount" className="text-right">
              {t("refund.totalAmount")}
            </Label>
            <Input
              id="total-amount"
              value={orderDetails.amount}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="refund-amount" className="text-right">
              {t("refund.refundAmount")}
            </Label>
            <Input
              id="refund-amount"
              type="number"
              value={refundAmount}
              onChange={handleAmountChange}
              className="col-span-3"
              placeholder="أدخل مبلغ الاسترداد"
              min={0}
              max={orderDetails.amount}
              step={0.01}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reason" className="text-right">
              {t("refund.reason")}
            </Label>
            <Input
              id="reason"
              value={reason}
              onChange={handleReasonChange}
              className="col-span-3"
              placeholder={t("refund.reasonPlaceholder")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
            {t("refund.cancel")}
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isProcessing}>
            {isProcessing ? t("refund.processing") : t("refund.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RefundDialog;
