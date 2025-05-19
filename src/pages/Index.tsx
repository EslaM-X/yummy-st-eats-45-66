
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RestaurantList from '@/components/RestaurantList';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/restaurants');
    }
  };

  const handleRegisterRestaurant = () => {
    navigate('/register-restaurant');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 text-white py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 flex justify-center">
              <img 
                src="/lovable-uploads/5483091a-e5bd-4397-9e86-24fb0ce87243.png" 
                alt="ST Pizza Logo" 
                className="h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 mb-4 animate-pulse"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-cairo mb-6 leading-tight animate-fade-in">
              {t('deliverySlogan')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-cairo">
              {t('deliveryDescription')}
            </p>
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')} 
                className="px-6 py-4 rounded-lg shadow-md text-gray-800 w-full max-w-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                size="lg" 
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 text-lg w-full md:w-auto">
                {t('search')}
              </Button>
            </form>
          </div>
        </section>
        <RestaurantList />
        <section className="py-16 bg-teal-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6 font-cairo">{t('restaurantOwner')}</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto font-cairo">
                    {t('restaurantOwnerDesc')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={handleRegisterRestaurant}
                      className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white font-semibold px-10 py-3 text-lg dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-500 font-cairo relative group overflow-hidden">
                        <span className="absolute inset-0 w-0 bg-yellow-600 transition-all duration-500 ease-out group-hover:w-full"></span>
                        <span className="relative flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
                          {t('registerRestaurant')}
                        </span>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
