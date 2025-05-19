
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { VirtualCardService } from '@/services/VirtualCardService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { CreditCard } from 'lucide-react';

interface LocationState {
  amount: number;
  cartItems: any[];
}

const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: 'رقم البطاقة يجب أن يتكون من 16 رقم على الأقل' })
    .max(19, { message: 'رقم البطاقة يجب ألا يتجاوز 19 رقم' })
    .refine(val => VirtualCardService.isCardNumberValid(val), {
      message: 'رقم البطاقة غير صالح',
    }),
  cardHolder: z.string().min(3, { message: 'يجب إدخال اسم حامل البطاقة' }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: 'تاريخ الانتهاء غير صالح (MM/YY)' }),
  cvv: z.string()
    .min(3, { message: 'رمز CVV يجب أن يتكون من 3 أرقام على الأقل' })
    .max(4, { message: 'رمز CVV يجب ألا يتجاوز 4 أرقام' })
    .refine(val => VirtualCardService.isCvvValid(val), {
      message: 'رمز CVV غير صالح',
    }),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { amount, cartItems } = (location.state as LocationState) || { amount: 0, cartItems: [] };
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  });

  // إذا لم يتم تمرير معلومات من السلة، نعيد التوجيه إلى صفحة السلة
  React.useEffect(() => {
    if (!location.state) {
      navigate('/cart');
    }
  }, [location.state, navigate]);

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(event.target.value);
    form.setValue('cardNumber', formattedValue);
  };

  const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    
    form.setValue('expiryDate', value);
  };

  const handleSubmit = async (values: PaymentFormValues) => {
    setLoading(true);
    
    try {
      // إنشاء معرف طلب عشوائي للعرض
      const orderId = Math.floor(Math.random() * 100000);
      
      // إرسال طلب الدفع
      const paymentData = {
        card_number: values.cardNumber.replace(/\s+/g, ''),
        cvv: values.cvv,
        amount: Number(amount.toFixed(5)),
        order_id: orderId
      };
      
      const response = await VirtualCardService.createPaymentTransaction(paymentData);
      
      toast({
        title: "تمت عملية الدفع بنجاح",
        description: `معرف المعاملة: ${response.transaction_id}`,
      });
      
      // انتظار لحظة قبل الانتقال
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    } catch (error) {
      toast({
        title: "فشل في عملية الدفع",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء معالجة الدفع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">إتمام الدفع</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">أدخل بيانات البطاقة لإتمام الطلب</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    بيانات الدفع
                  </CardTitle>
                  <CardDescription>
                    أدخل بيانات البطاقة الافتراضية ST لإتمام عملية الدفع
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رقم البطاقة</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="1234 5678 9012 3456" 
                                {...field}
                                onChange={handleCardNumberChange}
                                maxLength={19}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardHolder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>اسم حامل البطاقة</FormLabel>
                            <FormControl>
                              <Input placeholder="الاسم كما هو مدون على البطاقة" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>تاريخ الانتهاء</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="MM/YY" 
                                  {...field}
                                  onChange={handleExpiryDateChange}
                                  maxLength={5}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>رمز CVV</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="123" 
                                  {...field}
                                  maxLength={4}
                                  type="password"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                        disabled={loading}
                      >
                        {loading ? 'جارِ المعالجة...' : `إتمام الدفع - ${amount} ST`}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems && cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.quantity} × {item.price} ST
                        </p>
                      </div>
                      <span className="font-medium">{item.price * item.quantity} ST</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">رسوم التوصيل:</span>
                    <span>15 ST</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>المجموع:</span>
                    <span>{amount} ST</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">معلومات الدفع الآمن</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    جميع المعاملات تتم بشكل آمن ومشفر. لا يتم تخزين بيانات بطاقتك على خوادمنا.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
