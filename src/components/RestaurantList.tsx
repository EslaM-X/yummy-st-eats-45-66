
import React, { useState, useEffect } from 'react';
import { Restaurant } from '@/types';
import RestaurantCard from './RestaurantCard';
import { Search, Sliders, ChevronDown, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'مطعم الأصيل',
    cuisine: 'مأكولات شرقية, مشويات',
    rating: 4.5,
    deliveryTime: '25-35 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800', 
    isNew: true,
    description: 'تخصص في المأكولات الشرقية التقليدية والمشويات الطازجة مع أفضل التوابل'
  },
  {
    id: '2',
    name: 'بيتزا بلس',
    cuisine: 'بيتزا, إيطالي',
    rating: 4.2,
    deliveryTime: '30-40 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800',
    discount: '15%',
    description: 'بيتزا إيطالية أصلية بعجينة طازجة وخبز في الفرن الحجري'
  },
  {
    id: '3',
    name: 'سوشي تايم',
    cuisine: 'ياباني, سوشي',
    rating: 4.8,
    deliveryTime: '35-45 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800',
    description: 'أطباق سوشي فاخرة محضرة من قبل طهاة يابانيين محترفين'
  },
  {
    id: '4',
    name: 'برجر فاكتوري',
    cuisine: 'أمريكي, برجر',
    rating: 4.3,
    deliveryTime: '20-30 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=800',
    discount: '10%',
    description: 'برجر لحم بقري فاخر طازج 100% مع صلصات خاصة وخبز محضر يومياً'
  },
  {
    id: '5',
    name: 'مطعم الطازج',
    cuisine: 'بحري, مأكولات بحرية',
    rating: 4.6,
    deliveryTime: '30-50 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800',
    isNew: true,
    description: 'أطباق بحرية طازجة يومياً مع توابل خاصة وطرق تحضير مميزة'
  },
];

const RestaurantList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(mockRestaurants);
  
  // Get unique cuisines for filter
  const allCuisines = mockRestaurants
    .flatMap(restaurant => restaurant.cuisine.split(', '))
    .filter((cuisine, index, self) => self.indexOf(cuisine) === index);
  
  // Apply filters when any filter changes
  useEffect(() => {
    let filtered = mockRestaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (restaurant.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      const matchesCuisine = cuisineFilter === '' || restaurant.cuisine.includes(cuisineFilter);
      const matchesRating = restaurant.rating >= minRating;
      const matchesNew = !showNewOnly || restaurant.isNew === true;
      const matchesDiscount = !showDiscountOnly || restaurant.discount !== undefined;
      
      return matchesSearch && matchesCuisine && matchesRating && matchesNew && matchesDiscount;
    });
    
    // Sort the restaurants
    switch (sortBy) {
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'deliveryTime':
        filtered = filtered.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0]);
          const bTime = parseInt(b.deliveryTime.split('-')[0]);
          return aTime - bTime;
        });
        break;
      case 'recommended':
      default:
        // Keep original order
        break;
    }
    
    setFilteredRestaurants(filtered);
  }, [searchTerm, cuisineFilter, minRating, showNewOnly, showDiscountOnly, sortBy]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setCuisineFilter('');
    setMinRating(0);
    setShowNewOnly(false);
    setShowDiscountOnly(false);
    setSortBy('recommended');
  };

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and filter bar */}
        <Card className="bg-white dark:bg-gray-800 mb-8 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  type="text"
                  placeholder="ابحث عن مطعم أو نوع طعام..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Sliders className="h-4 w-4" />
                <span>فلترة وترتيب</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
              </Button>
              
              {(searchTerm || cuisineFilter || minRating > 0 || showNewOnly || showDiscountOnly || sortBy !== 'recommended') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-gray-500"
                >
                  <X className="h-4 w-4 mr-1" />
                  إعادة ضبط
                </Button>
              )}
            </div>
            
            {showFilters && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-4 border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">المطبخ</h3>
                  <select
                    value={cuisineFilter}
                    onChange={(e) => setCuisineFilter(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  >
                    <option value="">جميع المطابخ</option>
                    {allCuisines.map((cuisine, index) => (
                      <option key={index} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    التقييم: {minRating > 0 ? `${minRating}+` : 'الكل'}
                  </h3>
                  <Slider
                    value={[minRating]}
                    min={0}
                    max={5}
                    step={0.5}
                    className="py-4"
                    onValueChange={(value) => setMinRating(value[0])}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">ترتيب حسب</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  >
                    <option value="recommended">الأكثر رواجاً</option>
                    <option value="rating">التقييم: من الأعلى للأقل</option>
                    <option value="name">أبجدياً: أ-ي</option>
                    <option value="deliveryTime">وقت التوصيل: الأسرع أولاً</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-6 space-x-reverse md:col-span-3">
                  <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showNewOnly} 
                      onChange={(e) => setShowNewOnly(e.target.checked)} 
                      className="rounded text-yellow-800"
                    />
                    <span className="text-gray-700 dark:text-gray-300">المطاعم الجديدة فقط</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showDiscountOnly} 
                      onChange={(e) => setShowDiscountOnly(e.target.checked)} 
                      className="rounded text-yellow-800"
                    />
                    <span className="text-gray-700 dark:text-gray-300">العروض والخصومات فقط</span>
                  </label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Restaurants grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="inline-block p-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              لا توجد مطاعم متطابقة مع بحثك
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              يرجى تعديل معايير البحث والمحاولة مرة أخرى
            </p>
            <Button 
              onClick={resetFilters} 
              variant="outline" 
              className="font-semibold"
            >
              عرض كل المطاعم
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantList;
