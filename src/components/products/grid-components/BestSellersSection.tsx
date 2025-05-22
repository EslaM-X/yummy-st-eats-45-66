
import React from 'react';
import { Award } from 'lucide-react';
import ProductCard from '../ProductCard';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface BestSellersSectionProps {
  bestSellers: Product[];
}

const BestSellersSection: React.FC<BestSellersSectionProps> = ({ bestSellers }) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center font-cairo">
          <Award className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-yellow-600" />
          {t('bestSellers')}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {bestSellers.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellersSection;
