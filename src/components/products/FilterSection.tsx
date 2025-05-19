
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  categories: string[];
  handleClearFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  handleClearFilters
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
