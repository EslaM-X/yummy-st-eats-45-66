
import React from 'react';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmptyProductStateProps {
  handleClearFilters: () => void;
}

const EmptyProductState: React.FC<EmptyProductStateProps> = ({ handleClearFilters }) => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className="inline-block p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
        <Package className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2 font-cairo">
        {t('noProducts')}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 font-cairo">
        {t('adjustSearch')}
      </p>
      <Button 
        onClick={handleClearFilters} 
        className="bg-yellow-800 hover:bg-yellow-900 text-white font-semibold shadow-md font-cairo"
      >
        {t('showAll')}
      </Button>
    </div>
  );
};

export default EmptyProductState;
