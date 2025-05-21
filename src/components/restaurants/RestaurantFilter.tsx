
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-data';
import { CountryDisplay } from '@/components/ui/country-display';
import { Search, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RestaurantFilterProps {
  cuisineFilter: string;
  setCuisineFilter: (cuisine: string) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  showNewOnly: boolean;
  setShowNewOnly: (show: boolean) => void;
  showDiscountOnly: boolean;
  setShowDiscountOnly: (show: boolean) => void;
  countryFilter: string | undefined;
  setCountryFilter: (country: string | undefined) => void;
  allCuisines: string[];
  globalSelectedCountry: string | undefined;
}

const RestaurantFilter: React.FC<RestaurantFilterProps> = ({
  cuisineFilter,
  setCuisineFilter,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  showNewOnly,
  setShowNewOnly,
  showDiscountOnly,
  setShowDiscountOnly,
  countryFilter,
  setCountryFilter,
  allCuisines,
  globalSelectedCountry
}) => {
  const { t, isRTL, language } = useLanguage();
  const [searchCountryQuery, setSearchCountryQuery] = useState('');
  
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
  
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6 border-t pt-4 border-gray-200 dark:border-gray-700">
      {/* Cuisine Filter */}
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
      
      {/* Rating Filter */}
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
      
      {/* Sort By Filter */}
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
      
      {/* Country Filter */}
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
                  <span>
                    {globalSelectedCountry ? (
                      <CountryDisplay 
                        country={countries.find(c => c.code === globalSelectedCountry)} 
                        showName={true}
                      />
                    ) : (
                      t('allCountriesOption') || 'كل الدول'
                    )}
                  </span>
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
      
      {/* Checkboxes */}
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
  );
};

export default RestaurantFilter;
