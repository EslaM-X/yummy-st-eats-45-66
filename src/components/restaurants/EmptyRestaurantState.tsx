
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface EmptyRestaurantStateProps {
  resetFilters: () => void;
}

const EmptyRestaurantState: React.FC<EmptyRestaurantStateProps> = ({ resetFilters }) => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="inline-block p-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        {t('noRestaurantsFoundTitleRList')}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {t('noRestaurantsFoundSubtitleRList')}
      </p>
      <Button 
        onClick={resetFilters} 
        variant="outline" 
        className="font-semibold"
      >
        {t('showAllRestaurantsButtonRList')}
      </Button>
    </div>
  );
};

export default EmptyRestaurantState;
