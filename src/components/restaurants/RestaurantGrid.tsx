
import React from 'react';
import { Restaurant } from '@/types';
import RestaurantCard from '../RestaurantCard';

interface RestaurantGridProps {
  restaurants: (Restaurant & { country?: string })[];
}

const RestaurantGrid: React.FC<RestaurantGridProps> = ({ restaurants }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantGrid;
