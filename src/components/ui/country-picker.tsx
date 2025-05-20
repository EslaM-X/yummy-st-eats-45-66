
import React from 'react';
import { Flag } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import { countries, Country } from './country-data';
import { CountryDisplay } from './country-display';

// Re-export countries for backward compatibility
export { countries };
export type { Country };

interface CountryPickerProps {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  value,
  onValueChange,
  className,
  placeholder,
  disabled = false
}) => {
  const { language, t } = useLanguage();
  
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder || t('selectCountry')}>
          {value && (
            <CountryDisplay country={countries.find(c => c.code === value)} showName={true} />
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[300px] text-black dark:text-white">
        {countries.map((country) => (
          <SelectItem
            key={country.code}
            value={country.code}
            className="flex items-center gap-2"
          >
            <CountryDisplay country={country} showName={true} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountryPicker;
