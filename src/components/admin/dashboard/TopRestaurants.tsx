
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface Restaurant {
  name: string;
  orders: number;
  rating: number;
}

interface TopRestaurantsProps {
  restaurants: Restaurant[];
}

const TopRestaurants: React.FC<TopRestaurantsProps> = ({ restaurants }) => {
  return (
    <div className="space-y-5">
      {restaurants.map((restaurant, index) => (
        <div key={index} className="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold mr-3 rtl:mr-0 rtl:ml-3">
              {index + 1}
            </div>
            <div>
              <h4 className="font-medium">{restaurant.name}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                  {restaurant.rating} ★
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {restaurant.orders} طلب
                </span>
              </div>
            </div>
          </div>
          <div className="w-24">
            <Progress value={restaurant.orders / 1.5} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopRestaurants;
