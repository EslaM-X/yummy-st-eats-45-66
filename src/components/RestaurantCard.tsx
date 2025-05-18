
import React from 'react';
import { Restaurant } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, ArrowRight, MapPin, Coffee } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleOrderNowClick = () => {
    navigate(`/products`);
    toast({
      title: `تم اختيار ${restaurant.name}`,
      variant: "default",
    });
  };

  // تحديد اللون المناسب للتقييم
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-yellow-500';
    if (rating >= 3.0) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fade-in">
      <div className="relative overflow-hidden">
        <img 
          src={restaurant.imageUrl || "https://via.placeholder.com/400x200.png?text=Restaurant+Image"} 
          alt={restaurant.name} 
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {restaurant.isNew && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            جديد
          </span>
        )}
        {restaurant.discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            خصم {restaurant.discount}
          </span>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h3 className="text-xl font-bold">{restaurant.name}</h3>
          <p className="text-sm opacity-90">{restaurant.cuisine}</p>
        </div>
      </div>
      
      <div className="p-4">
        {restaurant.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{restaurant.description}</p>
        )}
        
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-700 dark:text-gray-300 mb-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <Star className={`h-5 w-5 ${getRatingColor(restaurant.rating)} mr-1`} fill="currentColor" /> 
            <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-yellow-800 dark:text-yellow-500" />
            <span className="text-sm">1.2 كم</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Coffee className="h-4 w-4 text-yellow-800 dark:text-yellow-500" />
          <span className="text-xs text-yellow-800 dark:text-yellow-500 font-medium bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
            الحد الأدنى للطلب 20 ST
          </span>
        </div>
        
        <button 
          onClick={handleOrderNowClick}
          className="w-full bg-gradient-to-r from-yellow-700 to-yellow-800 hover:from-yellow-800 hover:to-yellow-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
          اطلب الآن
          <ArrowRight className="h-4 w-4 mr-2 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
