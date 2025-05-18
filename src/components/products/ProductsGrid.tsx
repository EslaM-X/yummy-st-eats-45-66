
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Package, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  handleClearFilters: () => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, isLoading, handleClearFilters }) => {
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="w-full h-52 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-2/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="flex justify-between mb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
              </div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
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
  }

  // Group products by category for a better display
  const renderTopSelections = () => {
    const bestSellers = products.filter(product => product.bestseller);
    
    if (bestSellers.length === 0) return null;
    
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

  // Fix missing Award icon import
  const Award = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="8" r="6"></circle>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
    </svg>
  );

  return (
    <div className="space-y-12 animate-fade-in">
      {renderTopSelections()}
      
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 font-cairo">
          {t('allProducts')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products
            .filter(product => !product.bestseller)
            .map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
      
      {products.length > 8 && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline"
            className="border-yellow-800 text-yellow-800 dark:border-yellow-600 dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 font-cairo"
          >
            {t('loadMore')}
            <ArrowDown className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
