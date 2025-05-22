
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { CardNumberInput } from './CardNumberInput';
import { CvvInput } from './CvvInput';
import { VirtualCardService } from '@/services/VirtualCardService';

const checkoutFormSchema = z.object({
  cardNumber: z.string().min(13, "يجب أن يتكون رقم البطاقة من 13-19 رقم").max(19),
  cardholderName: z.string().min(3, "يرجى إدخال اسم حامل البطاقة الكامل"),
  expiryMonth: z.string().min(1, "الشهر مطلوب"),
  expiryYear: z.string().min(1, "السنة مطلوبة"),
  cvv: z.string().min(3, "يجب أن يتكون رمز CVV من 3-4 أرقام").max(4),
});

interface CheckoutFormProps {
  orderId: string;
  totalAmount: number;
  onSuccess?: () => void;
}

export function CheckoutForm({ orderId, totalAmount, onSuccess }: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  const validateCardNumber = (cardNumber: string): boolean => {
    // التحقق أساسي من رقم البطاقة - على الأقل 13 رقم وليس أكثر من 19
    const digitsOnly = cardNumber.replace(/\D/g, '');
    return digitsOnly.length >= 13 && digitsOnly.length <= 19;
  };
  
  const validateCVV = (cvv: string): boolean => {
    // CVV عادة ما يكون 3 أو 4 أرقام
    const digitsOnly = cvv.replace(/\D/g, '');
    return /^\d{3,4}$/.test(digitsOnly);
  };

  const onSubmit = async (values: z.infer<typeof checkoutFormSchema>) => {
    try {
      setIsSubmitting(true);
      
      // التحقق من صحة بيانات البطاقة
      if (!validateCardNumber(values.cardNumber)) {
        toast({
          title: "رقم بطاقة غير صالح",
          description: "يرجى التحقق من رقم البطاقة وإعادة المحاولة",
          variant: "destructive",
        });
        return;
      }
      
      if (!validateCVV(values.cvv)) {
        toast({
          title: "رمز CVV غير صالح",
          description: "يرجى التحقق من رمز CVV وإعادة المحاولة",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "جاري معالجة الطلب",
        description: "يرجى الانتظار بينما نعالج معاملتك...",
      });
      
      // إنشاء معاملة دفع جديدة
      const clearedCardNumber = values.cardNumber.replace(/\s+/g, '');
      await VirtualCardService.createPaymentTransaction(orderId, totalAmount, "credit_card");
      
      toast({
        title: "تم الدفع بنجاح!",
        description: `تم خصم ${totalAmount.toFixed(2)} ر.س من بطاقتك بنجاح`,
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        // التوجيه إلى صفحة تأكيد الطلب أو الصفحة الرئيسية
        navigate('/');
      }
    } catch (error: any) {
      console.error("خطأ في معالجة الدفع:", error);
      toast({
        title: "فشل عملية الدفع",
        description: error.message || "حدث خطأ أثناء معالجة المعاملة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم البطاقة</FormLabel>
              <FormControl>
                <CardNumberInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم حامل البطاقة</FormLabel>
              <FormControl>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="الاسم كما يظهر على البطاقة"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="expiryMonth"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>شهر الانتهاء</FormLabel>
                <FormControl>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, '0');
                      return <option key={month} value={month}>{month}</option>;
                    })}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="expiryYear"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>سنة الانتهاء</FormLabel>
                <FormControl>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString().slice(2);
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>رمز الأمان (CVV)</FormLabel>
                <FormControl>
                  <CvvInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full text-lg py-6" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري المعالجة..." : `إتمام الدفع - ${totalAmount.toFixed(2)} ر.س`}
        </Button>
      </form>
    </Form>
  );
}

export default CheckoutForm;
