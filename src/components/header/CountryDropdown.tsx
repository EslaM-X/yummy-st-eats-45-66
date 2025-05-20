
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Globe } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-data';
import { CountryDisplay } from '@/components/ui/country-display';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CountryDropdownProps {
  selectedCountry: string;
  handleCountryChange: (code: string) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  selectedCountry,
  handleCountryChange
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(true);
  
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
      
  const favoriteCountries = countries.slice(0, 8);
  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex h-10 w-10 rounded-full hover:scale-110 hover:bg-primary/20 transition-all duration-300 relative"
          aria-label={t('selectCountry') || 'اختر الدولة'}
        >
          {selectedCountryData ? (
            <div className="flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse opacity-30"></div>
              <span className="text-lg">
                {selectedCountryData.flagEmoji}
              </span>
            </div>
          ) : (
            <Globe className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="center" 
        className="w-[300px] sm:w-[350px] max-h-[70vh] overflow-hidden p-0 rounded-xl shadow-xl border border-primary/10"
      >
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-3 border-b border-primary/10 sticky top-0 z-10">
          <h3 className="text-center font-bold text-primary dark:text-primary/90 mb-3">
            {t('selectCountry') || 'اختر الدولة'}
          </h3>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder={t('searchCountries') || 'بحث الدول...'}
              className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 pl-9 pr-3 text-sm bg-white/80 dark:bg-gray-900 focus:ring-1 focus:ring-primary shadow-inner text-black dark:text-white"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim() !== '') {
                  setShowFavorites(false);
                } else {
                  setShowFavorites(true);
                }
              }}
            />
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        
        <div className="p-3">
          {showFavorites && searchQuery.trim() === '' && (
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                {t('popularCountries') || 'الدول الشائعة'}
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {favoriteCountries.map((country) => (
                  <Button
                    key={country.code}
                    variant="ghost"
                    className={`flex flex-col items-center justify-center h-16 rounded-lg p-1 text-black dark:text-white
                      ${selectedCountry === country.code ? 
                        'bg-primary/10 ring-1 ring-primary' : 'hover:bg-primary/5'}`}
                    onClick={() => handleCountryChange(country.code)}
                  >
                    <span className="text-2xl mb-1">{country.flagEmoji}</span>
                    <span className="text-xs truncate w-full text-center">
                      {language === 'ar' ? country.nameAr : country.name}
                    </span>
                  </Button>
                ))}
              </div>
              <div className="my-3 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>
          )}
          
          <div className="h-[300px] overflow-y-auto pr-1 -mr-1">
            <div className="grid grid-cols-1 gap-1">
              {filteredCountries.map((country) => (
                <Button
                  key={country.code}
                  variant="ghost"
                  className={`justify-start cursor-pointer h-10 px-3 hover:bg-primary/10 rounded-lg transition-all duration-200 text-black dark:text-white
                    ${selectedCountry === country.code ? 'bg-primary/15' : ''}`}
                  onClick={() => handleCountryChange(country.code)}
                >
                  <CountryDisplay country={country} showName={true} />
                </Button>
              ))}
              
              {filteredCountries.length === 0 && (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                  {t('noCountriesFound') || 'لا توجد دول مطابقة'}
                </div>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CountryDropdown;
