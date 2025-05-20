
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Country } from './country-data';

interface CountryDisplayProps {
  country: Country | undefined;
  showName?: boolean;
}

export const CountryDisplay: React.FC<CountryDisplayProps> = ({
  country,
  showName = true
}) => {
  const { language } = useLanguage();
  
  if (!country) return null;
  
  return (
    <div className="flex items-center gap-2.5 w-full">
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full overflow-hidden 
                     bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 
                     relative group transition-all duration-300">
        <span className="text-lg group-hover:scale-110 transition-transform duration-300">
          {country.flagEmoji}
        </span>
      </div>
      {showName && (
        <span className="truncate font-medium text-black dark:text-white">
          {language === 'ar' ? country.nameAr : country.name}
        </span>
      )}
    </div>
  );
};

export default CountryDisplay;
