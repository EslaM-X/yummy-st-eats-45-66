
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// نموذج التحقق لتحديث الملف الشخصي
const profileSchema = z.object({
  full_name: z.string().min(2, "الاسم الكامل يجب أن يكون على الأقل حرفين"),
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل")
    .max(20, "اسم المستخدم يجب ألا يتجاوز 20 حرفاً")
    .regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يجب أن يحتوي على أحرف وأرقام وشرطات سفلية فقط"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const ProfileInfoForm: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [updating, setUpdating] = useState<boolean>(false);
  const { toast } = useToast();
  const { language } = useLanguage();

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

  return (
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
  );
};

export default ProfileInfoForm;
