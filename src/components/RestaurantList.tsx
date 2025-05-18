
import React from 'react';
import { Restaurant } from '@/types';
import RestaurantCard from './RestaurantCard';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'مطعم الأصيل',
    cuisine: 'مأكولات شرقية, مشويات',
    rating: 4.5,
    deliveryTime: '25-35 دقيقة',
    imageUrl: '/lovable-uploads/photo-1506744038136-46273834b3fb.png', // Example image
    isNew: true,
  },
  {
    id: '2',
    name: 'بيتزا بلس',
    cuisine: 'بيتزا, إيطالي',
    rating: 4.2,
    deliveryTime: '30-40 دقيقة',
    imageUrl: '/lovable-uploads/photo-1618160702438-9b02ab6515c9.png', // Example image
    discount: '15%',
  },
  {
    id: '3',
    name: 'سوشي تايم',
    cuisine: 'ياباني, سوشي',
    rating: 4.8,
    deliveryTime: '35-45 دقيقة',
    imageUrl: '/lovable-uploads/photo-1488590528505-98d2b5aba04b.png', // Example image for tech, will be restaurant-like
  },
   {
    id: '4',
    name: 'برجر فاكتوري',
    cuisine: 'أمريكي, برجر',
    rating: 4.3,
    deliveryTime: '20-30 دقيقة',
    imageUrl: '/lovable-uploads/photo-1461749280684-dccba630e2f6.png', // Placeholder
  },
];

const RestaurantList: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          اكتشف أفضل المطاعم
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantList;
