
import React from 'react';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import CompactCountryFilter from './CompactCountryFilter';
import ResetButton from './ResetButton';

interface FilterContentProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  categories: string[];
  handleClearFilters: () => void;
  selectedCountry: string | undefined;
  setSelectedCountry: (country: string | undefined) => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  handleClearFilters,
  selectedCountry,
  setSelectedCountry
}) => {
  return (
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
      
      {/* Compact Country Filter - استخدام المكون المصغر الجديد */}
      <CompactCountryFilter 
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      
      {/* Reset Button */}
      <ResetButton handleClearFilters={handleClearFilters} />
    </div>
  );
};

export default FilterContent;
