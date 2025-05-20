
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import { countries, Country } from './country-data';
import { CountryDisplay } from './country-display';
import { Input } from "@/components/ui/input";

// Re-export countries for backward compatibility
export { countries };
export type { Country };

interface CountryPickerProps {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  value,
  onValueChange,
  className,
  placeholder,
  disabled = false
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
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
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <SelectTrigger className={`${className} hover:bg-primary/5 transition-all duration-300`}>
        <SelectValue placeholder={placeholder || t('selectCountry')}>
          {value && (
            <CountryDisplay country={countries.find(c => c.code === value)} showName={true} />
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[70vh] bg-white dark:bg-gray-800 shadow-xl border-primary/20 rounded-xl overflow-hidden p-2">
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 mb-2 px-1">
          <div className="relative">
            <Input
              placeholder={t('searchCountries')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-2 py-2 w-full border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white bg-gray-50 dark:bg-gray-900 focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          {filteredCountries.map((country) => (
            <SelectItem
              key={country.code}
              value={country.code}
              className="cursor-pointer hover:bg-primary/10 rounded-md transition-all duration-200 py-2"
            >
              <CountryDisplay country={country} showName={true} />
            </SelectItem>
          ))}
          
          {filteredCountries.length === 0 && (
            <div className="py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
              {t('noCountriesFound') || 'No countries found'}
            </div>
          )}
        </div>
      </SelectContent>
    </Select>
  );
};

export default CountryPicker;
