
import React, { useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';

interface CountrySearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  autoFocus?: boolean;
}

export const CountrySearch: React.FC<CountrySearchProps> = ({
  searchQuery,
  setSearchQuery,
  autoFocus = false
}) => {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // إصلاح للهواتف المحمولة: إيقاف انتشار الأحداث
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchQuery(e.target.value);
  };

  // منع فقدان التركيز وإيقاف انتشار جميع الأحداث المرتبطة باللمس والنقر
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // التأكد من أن حقل الإدخال لا يزال في التركيز
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="sticky top-0 bg-white dark:bg-gray-800 z-[101] mb-3 pb-2">
      <div className="relative">
        <Input
          placeholder={t('searchCountries') || 'بحث عن دولة...'}
          value={searchQuery}
          onChange={handleSearchInput}
          onClick={handleInteraction}
          onTouchStart={handleInteraction}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={handleInteraction}
          className="pl-8 pr-3 py-2 w-full border-gray-200 dark:border-gray-700 rounded-lg 
                    bg-gray-50 dark:bg-gray-900 focus:ring-1 focus:ring-primary text-sm
                    text-black dark:text-white"
          ref={inputRef}
          autoFocus={autoFocus}
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
  );
};
