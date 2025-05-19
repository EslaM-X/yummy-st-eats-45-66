
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

interface LocationState {
  amount: number;
  cartItems: any[];
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId] = useState(Math.floor(Math.random() * 100000)); // إنشاء معرف طلب عشوائي للعرض
  const { amount, cartItems } = (location.state as LocationState) || { amount: 0, cartItems: [] };

  // إذا لم يتم تمرير معلومات من السلة، نعيد التوجيه إلى صفحة السلة
  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
    }
  }, [location.state, navigate]);

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
              <CheckoutForm
                amount={amount}
                orderId={orderId}
                cartItems={cartItems}
              />
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                amount={amount}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
