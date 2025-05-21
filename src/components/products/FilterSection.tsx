
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from '@/components/ui/input';
import { Search, Globe } from 'lucide-react';
import { countries } from '@/components/ui/country-data';
import { CountryDisplay } from '@/components/ui/country-display';

interface FilterSectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  categories: string[];
  handleClearFilters: () => void;
  selectedCountry: string | undefined;
  setSelectedCountry: (country: string | undefined) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isOpen: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  handleClearFilters,
  selectedCountry,
  setSelectedCountry,
  isFiltersOpen,
  setIsFiltersOpen
}) => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const [searchCountryQuery, setSearchCountryQuery] = React.useState('');
  
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
      
  // Favorite countries (first 6)
  const favoriteCountries = countries.slice(0, 6);
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-md shadow-sm mb-4">
      {/* Filter Toggle Header */}
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition-colors"
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-sm">
            {t('filterOptions')}
          </span>
          {(selectedCategory || sortBy || selectedCountry) && (
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
              {[
                selectedCategory && '1',
                sortBy && '1',
                selectedCountry && '1'
              ].filter(Boolean).length}
            </span>
          )}
        </div>
        <div>
          {isFiltersOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </div>
      
      {/* Expandable Filter Content */}
      <div className={cn(
        "grid transition-all duration-300 ease-in-out origin-top",
        isFiltersOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="p-3 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {/* Category Filter */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                {t('categoryFilterLabel')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                <option value="">{t('allCategoriesOption')}</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Sort By Filter */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                {t('sortByFilterLabel')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                <option value="">{t('sortByOptionDefault')}</option>
                <option value="price-asc">{t('sortByOptionPriceAsc')}</option>
                <option value="price-desc">{t('sortByOptionPriceDesc')}</option>
                <option value="name-asc">{t('sortByOptionNameAsc')}</option>
              </select>
            </div>
            
            {/* Country Filter */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                {t('countryFilterLabel')}
              </label>
              <Select
                value={selectedCountry}
                onValueChange={(value) => setSelectedCountry(value === 'all' ? undefined : value)}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm h-9 py-2">
                  <SelectValue placeholder={t('allCountriesOption')}>
                    {selectedCountry ? (
                      <CountryDisplay
                        country={countries.find(c => c.code === selectedCountry)}
                        showName={true}
                      />
                    ) : (
                      <span className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>{t('allCountriesOption')}</span>
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-2">
                    <div className="relative">
                      <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        placeholder={t('searchCountries')}
                        value={searchCountryQuery}
                        onChange={(e) => setSearchCountryQuery(e.target.value)}
                        className="pl-8 pr-3 py-1 text-sm border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  </div>
                  
                  <SelectItem value="all" className="flex items-center gap-2">
                    <Globe className="h-4 w-4 flex-shrink-0" />
                    <span>{t('allCountriesOption')}</span>
                  </SelectItem>
                  
                  {/* Favorite countries */}
                  {searchCountryQuery.trim() === '' && (
                    <div className="py-1 px-2">
                      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        {t('popularCountries') || 'الدول الشائعة'}
                      </h3>
                      <div className="grid grid-cols-3 gap-1">
                        {favoriteCountries.map(country => (
                          <SelectItem
                            key={country.code}
                            value={country.code}
                            className="flex flex-col items-center justify-center p-1 h-auto"
                          >
                            <span className="text-lg mb-0.5">{country.flagEmoji}</span>
                            <span className="text-xs truncate w-full text-center">
                              {language === 'ar' ? country.nameAr : country.name}
                            </span>
                          </SelectItem>
                        ))}
                      </div>
                      <div className="my-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  )}
                  
                  <ScrollArea className="h-[200px]">
                    {filteredCountries.map(country => (
                      <SelectItem
                        key={country.code}
                        value={country.code}
                        className="flex items-center gap-2 p-1.5"
                      >
                        <CountryDisplay country={country} showName={true} />
                      </SelectItem>
                    ))}
                    
                    {filteredCountries.length === 0 && (
                      <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-sm">
                        {t('noCountriesFound') || 'لا توجد دول مطابقة'}
                      </div>
                    )}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            
            {/* Reset Button */}
            <div className="flex items-end">
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearFilters();
                }}
                variant="outline"
                size="sm"
                className="w-full text-sm h-9 border-gray-300 dark:border-gray-600 font-medium"
              >
                {t('resetFiltersButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
