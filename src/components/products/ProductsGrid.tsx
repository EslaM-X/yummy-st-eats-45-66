
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  handleClearFilters: () => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, isLoading, handleClearFilters }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-2/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          لا توجد منتجات متطابقة مع بحثك
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          يرجى تعديل معايير البحث والمحاولة مرة أخرى
        </p>
        <Button onClick={handleClearFilters} className="bg-yellow-800 hover:bg-yellow-900 text-white">
          عرض كل المنتجات
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
