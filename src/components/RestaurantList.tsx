import React, { useState, useEffect } from 'react';
import { Restaurant } from '@/types';
import RestaurantCard from './RestaurantCard';
import { Search, Sliders, ChevronDown, X, Globe } from 'lucide-react';
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
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CountryDisplay } from '@/components/ui/country-display';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'مطعم الأصيل',
    cuisine: 'مأكولات شرقية, مشويات',
    rating: 4.5,
    deliveryTime: '25-35 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800', 
    isNew: true,
    description: 'تخصص في المأكولات الشرقية التقليدية والمشويات الطازجة مع أفضل التوابل'
  },
  {
    id: '2',
    name: 'بيتزا بلس',
    cuisine: 'بيتزا, إيطالي',
    rating: 4.2,
    deliveryTime: '30-40 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800',
    discount: '15%',
    description: 'بيتزا إيطالية أصلية بعجينة طازجة وخبز في الفرن الحجري'
  },
  {
    id: '3',
    name: 'سوشي تايم',
    cuisine: 'ياباني, سوشي',
    rating: 4.8,
    deliveryTime: '35-45 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800',
    description: 'أطباق سوشي فاخرة محضرة من قبل طهاة يابانيين محترفين'
  },
  {
    id: '4',
    name: 'برجر فاكتوري',
    cuisine: 'أمريكي, برجر',
    rating: 4.3,
    deliveryTime: '20-30 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?auto=format&fit=crop&w=800',
    discount: '10%',
    description: 'برجر لحم بقري فاخر طازج 100% مع صلصات خاصة وخبز محضر يومياً'
  },
  {
    id: '5',
    name: 'مطعم الطازج',
    cuisine: 'بحري, مأكولات بحرية',
    rating: 4.6,
    deliveryTime: '30-50 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800',
    isNew: true,
    description: 'أطباق بحرية طازجة يومياً مع توابل خاصة وطرق تحضير مميزة'
  },
];

const RestaurantList: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined);
  const [searchCountryQuery, setSearchCountryQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(mockRestaurants);
  
  // Get unique cuisines for filter
  const allCuisines = mockRestaurants
    .flatMap(restaurant => restaurant.cuisine.split(', ').map(c => c.trim()))
    .filter((cuisine, index, self) => self.indexOf(cuisine) === index && cuisine !== '');
  
  // Filter countries based on search query
  const filteredCountries = searchCountryQuery.trim() === ''
    ? countries
    : countries.filter(country => {
        const query = searchCountryQuery.toLowerCase();
        return (
          country.name.toLowerCase().includes(query) ||
          country.nameAr.toLowerCase().includes(query) ||
          country.code.toLowerCase().includes(query)
        );
      });
  
  // Apply filters when any filter changes
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
      // In a real application, restaurants would have country data. For now, we'll assume all match
      const matchesCountry = !countryFilter || true; 
      
      return matchesSearch && matchesCuisine && matchesRating && matchesNew && matchesDiscount && matchesCountry;
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
  }, [searchTerm, cuisineFilter, minRating, showNewOnly, showDiscountOnly, sortBy, isRTL, countryFilter]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setCuisineFilter('');
    setMinRating(0);
    setShowNewOnly(false);
    setShowDiscountOnly(false);
    setSortBy('recommended');
    setCountryFilter(undefined);
  };

  const ratingDisplayValue = minRating > 0 ? `${minRating}+` : t('ratingFilterAll');

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and filter bar */}
        <Card className="bg-white dark:bg-gray-800 mb-8 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 ${isRTL ? 'right-3' : 'left-3'}`} />
                <Input 
                  type="text"
                  placeholder={t('searchRestaurantPlaceholderRList')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 w-full`}
                />
              </div>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Sliders className="h-4 w-4" />
                <span>{t('filterSortButton')}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
              </Button>
              
              {(searchTerm || cuisineFilter || minRating > 0 || showNewOnly || showDiscountOnly || sortBy !== 'recommended' || countryFilter) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-gray-500"
                >
                  <X className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {t('resetFiltersButton')}
                </Button>
              )}
            </div>
            
            {showFilters && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6 border-t pt-4 border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">{t('cuisineFilterLabel')}</h3>
                  <select
                    value={cuisineFilter}
                    onChange={(e) => setCuisineFilter(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  >
                    <option value="">{t('allCuisinesOption')}</option>
                    {allCuisines.map((cuisine, index) => (
                      <option key={index} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('ratingFilterLabel')}
                  </h3>
                  <Slider
                    value={[minRating]}
                    min={0}
                    max={5}
                    step={0.5}
                    className="py-4"
                    onValueChange={(value) => setMinRating(value[0])}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">{t('sortByFilterLabel')}</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  >
                    <option value="recommended">{t('sortByOptionRecommended')}</option>
                    <option value="rating">{t('sortByOptionRating')}</option>
                    <option value="name">{t('sortByOptionName')}</option>
                    <option value="deliveryTime">{t('sortByOptionDelivery')}</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">{t('countryFilterLabel') || 'تصفية حسب الدولة'}</h3>
                  <Select
                    value={countryFilter || 'all'}
                    onValueChange={(value) => setCountryFilter(value === 'all' ? undefined : value)}
                  >
                    <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <SelectValue>
                        {countryFilter ? (
                          <CountryDisplay
                            country={countries.find(c => c.code === countryFilter)}
                            showName={true}
                          />
                        ) : (
                          <span className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>{t('allCountriesOption') || 'كل الدول'}</span>
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto bg-white dark:bg-gray-800">
                      <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-2">
                        <Input
                          placeholder={t('searchCountries')}
                          value={searchCountryQuery}
                          onChange={(e) => setSearchCountryQuery(e.target.value)}
                          className="text-black dark:text-white"
                        />
                      </div>
                      
                      <SelectItem value="all" className="text-black dark:text-white">
                        <span className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>{t('allCountriesOption') || 'كل الدول'}</span>
                        </span>
                      </SelectItem>
                      
                      {filteredCountries.map(country => (
                        <SelectItem key={country.code} value={country.code} className="text-black dark:text-white">
                          <CountryDisplay country={country} showName={true} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className={`flex items-center md:col-span-4 ${isRTL ? 'space-x-6 space-x-reverse' : 'space-x-6'}`}>
                  <label className={`flex items-center cursor-pointer ${isRTL ? 'space-x-2 space-x-reverse' : 'space-x-2'}`}>
                    <input 
                      type="checkbox" 
                      checked={showNewOnly} 
                      onChange={(e) => setShowNewOnly(e.target.checked)} 
                      className="rounded text-yellow-800 focus:ring-yellow-700"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{t('newOnlyCheckboxLabel')}</span>
                  </label>
                  
                  <label className={`flex items-center cursor-pointer ${isRTL ? 'space-x-2 space-x-reverse' : 'space-x-2'}`}>
                    <input 
                      type="checkbox" 
                      checked={showDiscountOnly} 
                      onChange={(e) => setShowDiscountOnly(e.target.checked)} 
                      className="rounded text-yellow-800 focus:ring-yellow-700"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{t('discountOnlyCheckboxLabel')}</span>
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
              {t('noRestaurantsFoundTitleRList')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('noRestaurantsFoundSubtitleRList')}
            </p>
            <Button 
              onClick={resetFilters} 
              variant="outline" 
              className="font-semibold"
            >
              {t('showAllRestaurantsButtonRList')}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantList;
