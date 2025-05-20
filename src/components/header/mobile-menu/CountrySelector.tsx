
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Flag } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-picker';

interface CountrySelectorProps {
  selectedCountry: string;
  handleCountryChange: (code: string) => void;
  countryMenuOpen: boolean;
  setCountryMenuOpen: (open: boolean) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  handleCountryChange,
  countryMenuOpen,
  setCountryMenuOpen
}) => {
  const { t, language } = useLanguage();
  const [countrySearchQuery, setCountrySearchQuery] = React.useState('');

  const filteredCountries = countrySearchQuery.trim() === ''
    ? countries
    : countries.filter(country => {
        const query = countrySearchQuery.toLowerCase();
        return (
          country.name.toLowerCase().includes(query) ||
          country.nameAr.toLowerCase().includes(query) ||
          country.code.toLowerCase().includes(query)
        );
      });

  return (
    <div className="px-3 py-2 mb-2">
      <div className="flex justify-center flex-wrap">
        {countries.slice(0, 6).map((country) => (
          <Button
            key={country.code}
            variant="ghost"
            size="icon"
            className={`rounded-full w-7 h-7 mx-0.5 ${selectedCountry === country.code ? 'bg-primary/20 ring-2 ring-primary' : ''}`}
            onClick={() => handleCountryChange(country.code)}
          >
            <span className="text-base">{country.flagEmoji}</span>
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-7 h-7 mx-0.5"
          onClick={() => setCountryMenuOpen(!countryMenuOpen)}
        >
          <Flag className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      {/* Detailed country list */}
      {countryMenuOpen && (
        <div className="mt-2 animate-fade-in">
          <div className="relative mb-2">
            <input 
              type="text" 
              placeholder={t('searchCountries') || 'بحث الدول...'}
              className="w-full p-1.5 rounded-md border border-input text-xs pr-6 text-black dark:text-white"
              value={countrySearchQuery}
              onChange={(e) => setCountrySearchQuery(e.target.value)}
            />
            <Search className="absolute top-1.5 right-2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          <div className="grid grid-cols-5 gap-1 max-h-[150px] overflow-y-auto">
            {filteredCountries.map((country) => (
              <Button
                key={country.code}
                variant="ghost"
                size="icon"
                className={`rounded-full w-7 h-7 ${selectedCountry === country.code ? 'bg-primary/20 ring-2 ring-primary' : ''}`}
                onClick={() => handleCountryChange(country.code)}
                title={language === 'ar' ? country.nameAr : country.name}
              >
                <span className="text-base">{country.flagEmoji}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
