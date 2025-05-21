
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResetButtonProps {
  handleClearFilters: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ handleClearFilters }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-end">
      <Button 
        onClick={(e) => {
          e.stopPropagation();
          handleClearFilters();
        }}
        variant="outline"
        size="sm"
        className="w-full text-sm h-9 border-gray-300 dark:border-gray-600 font-medium"
      >
        {t('resetFiltersButton')}
      </Button>
    </div>
  );
};

export default ResetButton;
