
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { Globe, Bell, Lock, Shield, CreditCard, Smartphone } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('general');
  
  // General settings
  const [appName, setAppName] = useState('ST Eats');
  const [adminEmail, setAdminEmail] = useState('admin@steats.com');
  const [supportPhone, setSupportPhone] = useState('+966 500000000');
  const [maxDistance, setMaxDistance] = useState(15);
  const [defaultLanguage, setDefaultLanguage] = useState('ar');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Payment settings
  const [acceptCreditCards, setAcceptCreditCards] = useState(true);
  const [acceptCashOnDelivery, setAcceptCashOnDelivery] = useState(true);
  const [acceptWallet, setAcceptWallet] = useState(true);
  const [commissionRate, setCommissionRate] = useState(10);
  const [vatRate, setVatRate] = useState(15);
  
  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [requireStrongPasswords, setRequireStrongPasswords] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  
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
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="app-name">اسم التطبيق</Label>
                  <Input 
                    id="app-name" 
                    value={appName} 
                    onChange={(e) => setAppName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">البريد الإلكتروني للمسؤول</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    value={adminEmail} 
                    onChange={(e) => setAdminEmail(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-phone">رقم هاتف الدعم</Label>
                  <Input 
                    id="support-phone" 
                    value={supportPhone} 
                    onChange={(e) => setSupportPhone(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-distance">الحد الأقصى لمسافة التوصيل (كم)</Label>
                  <Input 
                    id="max-distance" 
                    type="number" 
                    value={maxDistance} 
                    onChange={(e) => setMaxDistance(parseInt(e.target.value))} 
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>اللغة الافتراضية</Label>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button 
                    variant={defaultLanguage === 'ar' ? 'default' : 'outline'} 
                    onClick={() => setDefaultLanguage('ar')}
                  >
                    العربية
                  </Button>
                  <Button 
                    variant={defaultLanguage === 'en' ? 'default' : 'outline'} 
                    onClick={() => setDefaultLanguage('en')}
                  >
                    English
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>إعادة تعيين</Button>
              <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>تحكم في كيفية تلقي الإشعارات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">إشعارات الدفع</Label>
                  <Switch 
                    id="push-notifications" 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications">إشعارات الرسائل النصية</Label>
                  <Switch 
                    id="sms-notifications" 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications} 
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-lg">أنواع الإشعارات</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="order-updates">تحديثات الطلبات</Label>
                  <Switch 
                    id="order-updates" 
                    checked={orderUpdates} 
                    onCheckedChange={setOrderUpdates} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing-emails">رسائل تسويقية</Label>
                  <Switch 
                    id="marketing-emails" 
                    checked={marketingEmails} 
                    onCheckedChange={setMarketingEmails} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>إعادة تعيين</Button>
              <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6 space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المدفوعات</CardTitle>
              <CardDescription>إدارة طرق الدفع والرسوم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">طرق الدفع</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="credit-cards">بطاقات الائتمان</Label>
                  <Switch 
                    id="credit-cards" 
                    checked={acceptCreditCards} 
                    onCheckedChange={setAcceptCreditCards} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cash-on-delivery">الدفع عند الاستلام</Label>
                  <Switch 
                    id="cash-on-delivery" 
                    checked={acceptCashOnDelivery} 
                    onCheckedChange={setAcceptCashOnDelivery} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="wallet">المحفظة الإلكترونية</Label>
                  <Switch 
                    id="wallet" 
                    checked={acceptWallet} 
                    onCheckedChange={setAcceptWallet} 
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-lg">الرسوم والضرائب</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="commission-rate">نسبة العمولة (%)</Label>
                    <Input 
                      id="commission-rate" 
                      type="number" 
                      value={commissionRate} 
                      onChange={(e) => setCommissionRate(parseInt(e.target.value))} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vat-rate">نسبة ضريبة القيمة المضافة (%)</Label>
                    <Input 
                      id="vat-rate" 
                      type="number" 
                      value={vatRate} 
                      onChange={(e) => setVatRate(parseInt(e.target.value))} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>إعادة تعيين</Button>
              <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
              <CardDescription>إدارة إعدادات أمان النظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">المصادقة الثنائية</Label>
                  <Switch 
                    id="two-factor" 
                    checked={twoFactorAuth} 
                    onCheckedChange={setTwoFactorAuth} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="strong-passwords">كلمات مرور قوية مطلوبة</Label>
                  <Switch 
                    id="strong-passwords" 
                    checked={requireStrongPasswords} 
                    onCheckedChange={setRequireStrongPasswords} 
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">مدة انتهاء الجلسة (دقائق)</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      id="session-timeout" 
                      type="number" 
                      value={sessionTimeout} 
                      onChange={(e) => setSessionTimeout(parseInt(e.target.value))} 
                      className="max-w-[100px]"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">دقيقة</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    سيتم تسجيل خروج المستخدمين تلقائيًا بعد هذه المدة من عدم النشاط
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-lg text-red-600 dark:text-red-400">خيارات متقدمة</h3>
                <Button variant="destructive">إعادة تعيين كلمات المرور للمستخدمين</Button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  سيؤدي هذا إلى إعادة تعيين كلمات المرور لجميع المستخدمين وإرسال بريد إلكتروني بكلمة المرور الجديدة
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>إعادة تعيين</Button>
              <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
