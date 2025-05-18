
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RestaurantList from '@/components/RestaurantList';

const RestaurantsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            استكشف جميع المطاعم
          </h1>
          <RestaurantList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantsPage;
