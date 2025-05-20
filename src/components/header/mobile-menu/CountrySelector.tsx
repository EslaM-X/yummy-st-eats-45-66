
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-picker';
import { CountryDisplay } from '@/components/ui/country-display';

interface CountrySelectorProps {
  selectedCountry: string;
  handleCountryChange: (code: string) => void;
  countryMenuOpen: boolean;
  setCountryMenuOpen: (open: boolean) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  handleCountryChange,
  countryMenuOpen,
  setCountryMenuOpen
}) => {
  const { t, language } = useLanguage();
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  
  // Trigger animation when menu opens
  useEffect(() => {
    if (countryMenuOpen) {
      setAnimateIn(true);
    } else {
      setAnimateIn(false);
      // Reset search when closed
      setTimeout(() => {
        if (!countryMenuOpen) setCountrySearchQuery('');
      }, 300);
    }
  }, [countryMenuOpen]);

  const filteredCountries = countrySearchQuery.trim() === ''
    ? countries
    : countries.filter(country => {
        const query = countrySearchQuery.toLowerCase();
        return (
          country.name.toLowerCase().includes(query) ||
          country.nameAr.toLowerCase().includes(query) ||
          country.code.toLowerCase().includes(query)
        );
      });

  // Popular/favorite countries
  const favoriteCountries = countries.slice(0, 8);

  return (
    <div className="px-3 py-2 mb-2">
      {/* Quick access favorites */}
      <div className="flex flex-wrap justify-center mb-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-2">
        {favoriteCountries.map((country) => (
          <Button
            key={country.code}
            variant="ghost"
            size="icon"
            className={`rounded-full w-9 h-9 m-1 transition-all duration-300 
              ${selectedCountry === country.code ? 
                'bg-primary/20 ring-2 ring-primary shadow-md scale-110' : 
                'hover:bg-primary/10 hover:scale-105'}`}
            onClick={() => handleCountryChange(country.code)}
          >
            <span className="text-lg relative">
              {country.flagEmoji}
              {selectedCountry === country.code && (
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
              )}
            </span>
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full w-9 h-9 m-1 transition-all duration-300 
            ${countryMenuOpen ? 'bg-primary/20' : 'hover:bg-primary/10'}`}
          onClick={() => setCountryMenuOpen(!countryMenuOpen)}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Detailed country list */}
      <div className={`overflow-hidden transition-all duration-300 ${countryMenuOpen ? 'max-h-[300px]' : 'max-h-0'}`}>
        <div className={`mt-2 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-inner transition-all duration-300 
                      ${animateIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
          <div className="relative mb-3">
            <input 
              type="text" 
              placeholder={t('searchCountries') || 'بحث الدول...'}
              className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm pl-9 pr-3 
                       text-black dark:text-white bg-gray-50 dark:bg-gray-900"
              value={countrySearchQuery}
              onChange={(e) => setCountrySearchQuery(e.target.value)}
              autoFocus={countryMenuOpen}
            />
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          
          {filteredCountries.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 max-h-[200px] overflow-y-auto p-1">
              {filteredCountries.map((country) => (
                <Button
                  key={country.code}
                  variant="ghost"
                  size="icon"
                  className={`rounded-full w-10 h-10 bg-gray-50 dark:bg-gray-800 
                    ${selectedCountry === country.code ? 
                      'ring-2 ring-primary shadow-md scale-110 bg-primary/10' : 
                      'hover:bg-primary/5 hover:scale-105'}`}
                  onClick={() => handleCountryChange(country.code)}
                  title={language === 'ar' ? country.nameAr : country.name}
                >
                  <span className="text-lg">{country.flagEmoji}</span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              {t('noCountriesFound') || 'لا توجد دول مطابقة'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;
