
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block">
              <span className="relative z-10">أشهى الأطباق والمنتجات</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/30 dark:bg-yellow-800/30 -z-0 transform -rotate-1"></span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              اكتشف مجموعة متنوعة من الأطباق الشهية المحضرة بعناية من أفضل المطاعم في المدينة، مع خيارات توصيل سريعة
            </p>
          </div>

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
