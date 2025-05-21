import { useState, useEffect } from 'react';
import { Restaurant } from '@/types';
import { useSelectedCountry } from '@/components/header/HeaderActionButtons';

// Mock restaurants with country data
const mockRestaurants: (Restaurant & { country?: string })[] = [
  {
    id: '1',
    name: 'مطعم الأصيل',
    cuisine: 'مأكولات شرقية, مشويات',
    rating: 4.5,
    deliveryTime: '25-35 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800', 
    isNew: true,
    description: 'تخصص في المأكولات الشرقية التقليدية والمشويات الطازجة مع أفضل التوابل',
    country: 'sa'
  },
  {
    id: '2',
    name: 'بيتزا بلس',
    cuisine: 'بيتزا, إيطالي',
    rating: 4.2,
    deliveryTime: '30-40 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800',
    discount: '15%',
    description: 'بيتزا إيطالية أصلية بعجينة طازجة وخبز في الفرن الحجري',
    country: 'ae'
  },
  {
    id: '3',
    name: 'سوشي تايم',
    cuisine: 'ياباني, سوشي',
    rating: 4.8,
    deliveryTime: '35-45 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800',
    description: 'أطباق سوشي فاخرة محضرة من قبل طهاة يابانيين محترفين',
    country: 'kw'
  },
  {
    id: '4',
    name: 'برجر فاكتوري',
    cuisine: 'أمريكي, برجر',
    rating: 4.3,
    deliveryTime: '20-30 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?auto=format&fit=crop&w=800',
    discount: '10%',
    description: 'برجر لحم بقري فاخر طازج 100% مع صلصات خاصة وخبز محضر يومياً',
    country: 'qa'
  },
  {
    id: '5',
    name: 'مطعم الطازج',
    cuisine: 'بحري, مأكولات بحرية',
    rating: 4.6,
    deliveryTime: '30-50 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800',
    isNew: true,
    description: 'أطباق بحرية طازجة يومياً مع توابل خاصة وطرق تحضير مميزة',
    country: 'eg'
  },
];

export const useMockRestaurants = (
  searchTerm: string,
  cuisineFilter: string,
  minRating: number,
  showNewOnly: boolean,
  showDiscountOnly: boolean,
  sortBy: string,
  countryFilter: string | undefined,
  isRTL: boolean
) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState<(Restaurant & { country?: string })[]>(mockRestaurants);
  
  // Get the global selected country from the header
  const { selectedCountry: globalSelectedCountry } = useSelectedCountry();
  
  // Get unique cuisines for filter
  const allCuisines = mockRestaurants
    .flatMap(restaurant => restaurant.cuisine.split(', ').map(c => c.trim()))
    .filter((cuisine, index, self) => self.indexOf(cuisine) === index && cuisine !== '');
  
  // Apply filters when any filter changes or when the global country changes
  useEffect(() => {
    let filtered = mockRestaurants.filter(restaurant => {
      const nameForSearch = restaurant.name;
      const cuisineForSearch = restaurant.cuisine;
      const descriptionForSearch = restaurant.description || "";

      const searchTermLower = searchTerm.toLowerCase();
      
      const matchesSearch = nameForSearch.toLowerCase().includes(searchTermLower) || 
                            cuisineForSearch.toLowerCase().includes(searchTermLower) ||
                            descriptionForSearch.toLowerCase().includes(searchTermLower);
      
      const matchesCuisine = cuisineFilter === '' || restaurant.cuisine.includes(cuisineFilter);
      const matchesRating = restaurant.rating >= minRating;
      const matchesNew = !showNewOnly || restaurant.isNew === true;
      const matchesDiscount = !showDiscountOnly || restaurant.discount !== undefined;
      
      // Check if restaurant matches the global country filter from header
      const matchesGlobalCountry = !globalSelectedCountry || restaurant.country === globalSelectedCountry;
      
      // Check if restaurant matches the local country filter
      const matchesLocalCountry = !countryFilter || restaurant.country === countryFilter;
      
      return matchesSearch && matchesCuisine && matchesRating && matchesNew && 
             matchesDiscount && matchesGlobalCountry && matchesLocalCountry;
    });
    
    // Sort the restaurants
    switch (sortBy) {
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name, isRTL ? 'ar' : 'en'));
        break;
      case 'deliveryTime':
        filtered = filtered.sort((a, b) => {
          const extractTime = (timeStr: string) => parseInt(timeStr.match(/\d+/)?.[0] || '999');
          const aTime = extractTime(a.deliveryTime);
          const bTime = extractTime(b.deliveryTime);
          return aTime - bTime;
        });
        break;
      case 'recommended':
      default:
        // Keep original order or apply a default recommendation logic if available
        break;
    }
    
    setFilteredRestaurants(filtered);
  }, [searchTerm, cuisineFilter, minRating, showNewOnly, showDiscountOnly, sortBy, isRTL, countryFilter, globalSelectedCountry]);
  
  return {
    mockRestaurants,
    filteredRestaurants,
    setFilteredRestaurants,
    allCuisines
  };
};
