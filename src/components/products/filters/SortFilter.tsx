
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SortFilterProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({
  sortBy,
  setSortBy,
}) => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default SortFilter;
