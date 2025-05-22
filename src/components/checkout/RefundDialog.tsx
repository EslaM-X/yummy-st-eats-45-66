
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { VirtualCardService } from '@/services/VirtualCardService';

interface RefundDialogProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
  orderAmount: number;
}

export function RefundDialog({
  open,
  onClose,
  orderId,
  orderAmount
}: RefundDialogProps) {
  const [amount, setAmount] = useState<number>(orderAmount || 0);
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setAmount(0);
    } else {
      setAmount(value > orderAmount ? orderAmount : value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0) {
      toast({
        title: "مبلغ غير صالح",
        description: "يرجى إدخال مبلغ أكبر من 0",
        variant: "destructive",
      });
      return;
    }
    
    if (!reason.trim()) {
      toast({
        title: "سبب مطلوب",
        description: "يرجى إدخال سبب الاسترداد",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      await VirtualCardService.requestRefund(orderId, amount, reason);
      
      toast({
        title: "تم تقديم طلب الاسترداد",
        description: "سيتم مراجعة طلبك والرد عليه قريبًا",
      });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "فشل في طلب الاسترداد",
        description: error.message || "حدث خطأ أثناء محاولة تقديم طلب الاسترداد",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>طلب استرداد</DialogTitle>
            <DialogDescription>
              يرجى تقديم المعلومات المطلوبة لطلب استرداد الأموال.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="refund-amount" className="text-right col-span-1">
                المبلغ
              </Label>
              <Input
                id="refund-amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                max={orderAmount}
                min={0}
                step={0.01}
                className="col-span-3"
              />
              <Label htmlFor="refund-reason" className="text-right col-span-1">
                السبب
              </Label>
              <Textarea
                id="refund-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="يرجى توضيح سبب طلب الاسترداد"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري المعالجة..." : "تقديم الطلب"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
