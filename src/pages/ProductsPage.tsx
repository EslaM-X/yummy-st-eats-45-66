
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button"; // shadcn button

const ProductsPage: React.FC = () => {
  // Placeholder product data
  const products = [
    { id: 'p1', name: 'بيتزا مارغريتا', price: '50 STC', restaurant: 'بيتزا بلس', imageUrl: '/lovable-uploads/photo-1618160702438-9b02ab6515c9.png' },
    { id: 'p2', name: 'طبق شاورما دجاج', price: '75 STC', restaurant: 'مطعم الأصيل', imageUrl: '/lovable-uploads/photo-1506744038136-46273834b3fb.png' },
    { id: 'p3', name: 'سوشي سلمون رول', price: '120 STC', restaurant: 'سوشي تايم', imageUrl: '/lovable-uploads/photo-1488590528505-98d2b5aba04b.png' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            أشهى الأطباق والمنتجات
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <img src={product.imageUrl || "https://via.placeholder.com/300x200.png?text=Product+Image"} alt={product.name} className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">من: {product.restaurant}</p>
                  <p className="text-lg font-bold text-teal-500 mb-4">{product.price}</p>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold">
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
