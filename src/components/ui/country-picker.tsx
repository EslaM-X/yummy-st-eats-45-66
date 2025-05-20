
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
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
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [favoritesVisible, setFavoritesVisible] = useState(true);
  
  // Reset search and show favorites when dropdown closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchQuery('');
        setFavoritesVisible(true);
      }, 200);
    } else if (inputRef.current) {
      // Focus search input when opened with longer delay for mobile
      setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
    }
  }, [open]);

  // Favorite/popular countries (first 6)
  const favoriteCountries = countries.slice(0, 6);
  
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

  // منع إغلاق القائمة المنسدلة عند الكتابة في حقل البحث
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchQuery(e.target.value);
  };
  
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger 
        className={`${className} hover:bg-primary/5 transition-all duration-300 group`}
        aria-label={t('selectCountry')}
      >
        <SelectValue placeholder={placeholder || t('selectCountry')}>
          {value && (
            <CountryDisplay country={countries.find(c => c.code === value)} showName={true} />
          )}
        </SelectValue>
        <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-all duration-300" />
      </SelectTrigger>
      
      <SelectContent 
        className="max-h-[80vh] bg-white dark:bg-gray-800 shadow-xl border-primary/20 border-0 rounded-xl overflow-hidden p-3 animate-scale-in z-[1000]"
        position="popper"
        sideOffset={4}
        // منع إغلاق القائمة المنسدلة عند النقر على حقل البحث
        onInteractOutside={(e) => {
          if (inputRef.current && inputRef.current.contains(e.target as Node)) {
            e.preventDefault();
          }
        }}
      >
        {/* حقل البحث - ثابت في الأعلى */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-[1001] mb-3 pb-2">
          <div className="relative">
            <Input
              placeholder={t('searchCountries')}
              value={searchQuery}
              onChange={handleSearchInput}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="pl-8 pr-3 py-2 w-full border-gray-200 dark:border-gray-700 rounded-lg 
                        bg-gray-50 dark:bg-gray-900 focus:ring-1 focus:ring-primary text-sm
                        text-black dark:text-white"
              ref={inputRef}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              inputMode="search"
              enterKeyHint="search"
            />
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        
        {/* المفضلة */}
        {favoritesVisible && (
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
        )}
        
        {/* قائمة الدول الرئيسية */}
        <ScrollArea className="h-[50vh]">
          <div className="grid grid-cols-1 gap-1 pr-1">
            {filteredCountries.map((country) => (
              <SelectItem
                key={country.code}
                value={country.code}
                className="cursor-pointer hover:bg-primary/10 rounded-md transition-all duration-200 py-2 
                         text-black dark:text-white data-[state=checked]:bg-primary/15"
              >
                <CountryDisplay country={country} showName={true} />
              </SelectItem>
            ))}
            
            {filteredCountries.length === 0 && (
              <div className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                <div className="inline-block p-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-2">
                  <Search className="h-5 w-5 opacity-70" />
                </div>
                <p>{t('noCountriesFound') || 'لا توجد دول مطابقة'}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};

export default CountryPicker;
