
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import CountryFilter from './CountryFilter';

interface FilterSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  categories: string[];
  handleClearFilters: () => void;
  selectedCountry: string | undefined;
  setSelectedCountry: (country: string | undefined) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  handleClearFilters,
  selectedCountry,
  setSelectedCountry
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 p-4 rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('categoryFilterLabel')}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="">{t('allCategoriesOption')}</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('sortByFilterLabel')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="">{t('sortByOptionDefault')}</option>
            <option value="price-asc">{t('sortByOptionPriceAsc')}</option>
            <option value="price-desc">{t('sortByOptionPriceDesc')}</option>
            <option value="name-asc">{t('sortByOptionNameAsc')}</option>
          </select>
        </div>
        
        <CountryFilter 
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
        />
        
        <div className="flex items-end">
          <Button 
            onClick={handleClearFilters}
            variant="outline"
            className="w-full"
          >
            {t('resetFiltersButton')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
