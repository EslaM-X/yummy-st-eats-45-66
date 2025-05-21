
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Import the new smaller components
import FilterHeader from './filters/FilterHeader';
import CategoryFilter from './filters/CategoryFilter';
import SortFilter from './filters/SortFilter';
import CompactCountryFilter from './filters/CompactCountryFilter';
import ResetButton from './filters/ResetButton';

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
  
  // Calculate active filters
  const hasActiveFilters = !!(selectedCategory || sortBy || selectedCountry);
  const filterCount = [
    selectedCategory && '1',
    sortBy && '1',
    selectedCountry && '1'
  ].filter(Boolean).length;
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow-sm mb-4">
      {/* Filter Toggle Header */}
      <FilterHeader 
        isFiltersOpen={isFiltersOpen}
        setIsFiltersOpen={setIsFiltersOpen}
        hasActiveFilters={hasActiveFilters}
        filterCount={filterCount}
      />
      
      {/* Expandable Filter Content */}
      <div className={cn(
        "grid transition-all duration-300 ease-in-out origin-top",
        isFiltersOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="p-3 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {/* Category Filter */}
            <CategoryFilter 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
            
            {/* Sort By Filter */}
            <SortFilter 
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            
            {/* Compact Country Filter */}
            <CompactCountryFilter 
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
            
            {/* Reset Button */}
            <ResetButton handleClearFilters={handleClearFilters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
