
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EmptyProductState from './grid-components/EmptyProductState';
import ProductsLoading from './grid-components/ProductsLoading';
import BestSellersSection from './grid-components/BestSellersSection';
import AllProductsSection from './grid-components/AllProductsSection';

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  handleClearFilters: () => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, isLoading, handleClearFilters }) => {
  const { t } = useLanguage();
  
  if (isLoading) {
    return <ProductsLoading />;
  }

  if (products.length === 0) {
    return <EmptyProductState handleClearFilters={handleClearFilters} />;
  }

  // Group products by bestsellers and regular products
  const bestSellers = products.filter(product => product.bestseller);
  const regularProducts = products.filter(product => !product.bestseller);

  return (
    <div className="space-y-12 animate-fade-in">
      {bestSellers.length > 0 && (
        <BestSellersSection bestSellers={bestSellers} />
      )}
      
      <AllProductsSection regularProducts={regularProducts} />
      
      {products.length > 8 && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline"
            className="border-yellow-800 text-yellow-800 dark:border-yellow-600 dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 font-cairo"
          >
            {t('loadMore')}
            <ArrowDown className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
