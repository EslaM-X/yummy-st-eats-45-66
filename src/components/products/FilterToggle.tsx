
import React from 'react';
import { Filter, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterToggleProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isOpen: boolean) => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ isFiltersOpen, setIsFiltersOpen }) => {
  const { t } = useLanguage();
  
  return (
    <Button
      onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      variant="outline"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 font-cairo shadow-lg"
    >
      <Filter className="h-4 w-4" />
      {t('filter')}
      {isFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </Button>
  );
};

export default FilterToggle;
