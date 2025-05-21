
import React from 'react';
import { Coffee, Star, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const RestaurantStats: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="mb-16 py-10 bg-yellow-50 dark:bg-gray-800/50 transition-all duration-1000 transform">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
              <Coffee className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('statsVal1')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('statsSectionTitle1')}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
              <Star className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('statsVal2')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('statsSectionTitle2')}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
              <MapPin className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('statsVal3')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('statsSectionTitle3')}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
              <Coffee className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('statsVal4')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('statsSectionTitle4')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantStats;
