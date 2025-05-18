
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

const ProductsPage: React.FC = () => {
  // Placeholder product data with better images
  const products = [
    { 
      id: 'p1', 
      name: 'بيتزا مارغريتا', 
      price: '50 STC', 
      restaurant: 'بيتزا بلس', 
      imageUrl: '/lovable-uploads/photo-1618160702438-9b02ab6515c9.png',
      description: 'بيتزا إيطالية أصلية مع صلصة الطماطم والجبن الموزاريلا'
    },
    { 
      id: 'p2', 
      name: 'طبق شاورما دجاج', 
      price: '75 STC', 
      restaurant: 'مطعم الأصيل', 
      imageUrl: '/lovable-uploads/photo-1506744038136-46273834b3fb.png',
      description: 'شاورما دجاج طازجة مع صلصة الثوم والخضروات'
    },
    { 
      id: 'p3', 
      name: 'سوشي سلمون رول', 
      price: '120 STC', 
      restaurant: 'سوشي تايم', 
      imageUrl: '/lovable-uploads/photo-1472396961693-142e6e269027.png',
      description: 'سوشي رول محشو بسمك السلمون الطازج والأفوكادو'
    },
    { 
      id: 'p4', 
      name: 'برجر لحم مشوي', 
      price: '85 STC', 
      restaurant: 'برجر فاكتوري', 
      imageUrl: '/lovable-uploads/photo-1469041797191-50ace28483c3.png',
      description: 'برجر لحم مشوي مع جبن شيدر وصلصة خاصة'
    },
  ];

  const handleAddToCart = (productName: string) => {
    toast.success(`تمت إضافة ${productName} إلى سلة التسوق`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            أشهى الأطباق والمنتجات
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12">اكتشف مجموعة متنوعة من الأطباق الشهية من أفضل المطاعم</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img 
                  src={product.imageUrl || "https://via.placeholder.com/300x200.png?text=Product+Image"} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{product.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">من: {product.restaurant}</p>
                  <p className="text-lg font-bold text-teal-500 mb-4">{product.price}</p>
                  <Button 
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold flex items-center justify-center gap-2"
                    onClick={() => handleAddToCart(product.name)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    أضف للسلة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
