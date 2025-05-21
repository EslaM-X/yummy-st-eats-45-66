
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default CategoryFilter;
