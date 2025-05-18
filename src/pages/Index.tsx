
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RestaurantList from '@/components/RestaurantList';
import { Button } from "@/components/ui/button"; // shadcn button

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 text-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              أشهى الأطعمة تصلك أينما كنت!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
              اكتشف مطاعم متنوعة، اطلب طعامك المفضل، وادفع بسهولة بعملة ST الرقمية.
            </p>
            <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse"> {/* Added rtl support for spacing */}
              <input 
                type="text" 
                placeholder="ابحث عن مطعم أو طبق..." 
                className="px-6 py-4 rounded-lg shadow-md text-gray-800 w-full max-w-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
              />
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 text-lg">
                ابحث
              </Button>
            </div>
          </div>
        </section>
        <RestaurantList />
        <section className="py-16 bg-teal-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-teal-600 mb-6">هل أنت صاحب مطعم؟</h2>
                <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
                    انضم إلى منصتنا ووسع قاعدة عملائك. نقبل المطاعم الكبيرة والمشاريع المنزلية الصغيرة.
                </p>
                <Button variant="outline" size="lg" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold px-10 py-3 text-lg">
                    سجل مطعمك الآن
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
