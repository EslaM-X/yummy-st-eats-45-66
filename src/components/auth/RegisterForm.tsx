
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Register form schema
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

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
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

  // معالجة تسجيل حساب جديد
  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true);
    try {
      console.log("Attempting to register with data:", { 
        email: values.email, 
        fullName: values.fullName,
        username: values.username,
        phone: values.phone,
        userType: values.userType 
      });
      
      // استخدام وظيفة signUp من AuthContext
      const { error, data } = await signUp(values.email, values.password, {
        full_name: values.fullName,
        username: values.username,
        phone: values.phone || '',
        user_type: values.userType
      });
      
      if (error) throw error;
      
      console.log("Registration response:", data);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Registration error:", error);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
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
        
        <FormField
          control={form.control}
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
                  className="text-black dark:text-white"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'} 
                  className="text-black dark:text-white"
                  {...field} 
                />
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
              <FormLabel>
                {language === 'ar' ? 'اسم المستخدم' : 'Username'}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter username'} 
                  className="text-black dark:text-white"
                  {...field} 
                />
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
              <FormLabel>
                {language === 'ar' ? 'رقم الهاتف (اختياري)' : 'Phone (Optional)'}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'} 
                  className="text-black dark:text-white"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'ar' ? 'نوع الحساب' : 'Account Type'}
              </FormLabel>
              <FormControl>
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="text-black dark:text-white">
                    <SelectValue placeholder={language === 'ar' ? 'اختر نوع الحساب' : 'Select account type'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">
                      {language === 'ar' ? 'عميل' : 'Customer'}
                    </SelectItem>
                    <SelectItem value="restaurant_owner">
                      {language === 'ar' ? 'صاحب مطعم' : 'Restaurant Owner'}
                    </SelectItem>
                  </SelectContent>
                </Select>
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
  );
};

export default RegisterForm;
