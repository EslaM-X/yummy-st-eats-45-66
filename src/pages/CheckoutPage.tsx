
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { v4 as uuidv4 } from 'uuid';
import { VirtualCardService } from '@/services/VirtualCardService';

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState<"summary" | "payment">("summary");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // تحميل بيانات الطلب إذا كنا قادمين من صفحة أخرى
  useEffect(() => {
    // تحقق مما إذا كان لدينا معلومات طلب في state
    if (location.state && location.state.orderId) {
      setOrderId(location.state.orderId);
      setStep("payment");
    }
  }, [location.state]);
  
  // إعادة توجيه المستخدم إذا كانت السلة فارغة ولم نكن في خطوة الدفع
  useEffect(() => {
    if (cart.length === 0 && step === "summary" && !orderId) {
      toast({
        title: "السلة فارغة",
        description: "لا يمكنك الاستمرار إلى صفحة الدفع بسلة فارغة.",
        variant: "destructive",
      });
      navigate('/cart');
    }
  }, [cart, step, orderId, toast, navigate]);

  const createOrder = async () => {
    try {
      setIsSubmitting(true);
      
      if (!user) {
        toast({
          title: "يجب تسجيل الدخول",
          description: "يرجى تسجيل الدخول للمتابعة.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }
      
      const newOrderId = uuidv4();
      setOrderId(newOrderId);
      
      // في الحالة الحقيقية، سيتم إنشاء الطلب في قاعدة البيانات هنا
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة طلب الشبكة
      
      // التغيير إلى خطوة الدفع
      setStep("payment");
      toast({
        title: "تم إنشاء الطلب",
        description: "يرجى إكمال عملية الدفع.",
      });
    } catch (error: any) {
      console.error("خطأ في إنشاء الطلب:", error);
      toast({
        title: "فشل في إنشاء الطلب",
        description: error.message || "حدث خطأ أثناء محاولة إنشاء الطلب. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      // تحديث حالة الطلب إلى "مدفوع" في قاعدة البيانات
      await VirtualCardService.createPaymentTransaction(orderId, totalPrice, "credit_card");
      
      // مسح السلة
      clearCart();
      
      // عرض رسالة نجاح
      setPaymentSuccess(true);
      
      toast({
        title: "تم الدفع بنجاح!",
        description: "شكراً لطلبك! سيتم إرسال تأكيد عبر البريد الإلكتروني.",
      });
      
      // إعادة التوجيه بعد فترة قصيرة
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error: any) {
      console.error("خطأ في تحديث حالة الطلب:", error);
      toast({
        title: "تم الدفع لكن حدث خطأ في تحديث الطلب",
        description: "تم معالجة الدفع بنجاح، لكن حدث خطأ في تحديث حالة الطلب. سيتم التواصل معك قريباً.",
        variant: "warning",
      });
    }
  };

  // عرض صفحة النجاح
  if (paymentSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-10 px-4">
          <Card className="w-full max-w-3xl animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold text-center">تم الطلب بنجاح!</CardTitle>
              <CardDescription className="text-center">
                شكراً لطلبك! سيتم إرسال تأكيد عبر البريد الإلكتروني.
                <br />
                رقم الطلب الخاص بك: <span className="font-mono font-semibold">{orderId}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-muted-foreground">سيتم إعادة توجيهك تلقائياً...</p>
              </div>
              <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <Button variant="outline" onClick={() => navigate('/')}>
                  العودة إلى الرئيسية
                </Button>
                <Button onClick={() => navigate('/profile')}>
                  عرض طلباتي
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">إتمام الطلب</h1>
            <div className="flex items-center">
              <div className={`h-2 w-10 rounded ${step === "summary" ? "bg-primary" : "bg-primary"}`}></div>
              <div className="h-0.5 w-5 bg-gray-300"></div>
              <div className={`h-2 w-10 rounded ${step === "payment" ? "bg-primary" : "bg-gray-300"}`}></div>
            </div>
            <div className="flex">
              <span className={`text-sm ${step === "summary" ? "text-primary font-medium" : "text-primary"}`}>
                ملخص الطلب
              </span>
              <span className="text-sm mx-3">-</span>
              <span className={`text-sm ${step === "payment" ? "text-primary font-medium" : "text-gray-500"}`}>
                الدفع
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {step === "summary" && (
                <Card>
                  <CardHeader>
                    <CardTitle>ملخص الطلب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <OrderSummary items={cart} />
                    
                    <div className="mt-6">
                      <Button 
                        onClick={createOrder} 
                        className="w-full" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "جاري المعالجة..." : "المتابعة إلى الدفع"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {step === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات الدفع</CardTitle>
                    <CardDescription>
                      جميع المعاملات آمنة ومشفرة.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CheckoutForm 
                      orderId={orderId} 
                      totalAmount={totalPrice} 
                      onSuccess={handlePaymentSuccess}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>ملخص السلة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.variant}`} className="flex justify-between">
                        <span>{item.quantity} × {item.name}</span>
                        <span>{(item.price * item.quantity).toFixed(2)} ر.س</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-medium">
                      <span>المجموع الفرعي</span>
                      <span>{totalPrice.toFixed(2)} ر.س</span>
                    </div>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>الإجمالي</span>
                      <span>{totalPrice.toFixed(2)} ر.س</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      شامل الضريبة
                    </div>
                  </div>
                  
                  {step === "summary" && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => navigate('/cart')}
                    >
                      العودة إلى السلة
                    </Button>
                  )}
                  
                  {step === "payment" && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setStep("summary")}
                    >
                      العودة إلى الملخص
                    </Button>
                  )}
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
