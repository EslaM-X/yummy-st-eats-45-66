
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSelectedCountry } from '@/components/header/HeaderActionButtons';
import { countries } from '@/components/ui/country-data';

// Import refactored components
import PageHeader from './restaurants/components/PageHeader';
import FeaturedRestaurants from './restaurants/components/FeaturedRestaurants';
import RestaurantStats from './restaurants/components/RestaurantStats';
import AllRestaurants from './restaurants/components/AllRestaurants';
import { useFeaturedRestaurants } from './restaurants/hooks/useFeaturedRestaurants';

const RestaurantsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { selectedCountry: globalSelectedCountry } = useSelectedCountry();

  // Get featured restaurants based on selected country
  const { featuredRestaurants } = useFeaturedRestaurants(globalSelectedCountry);

  useEffect(() => {
    // Delay appearance of elements for animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Get country name for display
  const selectedCountryData = globalSelectedCountry ? 
    countries.find(c => c.code === globalSelectedCountry) || null : null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-grow">
        {/* Page Header */}
        <PageHeader 
          isVisible={isVisible} 
          selectedCountryData={selectedCountryData} 
        />

        {/* Featured Restaurants Section */}
        <FeaturedRestaurants 
          restaurants={featuredRestaurants} 
          isVisible={isVisible} 
        />

        {/* Restaurant Statistics Section */}
        <RestaurantStats />

        {/* All Restaurants Section */}
        <AllRestaurants 
          isVisible={isVisible} 
          globalSelectedCountry={globalSelectedCountry} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantsPage;
