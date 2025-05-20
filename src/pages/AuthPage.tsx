
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from "@/integrations/supabase/client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const loginSchema = z.object({
  email: z.string().email("يجب إدخال بريد إلكتروني صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
});

const registerSchema = z.object({
  email: z.string().email("يجب إدخال بريد إلكتروني صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  fullName: z.string().min(2, "يجب إدخال الاسم الكامل"),
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل")
    .max(20, "اسم المستخدم يجب ألا يتجاوز 20 حرفاً")
    .regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يجب أن يحتوي على أحرف وأرقام وشرطات سفلية فقط"),
  phone: z.string().optional(),
  userType: z.enum(["customer", "restaurant_owner"])
});

// دالة تنظيف حالة المصادقة
const cleanupAuthState = () => {
  // إزالة توكنات المصادقة القياسية
  localStorage.removeItem('supabase.auth.token');
  
  // إزالة جميع مفاتيح Supabase من localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // إزالة من sessionStorage إذا كان قيد الاستخدام
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [session, setSession] = useState<any>(null);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      username: "",
      phone: "",
      userType: "customer"
    }
  });

  // التحقق من وجود جلسة تسجيل دخول نشطة
  useEffect(() => {
    // التحقق من جلسة تسجيل الدخول الحالية
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      // إذا كان المستخدم مسجّل الدخول بالفعل، توجيهه إلى الصفحة الرئيسية
      if (data.session) {
        navigate('/');
      }
    };
    
    // الاستماع إلى تغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session) {
          navigate('/');
        }
      }
    );
    
    checkSession();
    
    // إلغاء الاشتراك عند تفكيك المكون
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // معالجة تسجيل الدخول
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      // تنظيف حالة المصادقة أولاً
      cleanupAuthState();
      
      // محاولة تسجيل الخروج الشامل
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // استمر حتى لو فشلت هذه العملية
      }
      
      // تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في تطبيق ST🍕 Eat",
      });
      
      // تحديث جلسة المستخدم
      setSession(data.session);
      
      // إعادة تحميل الصفحة كاملة
      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: "فشل تسجيل الدخول",
        description: error.message || "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // معالجة تسجيل حساب جديد
  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true);
    try {
      // تنظيف حالة المصادقة أولاً
      cleanupAuthState();
      
      // محاولة تسجيل الخروج الشامل
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // استمر حتى لو فشلت هذه العملية
      }
      
      // تسجيل حساب جديد
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            username: values.username,
            phone: values.phone,
            user_type: values.userType
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "تم إنشاء حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.",
      });
      
      // التحقق مما إذا كان التأكيد عبر البريد الإلكتروني مطلوبًا
      if (data.user && !data.session) {
        setActiveTab("login");
      } else if (data.session) {
        setSession(data.session);
        window.location.href = '/';
      }
    } catch (error: any) {
      toast({
        title: "فشل إنشاء الحساب",
        description: error.message || "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              {language === 'ar' ? 'الدخول إلى ST🍕 Eat' : 'Sign in to ST🍕 Eat'}
            </CardTitle>
            <CardDescription className="text-center">
              {language === 'ar' 
                ? 'سجّل دخولك أو أنشئ حسابًا جديدًا للاستمتاع بخدماتنا'
                : 'Enter your credentials or create a new account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">
                  {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </TabsTrigger>
                <TabsTrigger value="register">
                  {language === 'ar' ? 'حساب جديد' : 'Register'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} 
                              type="email" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'كلمة المرور' : 'Password'}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'} 
                              type="password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading 
                        ? (language === 'ar' ? 'جارٍ تسجيل الدخول...' : 'Signing in...') 
                        : (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} 
                              type="email" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'كلمة المرور' : 'Password'}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'} 
                              type="password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'اسم المستخدم' : 'Username'}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter username'} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'رقم الهاتف (اختياري)' : 'Phone (Optional)'}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="userType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'نوع الحساب' : 'Account Type'}
                          </FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="customer">
                                {language === 'ar' ? 'عميل' : 'Customer'}
                              </option>
                              <option value="restaurant_owner">
                                {language === 'ar' ? 'صاحب مطعم' : 'Restaurant Owner'}
                              </option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading 
                        ? (language === 'ar' ? 'جارٍ إنشاء الحساب...' : 'Creating account...') 
                        : (language === 'ar' ? 'إنشاء حساب' : 'Register')}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'ar' 
                ? 'بالتسجيل، أنت توافق على شروط الاستخدام وسياسة الخصوصية'
                : 'By signing up, you agree to our Terms and Privacy Policy'}
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
