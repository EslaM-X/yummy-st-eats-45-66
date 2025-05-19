
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminSettings } from '@/types/admin';

interface GeneralSettingsProps {
  settings: AdminSettings['general'];
  onSettingChange: (key: keyof AdminSettings['general'], value: any) => void;
  onReset: () => void;
  onSave: () => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  settings,
  onSettingChange,
  onReset,
  onSave
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="app-name">اسم التطبيق</Label>
          <Input 
            id="app-name" 
            value={settings.appName} 
            onChange={(e) => onSettingChange('appName', e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-email">البريد الإلكتروني للمسؤول</Label>
          <Input 
            id="admin-email" 
            type="email" 
            value={settings.adminEmail} 
            onChange={(e) => onSettingChange('adminEmail', e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="support-phone">رقم هاتف الدعم</Label>
          <Input 
            id="support-phone" 
            value={settings.supportPhone} 
            onChange={(e) => onSettingChange('supportPhone', e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max-distance">الحد الأقصى لمسافة التوصيل (كم)</Label>
          <Input 
            id="max-distance" 
            type="number" 
            value={settings.maxDistance} 
            onChange={(e) => onSettingChange('maxDistance', parseInt(e.target.value))} 
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>اللغة الافتراضية</Label>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button 
            variant={settings.defaultLanguage === 'ar' ? 'default' : 'outline'} 
            onClick={() => onSettingChange('defaultLanguage', 'ar')}
          >
            العربية
          </Button>
          <Button 
            variant={settings.defaultLanguage === 'en' ? 'default' : 'outline'} 
            onClick={() => onSettingChange('defaultLanguage', 'en')}
          >
            English
          </Button>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onReset}>إعادة تعيين</Button>
        <Button onClick={onSave}>حفظ الإعدادات</Button>
      </div>
    </>
  );
};

export default GeneralSettings;
