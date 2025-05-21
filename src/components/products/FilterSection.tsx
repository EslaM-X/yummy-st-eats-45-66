
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import CountryFilter from './CountryFilter';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface FilterSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  categories: string[];
  handleClearFilters: () => void;
  selectedCountry: string | undefined;
  setSelectedCountry: (country: string | undefined) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isOpen: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  handleClearFilters,
  selectedCountry,
  setSelectedCountry,
  isFiltersOpen,
  setIsFiltersOpen
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow-sm mb-4">
      {/* Filter Toggle Header */}
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition-colors"
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-sm">
            {t('filterOptions')}
          </span>
          {(selectedCategory || sortBy || selectedCountry) && (
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
              {[
                selectedCategory && '1',
                sortBy && '1',
                selectedCountry && '1'
              ].filter(Boolean).length}
            </span>
          )}
        </div>
        <div>
          {isFiltersOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </div>
      
      {/* Expandable Filter Content */}
      <div className={cn(
        "grid transition-all duration-300 ease-in-out origin-top",
        isFiltersOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="p-3 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {/* Category Filter */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                {t('categoryFilterLabel')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                <option value="">{t('allCategoriesOption')}</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Sort By Filter */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                {t('sortByFilterLabel')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                <option value="">{t('sortByOptionDefault')}</option>
                <option value="price-asc">{t('sortByOptionPriceAsc')}</option>
                <option value="price-desc">{t('sortByOptionPriceDesc')}</option>
                <option value="name-asc">{t('sortByOptionNameAsc')}</option>
              </select>
            </div>
            
            {/* Country Filter */}
            <div className="space-y-1">
              <CountryFilter 
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
              />
            </div>
            
            {/* Reset Button */}
            <div className="flex items-end">
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearFilters();
                }}
                variant="outline"
                size="sm"
                className="w-full text-sm h-9 border-gray-300 dark:border-gray-600 font-medium"
              >
                {t('resetFiltersButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
