
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from 'sonner';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = React.useState([
    { 
      id: 1, 
      name: 'بيتزا مارغريتا', 
      price: 50, 
      quantity: 1, 
      imageUrl: '/lovable-uploads/photo-1618160702438-9b02ab6515c9.png',
      restaurant: 'بيتزا بلس'
    },
    { 
      id: 2, 
      name: 'طبق شاورما دجاج', 
      price: 75, 
      quantity: 2, 
      imageUrl: '/lovable-uploads/photo-1506744038136-46273834b3fb.png',
      restaurant: 'مطعم الأصيل'
    },
    { 
      id: 3, 
      name: 'برجر لحم مشوي', 
      price: 85, 
      quantity: 1, 
      imageUrl: '/lovable-uploads/photo-1469041797191-50ace28483c3.png',
      restaurant: 'برجر فاكتوري'
    },
  ]);

  const updateQuantity = (id: number, action: 'increase' | 'decrease') => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          if (action === 'decrease' && item.quantity === 1) {
            return item;
          }
          return {
            ...item,
            quantity: action === 'increase' ? item.quantity + 1 : item.quantity - 1
          };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success('تم إزالة العنصر من السلة');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    toast.success('تم إرسال طلبك بنجاح!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            سلة التسوق
          </h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 py-4 last:border-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                          <div className="w-24 h-24 rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80&txt=Food+Image";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.restaurant}</p>
                            <p className="font-bold text-yellow-800 dark:text-yellow-500">{item.price} ST</p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 rtl:space-x-reverse">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md mb-4 sm:mb-0">
                            <button
                              onClick={() => updateQuantity(item.id, 'decrease')}
                              className="px-3 py-1 text-gray-600 dark:text-gray-300"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 text-gray-800 dark:text-gray-200">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 'increase')}
                              className="px-3 py-1 text-gray-600 dark:text-gray-300"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            aria-label="إزالة من السلة"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">ملخص الطلب</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">المجموع الفرعي:</span>
                      <span className="text-gray-800 dark:text-white font-medium">{calculateTotal()} ST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">رسوم التوصيل:</span>
                      <span className="text-gray-800 dark:text-white font-medium">15 ST</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-800 dark:text-white">المجموع:</span>
                        <span className="text-lg font-bold text-yellow-800 dark:text-yellow-500">{calculateTotal() + 15} ST</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-yellow-800 hover:bg-yellow-900 text-white py-3 mt-4 font-medium"
                    >
                      إتمام الطلب
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">السلة فارغة</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
              <Button asChild className="bg-yellow-800 hover:bg-yellow-900 text-white">
                <Link to="/products">تصفح المنتجات</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
