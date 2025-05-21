
import React, { useState, useEffect } from 'react';
import { Restaurant } from '@/types';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { useSelectedCountry } from '@/components/header/HeaderActionButtons';
import RestaurantSearchBar from './RestaurantSearchBar';
import RestaurantFilter from './RestaurantFilter';
import EmptyRestaurantState from './EmptyRestaurantState';
import RestaurantGrid from './RestaurantGrid';
import { useMockRestaurants } from './hooks/useMockRestaurants';

const RestaurantListContainer: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined);
  
  // Get mock restaurants data
  const { mockRestaurants, filteredRestaurants, setFilteredRestaurants, allCuisines } = useMockRestaurants(
    searchTerm, 
    cuisineFilter, 
    minRating, 
    showNewOnly, 
    showDiscountOnly, 
    sortBy, 
    countryFilter, 
    isRTL
  );
  
  // Get the global selected country from the header
  const { selectedCountry: globalSelectedCountry } = useSelectedCountry();
  
  // Listen for country change events from header
  useEffect(() => {
    const handleCountryChanged = () => {
      // Reset local country filter when global country changes
      setCountryFilter(undefined);
    };
    
    window.addEventListener('country-changed', handleCountryChanged);
    return () => {
      window.removeEventListener('country-changed', handleCountryChanged);
    };
  }, []);
  
  const resetFilters = () => {
    setSearchTerm('');
    setCuisineFilter('');
    setMinRating(0);
    setShowNewOnly(false);
    setShowDiscountOnly(false);
    setSortBy('recommended');
    setCountryFilter(undefined);
  };

  // Check if there are any active filters
  const hasActiveFilters = searchTerm || cuisineFilter || minRating > 0 || 
                          showNewOnly || showDiscountOnly || 
                          sortBy !== 'recommended' || countryFilter;

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and filter bar */}
        <Card className="bg-white dark:bg-gray-800 mb-8 shadow-md">
          <CardContent className="p-4">
            {/* Search Bar */}
            <RestaurantSearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              hasActiveFilters={!!hasActiveFilters}
              resetFilters={resetFilters}
            />
            
            {/* Expandable Filters */}
            {showFilters && (
              <RestaurantFilter 
                cuisineFilter={cuisineFilter}
                setCuisineFilter={setCuisineFilter}
                minRating={minRating}
                setMinRating={setMinRating}
                sortBy={sortBy}
                setSortBy={setSortBy}
                showNewOnly={showNewOnly}
                setShowNewOnly={setShowNewOnly}
                showDiscountOnly={showDiscountOnly}
                setShowDiscountOnly={setShowDiscountOnly}
                countryFilter={countryFilter}
                setCountryFilter={setCountryFilter}
                allCuisines={allCuisines}
                globalSelectedCountry={globalSelectedCountry}
              />
            )}
          </CardContent>
        </Card>
        
        {/* Restaurants grid or empty state */}
        {filteredRestaurants.length > 0 ? (
          <RestaurantGrid restaurants={filteredRestaurants} />
        ) : (
          <EmptyRestaurantState resetFilters={resetFilters} />
        )}
      </div>
    </section>
  );
};

export default RestaurantListContainer;
