
import React from 'react';
import { cn } from '@/lib/utils';

interface FilterContainerProps {
  isFiltersOpen: boolean;
  children: React.ReactNode;
}

const FilterContainer: React.FC<FilterContainerProps> = ({ isFiltersOpen, children }) => {
  return (
    <div className={cn(
      "grid transition-all duration-300 ease-in-out origin-top",
      isFiltersOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    )}>
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default FilterContainer;
