
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { MailIcon } from 'lucide-react';

// تعريف نموذج إعادة تعيين كلمة المرور
const resetSchema = z.object({
  email: z.string().email("يجب إدخال بريد إلكتروني صالح")
});

interface PasswordResetFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const { resetPassword } = useAuth();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: ""
    }
  });

  // معالجة طلب إعادة تعيين كلمة المرور
  const handleResetRequest = async (values: z.infer<typeof resetSchema>) => {
    setLoading(true);
    try {
      console.log("Attempting to reset password for:", values.email);
      
      const { error } = await resetPassword(values.email);
      
      if (error) throw error;
      
      toast({
        title: "تم إرسال رابط إعادة التعيين",
        description: "يرجى التحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "فشل في إرسال رابط إعادة التعيين",
        description: error.message || "حدث خطأ أثناء محاولة إرسال رابط إعادة التعيين. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
          <MailIcon className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {language === 'ar' ? 'استعادة كلمة المرور' : 'Reset Password'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {language === 'ar' 
            ? 'أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور'
            : 'Enter your email and we\'ll send you a reset link'}
        </p>
      </div>
      
      <form onSubmit={form.handleSubmit(handleResetRequest)} className="space-y-4">
        <FormField
          control={form.control}
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
                  className="text-black dark:text-white"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col gap-2 mt-6">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading 
              ? (language === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') 
              : (language === 'ar' ? 'إرسال رابط التعيين' : 'Send Reset Link')}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={onCancel}
            disabled={loading}
          >
            {language === 'ar' ? 'العودة إلى تسجيل الدخول' : 'Back to Login'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordResetForm;
