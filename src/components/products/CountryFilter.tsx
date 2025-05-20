
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
        <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
          <SelectValue>
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {countries.find(c => c.code === selectedCountry)?.flagEmoji}
                </span>
                <span>
                  {language === 'ar'
                    ? countries.find(c => c.code === selectedCountry)?.nameAr
                    : countries.find(c => c.code === selectedCountry)?.name
                  }
                </span>
              </div>
            ) : t('allCountriesOption') || 'كل الدول'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="font-medium">
            {t('allCountriesOption') || 'كل الدول'}
          </SelectItem>
          
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{country.flagEmoji}</span>
                <span>{language === 'ar' ? country.nameAr : country.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountryFilter;
