
import React from 'react';
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
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
      <DropdownMenuContent align="center" className="min-w-[240px] max-h-[400px] overflow-y-auto p-2">
        <DropdownMenuLabel className="text-center font-semibold text-primary">
          {t('selectCountry') || 'اختر الدولة'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="py-2 px-1">
          <input 
            type="text" 
            placeholder={t('searchCountries') || 'بحث الدول...'}
            className="w-full p-2 mb-2 rounded-md border border-input text-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {countries.map((country) => (
            <DropdownMenuItem
              key={country.code}
              className={`flex items-center gap-2 cursor-pointer py-2 rounded hover:bg-primary/10 transition-all ${selectedCountry === country.code ? 'bg-primary/20' : ''}`}
              onClick={() => handleCountryChange(country.code)}
            >
              <span className="text-lg">{country.flagEmoji}</span>
              <span className="text-sm truncate">{language === 'ar' ? country.nameAr : country.name}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CountryDropdown;
