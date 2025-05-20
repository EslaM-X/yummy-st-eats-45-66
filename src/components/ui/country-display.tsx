
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
    <div className="flex items-center gap-1 sm:gap-2">
      <span className="text-base sm:text-lg">{country.flagEmoji}</span>
      {showName && (
        <span className="truncate">
          {language === 'ar' ? country.nameAr : country.name}
        </span>
      )}
    </div>
  );
};

export default CountryDisplay;
