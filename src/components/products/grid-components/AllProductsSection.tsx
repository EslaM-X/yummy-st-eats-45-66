
import React from 'react';
import ProductCard from '../ProductCard';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface AllProductsSectionProps {
  regularProducts: Product[];
}

const AllProductsSection: React.FC<AllProductsSectionProps> = ({ regularProducts }) => {
  const { t } = useLanguage();
  
  if (regularProducts.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 font-cairo">
        {t('allProducts')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {regularProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsSection;
