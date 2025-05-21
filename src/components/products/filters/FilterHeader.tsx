
import React from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterHeaderProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isOpen: boolean) => void;
  hasActiveFilters: boolean;
  filterCount: number;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  isFiltersOpen,
  setIsFiltersOpen,
  hasActiveFilters,
  filterCount
}) => {
  const { t } = useLanguage();
  
  return (
    <div 
      className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition-colors"
      onClick={() => setIsFiltersOpen(!isFiltersOpen)}
    >
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        <span className="font-medium text-sm">
          {t('filterOptions')}
        </span>
        {hasActiveFilters && (
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
            {filterCount}
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
  );
};

export default FilterHeader;
