
import React, { useState } from 'react';
import { Restaurant } from '@/types';
import RestaurantCard from './RestaurantCard';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'مطعم الأصيل',
    cuisine: 'مأكولات شرقية, مشويات',
    rating: 4.5,
    deliveryTime: '25-35 دقيقة',
    imageUrl: '/lovable-uploads/photo-1506744038136-46273834b3fb.png', 
    isNew: true,
    description: 'تخصص في المأكولات الشرقية التقليدية والمشويات الطازجة مع أفضل التوابل'
  },
  {
    id: '2',
    name: 'بيتزا بلس',
    cuisine: 'بيتزا, إيطالي',
    rating: 4.2,
    deliveryTime: '30-40 دقيقة',
    imageUrl: '/lovable-uploads/photo-1618160702438-9b02ab6515c9.png',
    discount: '15%',
    description: 'بيتزا إيطالية أصلية بعجينة طازجة وخبز في الفرن الحجري'
  },
  {
    id: '3',
    name: 'سوشي تايم',
    cuisine: 'ياباني, سوشي',
    rating: 4.8,
    deliveryTime: '35-45 دقيقة',
    imageUrl: '/lovable-uploads/photo-1472396961693-142e6e269027.png',
    description: 'أطباق سوشي فاخرة محضرة من قبل طهاة يابانيين محترفين'
  },
  {
    id: '4',
    name: 'برجر فاكتوري',
    cuisine: 'أمريكي, برجر',
    rating: 4.3,
    deliveryTime: '20-30 دقيقة',
    imageUrl: '/lovable-uploads/photo-1469041797191-50ace28483c3.png',
    discount: '10%',
    description: 'برجر لحم بقري فاخر طازج 100% مع صلصات خاصة وخبز محضر يومياً'
  },
  {
    id: '5',
    name: 'مطعم الطازج',
    cuisine: 'بحري, مأكولات بحرية',
    rating: 4.6,
    deliveryTime: '30-50 دقيقة',
    imageUrl: '/lovable-uploads/photo-1582562124811-c09040d0a901.png',
    isNew: true,
    description: 'أطباق بحرية طازجة يومياً مع توابل خاصة وطرق تحضير مميزة'
  },
];

const RestaurantList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState<string>('');
  
  // Get unique cuisines for filter
  const allCuisines = mockRestaurants
    .flatMap(restaurant => restaurant.cuisine.split(', '))
    .filter((cuisine, index, self) => self.indexOf(cuisine) === index);
  
  // Filter restaurants based on search term and cuisine filter
  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisineFilter === '' || restaurant.cuisine.includes(cuisineFilter);
    return matchesSearch && matchesCuisine;
  });

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          اكتشف أفضل المطاعم
        </h2>
        
        {/* Search and filter section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              type="text"
              placeholder="ابحث عن مطعم أو نوع طعام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-gray-300 dark:border-gray-600"
            />
          </div>
          
          <select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            className="max-w-xs w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="">جميع المطابخ</option>
            {allCuisines.map((cuisine, index) => (
              <option key={index} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>
        
        {/* Restaurants grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              لا توجد مطاعم متطابقة مع بحثك
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              يرجى تعديل معايير البحث والمحاولة مرة أخرى
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantList;
