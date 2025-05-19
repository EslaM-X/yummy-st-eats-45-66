
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Globe, Bell, Lock, Shield, CreditCard } from 'lucide-react';
import { AdminSettings as AdminSettingsType } from '@/types/admin';

// Import Settings Components
import GeneralSettings from './settings/GeneralSettings';
import NotificationSettings from './settings/NotificationSettings';
import PaymentSettings from './settings/PaymentSettings';
import SecuritySettings from './settings/SecuritySettings';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('general');
  
  // Settings state
  const [settings, setSettings] = useState<AdminSettingsType>({
    general: {
      appName: 'ST Eats',
      adminEmail: 'admin@steats.com',
      supportPhone: '+966 500000000',
      maxDistance: 15,
      defaultLanguage: 'ar',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      orderUpdates: true,
      marketingEmails: false,
    },
    payment: {
      acceptCreditCards: true,
      acceptCashOnDelivery: true,
      acceptWallet: true,
      commissionRate: 10,
      vatRate: 15,
    },
    security: {
      twoFactorAuth: false,
      requireStrongPasswords: true,
      sessionTimeout: 30,
    }
  });
  
  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعدادات النظام بنجاح",
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "إعادة تعيين الإعدادات",
      description: "تم إعادة تعيين إعدادات النظام إلى القيم الافتراضية",
    });
  };

  const handleGeneralSettingChange = (key: keyof AdminSettingsType['general'], value: any) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [key]: value
      }
    }));
  };

  const handleNotificationSettingChange = (key: keyof AdminSettingsType['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePaymentSettingChange = (key: keyof AdminSettingsType['payment'], value: any) => {
    setSettings(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        [key]: value
      }
    }));
  };

  const handleSecuritySettingChange = (key: keyof AdminSettingsType['security'], value: any) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">إعدادات النظام</h2>
          <TabsList>
            <TabsTrigger value="general" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              عام
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              الإشعارات
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              المدفوعات
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              الأمان
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="mt-6 space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>إعدادات عامة للنظام</CardDescription>
            </CardHeader>
            <CardContent>
              <GeneralSettings 
                settings={settings.general}
                onSettingChange={handleGeneralSettingChange}
                onReset={handleResetSettings}
                onSave={handleSaveSettings}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>تحكم في كيفية تلقي الإشعارات</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings 
                settings={settings.notifications}
                onSettingChange={handleNotificationSettingChange}
                onReset={handleResetSettings}
                onSave={handleSaveSettings}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6 space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المدفوعات</CardTitle>
              <CardDescription>إدارة طرق الدفع والرسوم</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentSettings 
                settings={settings.payment}
                onSettingChange={handlePaymentSettingChange}
                onReset={handleResetSettings}
                onSave={handleSaveSettings}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
              <CardDescription>إدارة إعدادات أمان النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettings 
                settings={settings.security}
                onSettingChange={handleSecuritySettingChange}
                onReset={handleResetSettings}
                onSave={handleSaveSettings}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
