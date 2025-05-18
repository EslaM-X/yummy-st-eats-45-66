
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/products/SearchBar';
import FilterToggle from '@/components/products/FilterToggle';
import FilterSection from '@/components/products/FilterSection';
import ProductsGrid from '@/components/products/ProductsGrid';
import { getCategories, getFilteredProducts } from '@/services/ProductService';
import { Product } from '@/types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Extract unique categories
  const categories = getCategories();

  // Filter and sort products
  useEffect(() => {
    setIsLoading(true);
    
    // Get filtered products
    getFilteredProducts(searchTerm, selectedCategory, sortBy)
      .then(filteredProducts => {
        setProducts(filteredProducts);
        setIsLoading(false);
      });
  }, [searchTerm, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            أشهى الأطباق والمنتجات
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            اكتشف مجموعة متنوعة من الأطباق الشهية من أفضل المطاعم
          </p>

          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <FilterToggle isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} />
            </div>

            {isFiltersOpen && (
              <FilterSection 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categories}
                handleClearFilters={handleClearFilters}
              />
            )}
          </div>

          {/* Products grid */}
          <ProductsGrid 
            products={products} 
            isLoading={isLoading} 
            handleClearFilters={handleClearFilters} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
