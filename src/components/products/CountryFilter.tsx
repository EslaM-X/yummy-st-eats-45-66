
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CountryFilterProps {
  selectedCountry: string | undefined;
  onCountryChange: (country: string | undefined) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = ({ 
  selectedCountry,
  onCountryChange
}) => {
  const { t, language } = useLanguage();

  const handleCountryChange = (value: string) => {
    if (value === 'all') {
      onCountryChange(undefined);
    } else {
      onCountryChange(value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('countryFilterLabel') || 'تصفية حسب الدولة'}
      </label>
      <Select
        value={selectedCountry || 'all'}
        onValueChange={handleCountryChange}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-9 sm:h-10">
          <SelectValue>
            {selectedCountry ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-base sm:text-lg">
                  {countries.find(c => c.code === selectedCountry)?.flagEmoji}
                </span>
                <span className="text-xs sm:text-sm truncate max-w-[80px] sm:max-w-full">
                  {language === 'ar'
                    ? countries.find(c => c.code === selectedCountry)?.nameAr
                    : countries.find(c => c.code === selectedCountry)?.name
                  }
                </span>
              </div>
            ) : (
              <span className="text-xs sm:text-sm">
                {t('allCountriesOption') || 'كل الدول'}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[40vh]">
          <SelectItem value="all" className="font-medium text-xs sm:text-sm">
            {t('allCountriesOption') || 'كل الدول'}
          </SelectItem>
          
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-base sm:text-lg">{country.flagEmoji}</span>
                <span className="truncate">{language === 'ar' ? country.nameAr : country.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountryFilter;
