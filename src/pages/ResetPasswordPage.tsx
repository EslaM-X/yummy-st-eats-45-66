
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EyeIcon, EyeOffIcon, KeyIcon } from 'lucide-react';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // التحقق من صلاحية الرمز عند تحميل الصفحة
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      toast({
        title: "رمز غير صالح",
        description: "الرابط المستخدم غير صالح أو منتهي الصلاحية.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // نظراً لأن Supabase يتعامل مع الرمز تلقائياً، نفترض أنه صالح
    setIsTokenValid(true);
  }, [searchParams, toast, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "كلمات المرور غير متطابقة",
        description: "يرجى التأكد من تطابق كلمات المرور.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "كلمة مرور قصيرة جدًا",
        description: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // تحديث كلمة المرور باستخدام Supabase
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) throw error;
      
      toast({
        title: "تم تحديث كلمة المرور",
        description: "تم تحديث كلمة المرور الخاصة بك بنجاح.",
      });
      
      // توجيه المستخدم إلى صفحة تسجيل الدخول
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      console.error('Error resetting password:', error);
      
      toast({
        title: "فشل في تحديث كلمة المرور",
        description: error.message || "حدث خطأ أثناء محاولة تحديث كلمة المرور.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenValid) {
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
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-2">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
              <KeyIcon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center font-bold">
              {language === 'ar' ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
            </CardTitle>
            <CardDescription className="text-center">
              {language === 'ar' 
                ? 'أدخل كلمة المرور الجديدة الخاصة بك لإعادة تعيين حسابك'
                : 'Enter your new password to reset your account'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">
                  {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full px-3 py-2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full px-3 py-2"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading 
                  ? (language === 'ar' ? 'جارِ التحديث...' : 'Updating...') 
                  : (language === 'ar' ? 'تحديث كلمة المرور' : 'Update Password')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
