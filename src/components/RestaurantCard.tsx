
import React from 'react';
import { Restaurant } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, ArrowRight, MapPin, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; // Changed from '@/hooks/use-toast' to a more common pattern
import { useLanguage } from '@/contexts/LanguageContext';

const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const { toast } = useToast(); // Corrected hook usage

  const handleOrderNowClick = () => {
    navigate(`/products?restaurant=${restaurant.id}`); // Assuming you want to filter products by restaurant ID
    toast({
      title: t('restaurantCardSelectedToast', { restaurantName: restaurant.name }),
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
          src={restaurant.imageUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800"} 
          alt={restaurant.name} 
          className="w-full h-40 sm:h-52 object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // Fallback image can also be localized if needed, or use a generic one
            target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80&txt=Restaurant+Image";
          }}
        />
        {restaurant.isNew && (
          <span className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}>
            {t('new')}
          </span>
        )}
        {restaurant.discount && (
          <span className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}>
            {t('discount')} {restaurant.discount}
          </span>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h3 className="text-base sm:text-xl font-bold">{restaurant.name}</h3>
          <p className="text-xs sm:text-sm opacity-90">{restaurant.cuisine}</p>
        </div>
      </div>
      
      <div className="p-4">
        {restaurant.description && (
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{restaurant.description}</p>
        )}
        
        <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <Star className={`h-4 w-4 sm:h-5 sm:w-5 ${getRatingColor(restaurant.rating)} ${isRTL ? 'ml-1' : 'mr-1'}`} fill="currentColor" /> 
            <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <Clock className={`h-3 w-3 sm:h-4 sm:w-4 ${isRTL ? 'ml-1' : 'mr-1'} text-gray-500`} />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center">
            <MapPin className={`h-3 w-3 sm:h-4 sm:w-4 ${isRTL ? 'ml-1' : 'mr-1'} text-yellow-800 dark:text-yellow-500`} />
            <span className="text-xs sm:text-sm">{t('restaurantCardDistance', { distance: '1.2', unit: t('restaurantCardKmUnit')})}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Coffee className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-800 dark:text-yellow-500" />
          <span className="text-xs text-yellow-800 dark:text-yellow-500 font-medium bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
            {t('restaurantCardMinOrder', { value: 20 })}
          </span>
        </div>
        
        <button 
          onClick={handleOrderNowClick}
          className="w-full bg-gradient-to-r from-yellow-700 to-yellow-800 hover:from-yellow-800 hover:to-yellow-900 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg text-xs sm:text-sm">
          {t('orderNow')}
          <ArrowRight className={`h-3 w-3 sm:h-4 sm:w-4 ${isRTL ? 'mr-2 rtl:rotate-180' : 'ml-2 ltr:rotate-0'}`} />
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
