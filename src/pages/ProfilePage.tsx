
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { VirtualCardService } from '@/services/VirtualCardService';
import { supabase } from "@/integrations/supabase/client";
import VirtualCard from '@/components/wallet/VirtualCard';
import TransactionList, { Transaction } from '@/components/wallet/TransactionList';

// نموذج التحقق لتحديث الملف الشخصي
const profileSchema = z.object({
  full_name: z.string().min(2, "الاسم الكامل يجب أن يكون على الأقل حرفين"),
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل")
    .max(20, "اسم المستخدم يجب ألا يتجاوز 20 حرفاً")
    .regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يجب أن يحتوي على أحرف وأرقام وشرطات سفلية فقط"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const ProfilePage: React.FC = () => {
  const { user, profile, refreshProfile, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [updating, setUpdating] = useState<boolean>(false);
  const [loadingTransactions, setLoadingTransactions] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // التحقق من حالة تسجيل الدخول
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // استرجاع المعاملات
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      setLoadingTransactions(true);
      try {
        const userTransactions = await VirtualCardService.getUserTransactions();
        
        // تحويل البيانات إلى الشكل المطلوب لمكوّن TransactionList
        const formattedTransactions: Transaction[] = userTransactions.map(tx => ({
          id: tx.transaction_id,
          description: tx.type === 'payment' 
            ? language === 'ar' ? 'دفع' : 'Payment' 
            : language === 'ar' ? 'استرداد' : 'Refund',
          amount: tx.amount,
          date: new Date(tx.created_at).toLocaleDateString(),
          status: tx.status
        }));
        
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: language === 'ar' ? 'خطأ في استرجاع المعاملات' : 'Error Fetching Transactions',
          description: language === 'ar' 
            ? 'حدث خطأ أثناء استرجاع معاملاتك. يرجى المحاولة مرة أخرى.' 
            : 'There was an error retrieving your transactions. Please try again.',
          variant: "destructive",
        });
      } finally {
        setLoadingTransactions(false);
      }
    };
    
    fetchTransactions();
  }, [user, language, toast]);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      username: profile?.username || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
    },
  });

  // تحديث قيم النموذج عند تغيير بيانات الملف الشخصي
  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || '',
        username: profile.username || '',
        phone: profile.phone || '',
        address: profile.address || '',
      });
    }
  }, [profile, form]);

  // معالج تحديث الملف الشخصي
  const handleUpdateProfile = async (values: z.infer<typeof profileSchema>) => {
    if (!user) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: values.full_name,
          username: values.username,
          phone: values.phone,
          address: values.address,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // تحديث الملف الشخصي في السياق
      await refreshProfile();
      
      toast({
        title: language === 'ar' ? 'تم التحديث بنجاح' : 'Profile Updated',
        description: language === 'ar' 
          ? 'تم تحديث ملفك الشخصي بنجاح' 
          : 'Your profile has been updated successfully',
      });
    } catch (error: any) {
      toast({
        title: language === 'ar' ? 'فشل التحديث' : 'Update Failed',
        description: error.message || (language === 'ar' 
          ? 'حدث خطأ أثناء تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.' 
          : 'There was an error updating your profile. Please try again.'),
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-64 w-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </h1>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">
                {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
              </TabsTrigger>
              <TabsTrigger value="wallet">
                {language === 'ar' ? 'المحفظة' : 'Wallet'}
              </TabsTrigger>
              <TabsTrigger value="transactions">
                {language === 'ar' ? 'المعاملات' : 'Transactions'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'معلومات الملف الشخصي' : 'Profile Information'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'تحديث معلومات ملفك الشخصي وتفضيلاتك'
                      : 'Update your profile information and preferences'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</FormLabel>
                            <FormControl>
                              <Input placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'ar' ? 'اسم المستخدم' : 'Username'}</FormLabel>
                            <FormControl>
                              <Input placeholder={language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter username'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</FormLabel>
                            <FormControl>
                              <Input placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'ar' ? 'العنوان' : 'Address'}</FormLabel>
                            <FormControl>
                              <Input placeholder={language === 'ar' ? 'أدخل عنوانك' : 'Enter your address'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button type="submit" className="w-full" disabled={updating}>
                          {updating 
                            ? (language === 'ar' ? 'جارٍ التحديث...' : 'Updating...') 
                            : (language === 'ar' ? 'تحديث الملف الشخصي' : 'Update Profile')}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="wallet">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'محفظتي' : 'My Wallet'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'إدارة بطاقتك الافتراضية ST ورصيد محفظتك'
                      : 'Manage your ST virtual card and wallet balance'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <VirtualCard 
                      cardNumber="4111 1111 1111 1111"
                      expiryDate="12/25"
                      cvv="123"
                      balance={profile?.wallet_balance || 0}
                      status="active"
                    />
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">
                      {language === 'ar' ? 'الرصيد الحالي' : 'Current Balance'}
                    </h3>
                    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <span className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'رصيد المحفظة' : 'Wallet Balance'}
                      </span>
                      <span className="text-2xl font-bold">
                        {profile?.wallet_balance || 0} ST
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'سجل المعاملات' : 'Transaction History'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? 'عرض تاريخ معاملاتك السابقة وحالتها'
                      : 'View your past transactions and their status'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingTransactions ? (
                    <div className="py-10 text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      <p className="mt-4 text-gray-500">
                        {language === 'ar' ? 'جارٍ تحميل المعاملات...' : 'Loading transactions...'}
                      </p>
                    </div>
                  ) : (
                    <TransactionList transactions={transactions} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
