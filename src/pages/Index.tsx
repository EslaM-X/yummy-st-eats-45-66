
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RestaurantList from '@/components/RestaurantList';
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/restaurants');
    }
  };

  const handleRegisterRestaurant = () => {
    // Placeholder for restaurant registration functionality
    window.alert('سيتم إطلاق تسجيل المطاعم قريبًا!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 text-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              أشهى الأطعمة تصلك أينما كنت!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
              اكتشف مطاعم متنوعة، اطلب طعامك المفضل، وادفع بسهولة بعملة ST الرقمية.
            </p>
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
              <input 
                type="text" 
                placeholder="ابحث عن مطعم أو طبق..." 
                className="px-6 py-4 rounded-lg shadow-md text-gray-800 w-full max-w-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                size="lg" 
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 text-lg w-full md:w-auto">
                ابحث
              </Button>
            </form>
          </div>
        </section>
        <RestaurantList />
        <section className="py-16 bg-teal-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">هل أنت صاحب مطعم؟</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                    انضم إلى منصتنا ووسع قاعدة عملائك. نقبل المطاعم الكبيرة والمشاريع المنزلية الصغيرة.
                </p>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleRegisterRestaurant}
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white font-semibold px-10 py-3 text-lg dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-500">
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
