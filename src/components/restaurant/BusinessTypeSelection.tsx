
import React from 'react';
import { Button } from "@/components/ui/button";
import { Store, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface BusinessTypeSelectionProps {
  selectedType: string | null;
  setSelectedType: (type: string) => void;
  onNext: () => void;
}

const BusinessTypeSelection: React.FC<BusinessTypeSelectionProps> = ({ 
  selectedType, 
  setSelectedType, 
  onNext 
}) => {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold mb-10">{t('chooseBusinessType')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-8 rounded-lg flex flex-col items-center cursor-pointer border-2 transition-all ${
            selectedType === 'restaurant' 
            ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
            : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300'
          }`}
          onClick={() => setSelectedType('restaurant')}
        >
          <Store className="h-16 w-16 mb-4 text-yellow-600 dark:text-yellow-500" />
          <h3 className="text-xl font-semibold">{t('restaurant')}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t('restaurantDesc')}</p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-8 rounded-lg flex flex-col items-center cursor-pointer border-2 transition-all ${
            selectedType === 'food' 
            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
            : 'border-gray-200 dark:border-gray-700 hover:border-teal-300'
          }`}
          onClick={() => setSelectedType('food')}
        >
          <Utensils className="h-16 w-16 mb-4 text-teal-600 dark:text-teal-500" />
          <h3 className="text-xl font-semibold">{t('foodItems')}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t('foodItemsDesc')}</p>
        </motion.div>
      </div>
      
      <Button
        onClick={onNext}
        disabled={!selectedType}
        className="mt-10 bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-white py-2 px-8 rounded-lg transition-all duration-300 disabled:opacity-50"
      >
        {t('next')}
      </Button>
    </motion.div>
  );
};

export default BusinessTypeSelection;
