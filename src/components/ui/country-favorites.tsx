
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Country } from './country-data';
import { SelectItem } from '@/components/ui/select';

interface CountryFavoritesProps {
  favoriteCountries: Country[];
}

export const CountryFavorites: React.FC<CountryFavoritesProps> = ({ 
  favoriteCountries 
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="mb-3 animate-fade-in">
      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
        {t('popularCountries') || 'الدول الشائعة'}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {favoriteCountries.map((country) => (
          <SelectItem 
            key={`favorite-${country.code}`} 
            value={country.code}
            className="cursor-pointer hover:bg-primary/10 rounded-md transition-all duration-200 py-2 
                    flex flex-col items-center justify-center h-16 text-center px-1
                    text-black dark:text-white data-[state=checked]:bg-primary/15"
          >
            <div className="flex flex-col items-center gap-1 w-full">
              <span className="text-xl">{country.flagEmoji}</span>
              <span className="text-xs truncate w-full">
                {language === 'ar' ? country.nameAr : country.name}
              </span>
            </div>
          </SelectItem>
        ))}
      </div>
      <div className="h-px bg-gray-100 dark:bg-gray-700 my-3"></div>
    </div>
  );
};
