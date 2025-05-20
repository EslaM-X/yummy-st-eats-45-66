
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountryDisplay } from '@/components/ui/country-display';
import { Search, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CountryFilterProps {
  selectedCountry: string | undefined;
  onCountryChange: (country: string | undefined) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = ({ 
  selectedCountry,
  onCountryChange
}) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCountryChange = (value: string) => {
    if (value === 'all') {
      onCountryChange(undefined);
    } else {
      onCountryChange(value);
    }
  };

  const filteredCountries = searchQuery.trim() === ''
    ? countries
    : countries.filter(country => {
        const query = searchQuery.toLowerCase();
        return (
          country.name.toLowerCase().includes(query) ||
          country.nameAr.toLowerCase().includes(query) ||
          country.code.toLowerCase().includes(query)
        );
      });

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
        <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-10 hover:bg-primary/5 transition-all duration-300">
          <SelectValue>
            {selectedCountry ? (
              <CountryDisplay 
                country={countries.find(c => c.code === selectedCountry)}
                showName={true} 
              />
            ) : (
              <span className="text-sm flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  <Globe className="h-4 w-4" />
                </div>
                {t('allCountriesOption') || 'كل الدول'}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[50vh] bg-white dark:bg-gray-800 shadow-xl rounded-xl p-2">
          <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 mb-2 px-1">
            <div className="relative">
              <Input
                placeholder={t('searchCountries')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-2 py-1.5 w-full border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white bg-gray-50 dark:bg-gray-900 focus:ring-1 focus:ring-primary text-sm"
                style={{ color: 'black' }}
              />
              <Search className="absolute top-2 left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          
          <SelectItem value="all" className="font-medium text-sm cursor-pointer hover:bg-primary/10 rounded-md mb-1 py-2">
            <span className="text-sm flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <Globe className="h-4 w-4" />
              </div>
              {t('allCountriesOption') || 'كل الدول'}
            </span>
          </SelectItem>
          
          {filteredCountries.map((country) => (
            <SelectItem 
              key={country.code} 
              value={country.code} 
              className="cursor-pointer hover:bg-primary/10 rounded-md py-2"
            >
              <CountryDisplay country={country} showName={true} />
            </SelectItem>
          ))}
          
          {filteredCountries.length === 0 && (
            <div className="py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
              {t('noCountriesFound') || 'لا توجد دول مطابقة'}
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountryFilter;
