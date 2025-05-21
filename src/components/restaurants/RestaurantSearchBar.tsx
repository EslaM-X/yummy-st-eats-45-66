
import React from 'react';
import { Search, Sliders, ChevronDown, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface RestaurantSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

const RestaurantSearchBar: React.FC<RestaurantSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  resetFilters
}) => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-grow">
        <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 ${isRTL ? 'right-3' : 'left-3'}`} />
        <Input 
          type="text"
          placeholder={t('searchRestaurantPlaceholderRList')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 w-full`}
        />
      </div>
      
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Sliders className="h-4 w-4" />
        <span>{t('filterSortButton')}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
      </Button>
      
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-gray-500"
        >
          <X className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
          {t('resetFiltersButton')}
        </Button>
      )}
    </div>
  );
};

export default RestaurantSearchBar;
