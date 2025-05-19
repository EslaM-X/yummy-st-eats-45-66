
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminSettings } from '@/types/admin';

interface NotificationSettingsProps {
  settings: AdminSettings['notifications'];
  onSettingChange: (key: keyof AdminSettings['notifications'], value: boolean) => void;
  onReset: () => void;
  onSave: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onSettingChange,
  onReset,
  onSave
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
          <Switch 
            id="email-notifications" 
            checked={settings.emailNotifications} 
            onCheckedChange={(value) => onSettingChange('emailNotifications', value)} 
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">إشعارات الدفع</Label>
          <Switch 
            id="push-notifications" 
            checked={settings.pushNotifications} 
            onCheckedChange={(value) => onSettingChange('pushNotifications', value)} 
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sms-notifications">إشعارات الرسائل النصية</Label>
          <Switch 
            id="sms-notifications" 
            checked={settings.smsNotifications} 
            onCheckedChange={(value) => onSettingChange('smsNotifications', value)} 
          />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <h3 className="font-medium text-lg">أنواع الإشعارات</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="order-updates">تحديثات الطلبات</Label>
          <Switch 
            id="order-updates" 
            checked={settings.orderUpdates} 
            onCheckedChange={(value) => onSettingChange('orderUpdates', value)} 
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="marketing-emails">رسائل تسويقية</Label>
          <Switch 
            id="marketing-emails" 
            checked={settings.marketingEmails} 
            onCheckedChange={(value) => onSettingChange('marketingEmails', value)} 
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onReset}>إعادة تعيين</Button>
        <Button onClick={onSave}>حفظ الإعدادات</Button>
      </div>
    </>
  );
};

export default NotificationSettings;
