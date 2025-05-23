
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface RestaurantInfoProps {
  restaurant: {
    name?: string;
    logo_url?: string;
    phone?: string;
  };
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant }) => {
  const { language } = useLanguage();
  const title = language === 'en' ? 'Restaurant Information' : 'معلومات المطعم';
  const phoneLabel = language === 'en' ? 'Phone Number:' : 'رقم الهاتف:';
  const defaultRestaurantName = language === 'en' ? 'Restaurant' : 'مطعم';
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center">
          {restaurant?.logo_url && (
            <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 mb-4 sm:mb-0">
              <img 
                src={restaurant.logo_url} 
                alt={restaurant.name || defaultRestaurantName} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=80&h=80";
                }}
              />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {restaurant?.name || defaultRestaurantName}
            </h3>
            {restaurant?.phone && (
              <p className="text-gray-600 dark:text-gray-400">
                {phoneLabel} {restaurant.phone}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
