
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
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
import { useIsMobile } from '@/hooks/use-mobile';
import { CountrySearch } from './country-search';
import { CountryFavorites } from './country-favorites';
import { CountryList } from './country-list';

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
  const [favoritesVisible, setFavoritesVisible] = useState(true);
  const isMobile = useIsMobile();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Reset search and show favorites when dropdown closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchQuery('');
        setFavoritesVisible(true);
      }, 200);
    } else if (isMobile) {
      // على الأجهزة المحمولة، نؤخر التركيز قليلاً لضمان فتح القائمة أولاً
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300);
    }
  }, [open, isMobile]);

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
        className="max-h-[80vh] bg-white dark:bg-gray-800 shadow-xl border-primary/20 rounded-xl overflow-hidden p-3 animate-scale-in z-[1000]"
        position="popper"
        sideOffset={4}
      >
        {/* Search input - إضافة مرجع لحل مشكلة الكتابة على الموبايل */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-[101] mb-3 pb-2">
          <div className="relative">
            <CountrySearch 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              autoFocus={isMobile ? false : true} 
            />
          </div>
        </div>
        
        {/* Favorites */}
        {favoritesVisible && (
          <CountryFavorites favoriteCountries={favoriteCountries} />
        )}
        
        {/* Country list */}
        <CountryList filteredCountries={filteredCountries} />
      </SelectContent>
    </Select>
  );
};

export default CountryPicker;
