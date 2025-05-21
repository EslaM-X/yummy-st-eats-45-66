
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-data';
import { CountryDisplay } from '@/components/ui/country-display';
import { Globe, Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

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
  const [open, setOpen] = useState(false);
  
  // Filter countries based on search query
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

  // Popular/favorite countries
  const favoriteCountries = countries.slice(0, 6);

  const handleCountryChange = (value: string) => {
    if (value === 'all') {
      onCountryChange(undefined);
    } else {
      onCountryChange(value);
    }
    setOpen(false);
  };

  return (
    <>
      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
        {t('countryFilterLabel') || 'تصفية حسب الدولة'}
      </label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center justify-between gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                        bg-white dark:bg-gray-700 text-sm text-start w-full h-9 truncate">
            <div className="flex items-center gap-2 truncate">
              {selectedCountry ? (
                <CountryDisplay 
                  country={countries.find(c => c.code === selectedCountry)}
                  showName={true} 
                />
              ) : (
                <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 truncate">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{t('allCountriesOption') || 'كل الدول'}</span>
                </span>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </PopoverTrigger>
        
        <PopoverContent className="w-[280px] p-3 max-h-[300px] overflow-y-auto" align="start">
          <div className="mb-2">
            <div className="relative">
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder={t('searchCountries') || 'بحث عن دولة...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 w-full text-sm py-1"
                autoComplete="off"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => handleCountryChange('all')}
              className={`flex items-center gap-2 p-2 rounded-md text-start text-sm
                        ${!selectedCountry ? 'bg-primary/15' : 'hover:bg-primary/5'}`}
            >
              <Globe className="h-4 w-4 flex-shrink-0" />
              <span>{t('allCountriesOption') || 'كل الدول'}</span>
            </button>
            
            {/* Favorite countries */}
            <div className="py-1">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('popularCountries') || 'الدول الشائعة'}
              </h3>
              <div className="grid grid-cols-3 gap-1">
                {favoriteCountries.map(country => (
                  <button
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                    className={`flex flex-col items-center justify-center p-1 rounded-md text-sm
                              ${selectedCountry === country.code ? 'bg-primary/15' : 'hover:bg-primary/5'}`}
                  >
                    <span className="text-lg mb-0.5">{country.flagEmoji}</span>
                    <span className="text-xs truncate w-full text-center">
                      {language === 'ar' ? country.nameAr : country.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* All countries */}
            <div className="py-1">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t('allCountriesLabel') || 'كل الدول'}
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {filteredCountries.map(country => (
                  <button
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                    className={`flex items-center gap-2 p-1.5 w-full rounded-md text-start text-sm
                            ${selectedCountry === country.code ? 'bg-primary/15' : 'hover:bg-primary/5'}`}
                  >
                    <CountryDisplay country={country} showName={true} />
                  </button>
                ))}
              </div>
              
              {filteredCountries.length === 0 && (
                <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                  {t('noCountriesFound') || 'لا توجد دول مطابقة'}
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CountryFilter;
