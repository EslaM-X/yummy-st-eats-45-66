
import React from 'react';
import { Filter, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterToggleProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isOpen: boolean) => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ isFiltersOpen, setIsFiltersOpen }) => {
  return (
    <Button
      onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Filter className="h-4 w-4" />
      فلترة وترتيب
      {isFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </Button>
  );
};

export default FilterToggle;
