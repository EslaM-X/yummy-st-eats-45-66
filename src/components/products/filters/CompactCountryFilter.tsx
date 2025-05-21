
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-data';
import { CountryDisplay } from '@/components/ui/country-display';
import { Globe } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface CompactCountryFilterProps {
  selectedCountry: string | undefined;
  setSelectedCountry: (country: string | undefined) => void;
}

const CompactCountryFilter: React.FC<CompactCountryFilterProps> = ({
  selectedCountry,
  setSelectedCountry
}) => {
  const { t, language } = useLanguage();
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
  
  // تحديد عدد أقل من الدول المفضلة (4 بدلاً من 6) لجعلها أكثر ملاءمة للمساحات الصغيرة
  const favoriteCountries = countries.slice(0, 4);
  
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
        {t('countryFilterLabel')}
      </label>
      <Select
        value={selectedCountry}
        onValueChange={(value) => setSelectedCountry(value === 'all' ? undefined : value)}
      >
        <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm h-8 py-1">
          <SelectValue placeholder={t('allCountriesOption')}>
            {selectedCountry ? (
              <CountryDisplay
                country={countries.find(c => c.code === selectedCountry)}
                showName={true}
              />
            ) : (
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                <span className="truncate">{t('allCountriesOption')}</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[250px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-2">
          <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 pb-2">
            <div className="relative">
              <Search className="absolute top-2 left-2 h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder={t('searchCountries')}
                value={searchCountryQuery}
                onChange={(e) => setSearchCountryQuery(e.target.value)}
                className="pl-7 pr-2 py-1 text-xs h-7 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
          
          <SelectItem value="all" className="flex items-center gap-2 text-xs p-1">
            <Globe className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{t('allCountriesOption')}</span>
          </SelectItem>
          
          {/* عرض الدول المفضلة بنمط شبكي أكثر اختصاراً */}
          {searchCountryQuery.trim() === '' && (
            <div className="pt-1 pb-2">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 px-1">
                {t('popularCountries')}
              </h3>
              <div className="grid grid-cols-4 gap-1">
                {favoriteCountries.map(country => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="flex flex-col items-center justify-center p-0.5 h-auto"
                  >
                    <span className="text-base mb-0.5">{country.flagEmoji}</span>
                    <span className="text-xs truncate w-full text-center">
                      {language === 'ar' ? country.nameAr : country.name}
                    </span>
                  </SelectItem>
                ))}
              </div>
              <div className="my-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>
          )}
          
          <ScrollArea className="h-[150px]">
            {filteredCountries.map(country => (
              <SelectItem
                key={country.code}
                value={country.code}
                className="flex items-center gap-1.5 p-1 text-xs"
              >
                <CountryDisplay country={country} showName={true} />
              </SelectItem>
            ))}
            
            {filteredCountries.length === 0 && (
              <div className="py-2 text-center text-gray-500 dark:text-gray-400 text-xs">
                {t('noCountriesFound')}
              </div>
            )}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompactCountryFilter;
