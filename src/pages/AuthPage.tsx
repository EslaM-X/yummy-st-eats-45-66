
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from "@/integrations/supabase/client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import PasswordResetForm from '@/components/auth/PasswordResetForm';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { setupEmailConfirmation } from '@/services/authService';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // التحقق من وجود رسالة تأكيد في عنوان URL
  const emailConfirmed = searchParams.get('email_confirmed');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  // معالجة تأكيد البريد الإلكتروني
  useEffect(() => {
    const checkConfirmation = async () => {
      try {
        await setupEmailConfirmation();
      } catch (error) {
        console.error("Error in email confirmation setup:", error);
      }
    };
    
    checkConfirmation();
  }, []);

  // التحقق من وجود جلسة تسجيل دخول نشطة
  useEffect(() => {
    // التحقق من جلسة تسجيل الدخول الحالية
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        
        // إذا كان المستخدم مسجّل الدخول بالفعل، توجيهه إلى الصفحة الرئيسية
        if (data.session) {
          navigate('/');
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast({
          title: "خطأ في التحقق من الجلسة",
          description: "حدث خطأ أثناء التحقق من حالة تسجيل الدخول الخاصة بك.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    // الاستماع إلى تغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        if (session) {
          toast({
            title: "تم تسجيل الدخول بنجاح",
            description: "مرحبًا بك مجدداً!",
          });
          navigate('/');
        }
      }
    );
    
    checkSession();
    
    // إلغاء الاشتراك عند تفكيك المكون
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  // إظهار إشعار تأكيد البريد الإلكتروني
  useEffect(() => {
    if (emailConfirmed === 'true') {
      toast({
        title: "تم تأكيد البريد الإلكتروني",
        description: "تم التحقق من بريدك الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول.",
      });
    } else if (error) {
      toast({
        title: "خطأ في العملية",
        description: error_description || "حدث خطأ أثناء معالجة طلبك.",
        variant: "destructive",
      });
    }
  }, [emailConfirmed, error, error_description, toast]);

  const handleLoginSuccess = () => {
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بعودتك!",
    });
  };

  const handleRegisterSuccess = () => {
    toast({
      title: "تم إنشاء الحساب بنجاح",
      description: "يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك.",
    });
    setActiveTab("login");
  };

  const handleForgotPassword = () => {
    setShowPasswordReset(true);
  };

  const handleBackToLogin = () => {
    setShowPasswordReset(false);
  };

  const handleResetSuccess = () => {
    toast({
      title: "تم إرسال رابط إعادة التعيين",
      description: "يرجى التحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور.",
    });
    setShowPasswordReset(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-lg">جارٍ التحميل...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              {showPasswordReset
                ? (language === 'ar' ? 'استعادة كلمة المرور' : 'Reset Password')
                : (language === 'ar' ? 'الدخول إلى ST🍕 Eat' : 'Sign in to ST🍕 Eat')
              }
            </CardTitle>
            <CardDescription className="text-center">
              {showPasswordReset
                ? (language === 'ar' 
                    ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور'
                    : 'Enter your email and we will send you a reset link')
                : (language === 'ar' 
                    ? 'سجّل دخولك أو أنشئ حسابًا جديدًا للاستمتاع بخدماتنا'
                    : 'Enter your credentials or create a new account')
                }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailConfirmed === 'true' && (
              <Alert className="mb-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-600 dark:text-green-400">
                  {language === 'ar' ? 'تم تأكيد البريد الإلكتروني' : 'Email Confirmed'}
                </AlertTitle>
                <AlertDescription className="text-green-600 dark:text-green-400">
                  {language === 'ar' 
                    ? 'تم التحقق من بريدك الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول إلى حسابك.' 
                    : 'Your email has been verified successfully. You can now log in to your account.'}
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mb-6 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertTitle className="text-red-600 dark:text-red-400">
                  {language === 'ar' ? 'حدث خطأ' : 'Error'}
                </AlertTitle>
                <AlertDescription className="text-red-600 dark:text-red-400">
                  {error_description || (language === 'ar' ? 'حدث خطأ أثناء العملية.' : 'An error occurred during the process.')}
                </AlertDescription>
              </Alert>
            )}

            {showPasswordReset ? (
              <PasswordResetForm
                onSuccess={handleResetSuccess}
                onCancel={handleBackToLogin}
              />
            ) : (
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
                  <LoginForm 
                    onSuccess={handleLoginSuccess} 
                    onForgotPassword={handleForgotPassword}
                  />
                </TabsContent>
                
                <TabsContent value="register">
                  <RegisterForm onSuccess={handleRegisterSuccess} />
                </TabsContent>
              </Tabs>
            )}
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
