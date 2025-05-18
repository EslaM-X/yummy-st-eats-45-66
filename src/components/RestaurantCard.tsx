
import React from 'react';
import { Restaurant } from '@/types';
import { useNavigate } from 'react-router-dom';

const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleOrderNowClick = () => {
    // Navigate to a specific restaurant page (this is a placeholder for future implementation)
    navigate(`/products`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="relative">
        <img 
          src={restaurant.imageUrl || "https://via.placeholder.com/400x200.png?text=Restaurant+Image"} 
          alt={restaurant.name} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {restaurant.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            جديد
          </span>
        )}
        {restaurant.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            خصم {restaurant.discount}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{restaurant.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{restaurant.cuisine}</p>
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 mb-4">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">⭐</span> 
            <span>{restaurant.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🕒</span>
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>
        <button 
          onClick={handleOrderNowClick}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
          اطلب الآن
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
