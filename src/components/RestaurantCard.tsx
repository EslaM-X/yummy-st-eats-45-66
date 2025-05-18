
import React from 'react';
import { Restaurant } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleOrderNowClick = () => {
    navigate(`/products`);
    toast.success(`تم اختيار ${restaurant.name}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img 
          src={restaurant.imageUrl || "https://via.placeholder.com/400x200.png?text=Restaurant+Image"} 
          alt={restaurant.name} 
          className="w-full h-52 object-cover"
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
        
        {restaurant.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{restaurant.description}</p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" /> 
            <span>{restaurant.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>
        <button 
          onClick={handleOrderNowClick}
          className="w-full bg-yellow-800 hover:bg-yellow-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
          اطلب الآن
          <ArrowRight className="h-4 w-4 mr-2 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
