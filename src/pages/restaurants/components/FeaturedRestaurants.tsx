
import React from 'react';
import { Restaurant } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Star, Coffee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-data';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturedRestaurantsProps {
  restaurants: (Restaurant & { country: string })[];
  isVisible: boolean;
}

const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({ restaurants, isVisible }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleFeaturedClick = (id: string) => {
    navigate(`/products?restaurant=${id}`);
  };

  if (restaurants.length === 0) {
    return null;
  }

  return (
    <section className={`mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t('featuredRestaurantsTitle')}
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{t('swipeForMore')}</span>
            <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>

        <Carousel className="w-full mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {restaurants.map((restaurant) => (
              <CarouselItem key={restaurant.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full" onClick={() => handleFeaturedClick(restaurant.id)}>
                  <Card className="border-0 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full cursor-pointer bg-white dark:bg-gray-800">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative overflow-hidden h-48">
                        <img 
                          src={restaurant.imageUrl} 
                          alt={restaurant.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        {restaurant.isNew && (
                          <span className="absolute top-2 right-2 rtl:right-2 rtl:left-auto ltr:left-auto ltr:right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {t('new')}
                          </span>
                        )}
                        {restaurant.discount && (
                          <span className="absolute top-2 left-2 rtl:left-2 rtl:right-auto ltr:right-auto ltr:left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {t('discount')} {restaurant.discount}
                          </span>
                        )}
                        {/* Show country flag */}
                        <span className="absolute bottom-2 right-2 rtl:right-2 rtl:left-auto ltr:left-auto ltr:right-2 bg-white/80 dark:bg-gray-800/80 p-1 rounded-full">
                          {restaurant.country && (
                            <span className="text-lg" title={countries.find(c => c.code === restaurant.country)?.name}>
                              {countries.find(c => c.code === restaurant.country)?.flagEmoji}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{restaurant.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{restaurant.cuisine}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm ml-1 rtl:ml-0 rtl:mr-1">{restaurant.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{restaurant.deliveryTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-0 rtl:right-0 rtl:left-auto" />
            <CarouselNext className="right-0 rtl:left-0 rtl:right-auto" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
