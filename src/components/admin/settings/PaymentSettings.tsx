
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminSettings } from '@/types/admin';

interface PaymentSettingsProps {
  settings: AdminSettings['payment'];
  onSettingChange: (key: keyof AdminSettings['payment'], value: any) => void;
  onReset: () => void;
  onSave: () => void;
}

const PaymentSettings: React.FC<PaymentSettingsProps> = ({
  settings,
  onSettingChange,
  onReset,
  onSave
}) => {
  return (
    <>
      <div className="space-y-4">
        <h3 className="font-medium text-lg">طرق الدفع</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="credit-cards">بطاقات الائتمان</Label>
          <Switch 
            id="credit-cards" 
            checked={settings.acceptCreditCards} 
            onCheckedChange={(value) => onSettingChange('acceptCreditCards', value)} 
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="cash-on-delivery">الدفع عند الاستلام</Label>
          <Switch 
            id="cash-on-delivery" 
            checked={settings.acceptCashOnDelivery} 
            onCheckedChange={(value) => onSettingChange('acceptCashOnDelivery', value)} 
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="wallet">المحفظة الإلكترونية</Label>
          <Switch 
            id="wallet" 
            checked={settings.acceptWallet} 
            onCheckedChange={(value) => onSettingChange('acceptWallet', value)} 
          />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <h3 className="font-medium text-lg">الرسوم والضرائب</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="commission-rate">نسبة العمولة (%)</Label>
            <Input 
              id="commission-rate" 
              type="number" 
              value={settings.commissionRate} 
              onChange={(e) => onSettingChange('commissionRate', parseInt(e.target.value))} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vat-rate">نسبة ضريبة القيمة المضافة (%)</Label>
            <Input 
              id="vat-rate" 
              type="number" 
              value={settings.vatRate} 
              onChange={(e) => onSettingChange('vatRate', parseInt(e.target.value))} 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onReset}>إعادة تعيين</Button>
        <Button onClick={onSave}>حفظ الإعدادات</Button>
      </div>
    </>
  );
};

export default PaymentSettings;
