
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Country } from './country-data';
import { SelectItem } from '@/components/ui/select';
import { CountryDisplay } from './country-display';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

interface CountryListProps {
  filteredCountries: Country[];
  maxHeight?: string;
}

export const CountryList: React.FC<CountryListProps> = ({ 
  filteredCountries,
  maxHeight = "50vh"
}) => {
  const { t } = useLanguage();

  return (
    <ScrollArea className={`h-[${maxHeight}]`}>
      <div className="grid grid-cols-1 gap-1 pr-1">
        {filteredCountries.map((country) => (
          <SelectItem
            key={country.code}
            value={country.code}
            className="cursor-pointer hover:bg-primary/10 rounded-md transition-all duration-200 py-2 
                     text-black dark:text-white data-[state=checked]:bg-primary/15"
          >
            <CountryDisplay country={country} showName={true} />
          </SelectItem>
        ))}
        
        {filteredCountries.length === 0 && (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            <div className="inline-block p-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-2">
              <Search className="h-5 w-5 opacity-70" />
            </div>
            <p>{t('noCountriesFound') || 'لا توجد دول مطابقة'}</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
