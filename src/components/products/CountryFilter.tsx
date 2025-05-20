
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountryDisplay } from '@/components/ui/country-display';
import { Globe, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { CountryFavorites } from '@/components/ui/country-favorites';
import { CountryList } from '@/components/ui/country-list';
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
  const [open, setOpen] = useState(false);
  const [favoritesVisible, setFavoritesVisible] = useState(true);
  const isMobile = useIsMobile();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  // Reset search and show favorites when dropdown closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchQuery('');
        setFavoritesVisible(true);
      }, 200);
    } else if (isMobile) {
      // On mobile, we delay focusing to ensure the dropdown is fully open
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300);
    }
  }, [open, isMobile]);

  // Favorite/popular countries
  const favoriteCountries = countries.slice(0, 6);

  const handleCountryChange = (value: string) => {
    if (value === 'all') {
      onCountryChange(undefined);
    } else {
      onCountryChange(value);
      // Add reload functionality for product filters too
      if (value !== selectedCountry) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    }
  };

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
  
  // Hide favorites when searching
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setFavoritesVisible(false);
    } else {
      setFavoritesVisible(true);
    }
  }, [searchQuery]);

  // Stop propagation for all search input events
  const preventPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
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
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-10 hover:bg-primary/5 transition-all duration-300 group">
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
        <SelectContent 
          className="max-h-[80vh] bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 animate-scale-in z-[100]"
          position="popper"
          sideOffset={4}
          align="start"
        >
          {/* Improved search field for mobile */}
          <div 
            className="sticky top-0 bg-white dark:bg-gray-800 z-[101] mb-3 pb-2"
            ref={searchContainerRef}
            onClick={preventPropagation}
            onMouseDown={preventPropagation}
            onMouseUp={preventPropagation}
            onTouchStart={preventPropagation}
            onTouchEnd={preventPropagation}
            onTouchMove={preventPropagation}
          >
            <div className="relative">
              <Input
                placeholder={t('searchCountries') || 'بحث عن دولة...'}
                value={searchQuery}
                onChange={(e) => {
                  preventPropagation(e);
                  setSearchQuery(e.target.value);
                }}
                className="pl-8 pr-3 py-2 w-full border-gray-200 dark:border-gray-700 rounded-lg 
                        bg-gray-50 dark:bg-gray-900 focus:ring-1 focus:ring-primary text-sm
                        text-black dark:text-white"
                ref={searchInputRef}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                inputMode="search"
                enterKeyHint="search"
                onClick={preventPropagation}
                onMouseDown={preventPropagation}
                onMouseUp={preventPropagation}
                onTouchStart={preventPropagation}
                onTouchEnd={preventPropagation}
                onTouchMove={preventPropagation}
                onFocus={preventPropagation}
                onBlur={preventPropagation}
                onKeyDown={preventPropagation}
              />
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          
          {/* "All Countries" option */}
          <SelectItem 
            value="all" 
            className="font-medium text-sm cursor-pointer hover:bg-primary/10 rounded-md mb-2 py-2 
                    text-black dark:text-white data-[state=checked]:bg-primary/15"
          >
            <span className="text-sm flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <Globe className="h-4 w-4" />
              </div>
              {t('allCountriesOption') || 'كل الدول'}
            </span>
          </SelectItem>
          
          {/* Favorites */}
          {favoritesVisible && (
            <CountryFavorites favoriteCountries={favoriteCountries} />
          )}
          
          {/* Main country list */}
          <CountryList filteredCountries={filteredCountries} maxHeight="40vh" />
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountryFilter;
