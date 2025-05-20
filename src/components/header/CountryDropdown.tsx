
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CountryDropdownProps {
  selectedCountry: string;
  handleCountryChange: (code: string) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  selectedCountry,
  handleCountryChange
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCountries = searchQuery.trim() === ''
    ? countries
    : countries.filter(country => {
        const query = searchQuery.toLowerCase();
        return (
          country.name.toLowerCase().includes(query) ||
          country.nameAr.toLowerCase().includes(query) ||
          country.code.toLowerCase().includes(query)
        );
      });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex h-9 w-9 rounded-full hover:scale-110 hover:bg-primary/20 transition-all duration-300 relative"
          aria-label={t('selectCountry') || 'اختر الدولة'}
        >
          <div className="flex items-center justify-center">
            <span className="text-lg">
              {countries.find(c => c.code === selectedCountry)?.flagEmoji}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        className="w-[240px] sm:w-[280px] max-h-[60vh] overflow-y-auto p-2"
      >
        <DropdownMenuLabel className="text-center font-semibold text-primary">
          {t('selectCountry') || 'اختر الدولة'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="py-2 px-1">
          <div className="relative">
            <input 
              type="text" 
              placeholder={t('searchCountries') || 'بحث الدول...'}
              className="w-full p-1.5 sm:p-2 mb-2 rounded-md border border-input text-xs sm:text-sm pr-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-1.5 right-2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
          {filteredCountries.map((country) => (
            <DropdownMenuItem
              key={country.code}
              className={`flex items-center gap-1.5 cursor-pointer py-1.5 rounded hover:bg-primary/10 transition-all text-xs sm:text-sm ${selectedCountry === country.code ? 'bg-primary/20' : ''}`}
              onClick={() => {
                handleCountryChange(country.code);
                setSearchQuery('');
              }}
            >
              <span className="text-base sm:text-lg">{country.flagEmoji}</span>
              <span className="truncate">{language === 'ar' ? country.nameAr : country.name}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CountryDropdown;
