
import React from 'react';
import { Restaurant } from '@/types';
import RestaurantCard from '../RestaurantCard';
import { useSelectedCountry } from '@/components/header/HeaderActionButtons';

interface RestaurantGridProps {
  restaurants: (Restaurant & { country?: string })[];
  filteredCountry?: string;
}

const RestaurantGrid: React.FC<RestaurantGridProps> = ({ restaurants, filteredCountry }) => {
  // Get the globally selected country
  const { selectedCountry: globalSelectedCountry } = useSelectedCountry();
  
  // Filter restaurants by country if a country filter is applied
  const filteredRestaurants = restaurants.filter(restaurant => {
    // If no specific country filter is applied, use the global country filter
    const countryToUse = filteredCountry !== undefined ? filteredCountry : globalSelectedCountry;
    
    // If no country filter is applied at all, show all restaurants
    if (!countryToUse) return true;
    
    // If the restaurant has no country specified, include it in all results
    if (!restaurant.country) return true;
    
    // Filter by the specified country
    return restaurant.country === countryToUse;
  });
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantGrid;
