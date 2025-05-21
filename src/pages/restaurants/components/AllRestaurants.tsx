
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-data';
import { CountryDisplay } from '@/components/ui/country-display';
import RestaurantList from '@/components/RestaurantList';

interface AllRestaurantsProps {
  isVisible: boolean;
  globalSelectedCountry: string | undefined;
}

const AllRestaurants: React.FC<AllRestaurantsProps> = ({ isVisible, globalSelectedCountry }) => {
  const { t } = useLanguage();
  
  return (
    <section className={`mb-16 transition-all duration-1000 transform delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {globalSelectedCountry ? (
              <span className="flex items-center justify-center gap-2">
                <CountryDisplay 
                  country={countries.find(c => c.code === globalSelectedCountry)} 
                  showName={true} 
                />
              </span>
            ) : (
              <>
                {t('allRestaurantsSectionTitlePart1')}{' '}
                <span className="text-yellow-800 dark:text-yellow-500">{t('allRestaurantsSectionTitlePart2')}</span>
              </>
            )}
          </h2>
          <div className="w-24 h-1 bg-yellow-800 dark:bg-yellow-500 mx-auto"></div>
        </div>
        <RestaurantList />
      </div>
    </section>
  );
};

export default AllRestaurants;
