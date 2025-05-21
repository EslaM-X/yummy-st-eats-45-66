
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Import the new smaller components
import FilterHeader from './filters/FilterHeader';
import FilterContainer from './filters/FilterContainer';
import FilterContent from './filters/FilterContent';

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
      <FilterContainer isFiltersOpen={isFiltersOpen}>
        <FilterContent
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
          handleClearFilters={handleClearFilters}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </FilterContainer>
    </div>
  );
};

export default FilterSection;
