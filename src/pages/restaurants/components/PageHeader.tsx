
import React from 'react';
import { Coffee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-data';

interface PageHeaderProps {
  isVisible: boolean;
  selectedCountryData: {
    code: string;
    name: string;
    nameAr: string;
    flagEmoji: string;
  } | null;
}

const PageHeader: React.FC<PageHeaderProps> = ({ isVisible, selectedCountryData }) => {
  const { t } = useLanguage();
  
  return (
    <section className={`py-12 px-4 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto text-center">
        <div className="inline-block p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <Coffee className="h-6 w-6 text-yellow-800 dark:text-yellow-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
          {selectedCountryData ? (
            <>
              <span className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl">{selectedCountryData.flagEmoji}</span>
                <span>{t('restaurantsInCountry') || 'مطاعم في'} {selectedCountryData.nameAr || selectedCountryData.name}</span>
              </span>
            </>
          ) : (
            <>
              {t('restaurantsPageTitlePart1')}{' '}
              <span className="text-yellow-800 dark:text-yellow-500">{t('restaurantsPageTitlePart2')}</span>
            </>
          )}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
          {selectedCountryData ? 
            (t('countryRestaurantsSubtitle') || 'اكتشف أفضل المطاعم والوجبات اللذيذة في') + ' ' + selectedCountryData.nameAr : 
            t('restaurantsPageSubtitle')}
        </p>
      </div>
    </section>
  );
};

export default PageHeader;
