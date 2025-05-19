
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminSettings } from '@/types/admin';

interface SecuritySettingsProps {
  settings: AdminSettings['security'];
  onSettingChange: (key: keyof AdminSettings['security'], value: any) => void;
  onReset: () => void;
  onSave: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  settings,
  onSettingChange,
  onReset,
  onSave
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="two-factor">المصادقة الثنائية</Label>
          <Switch 
            id="two-factor" 
            checked={settings.twoFactorAuth} 
            onCheckedChange={(value) => onSettingChange('twoFactorAuth', value)} 
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="strong-passwords">كلمات مرور قوية مطلوبة</Label>
          <Switch 
            id="strong-passwords" 
            checked={settings.requireStrongPasswords} 
            onCheckedChange={(value) => onSettingChange('requireStrongPasswords', value)} 
          />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="session-timeout">مدة انتهاء الجلسة (دقائق)</Label>
          <div className="flex items-center gap-4">
            <Input 
              id="session-timeout" 
              type="number" 
              value={settings.sessionTimeout} 
              onChange={(e) => onSettingChange('sessionTimeout', parseInt(e.target.value))} 
              className="max-w-[100px]"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">دقيقة</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            سيتم تسجيل خروج المستخدمين تلقائيًا بعد هذه المدة من عدم النشاط
          </p>
        </div>
      </div>

      <div className="space-y-2 mt-8">
        <h3 className="font-medium text-lg text-red-600 dark:text-red-400">خيارات متقدمة</h3>
        <Button variant="destructive">إعادة تعيين كلمات المرور للمستخدمين</Button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          سيؤدي هذا إلى إعادة تعيين كلمات المرور لجميع المستخدمين وإرسال بريد إلكتروني بكلمة المرور الجديدة
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onReset}>إعادة تعيين</Button>
        <Button onClick={onSave}>حفظ الإعدادات</Button>
      </div>
    </>
  );
};

export default SecuritySettings;
