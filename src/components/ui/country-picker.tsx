
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

export interface Country {
  code: string;
  name: string;
  nameAr: string;
  flagEmoji?: string;
}

// قائمة الدول المدعومة مع أعلامها
export const countries: Country[] = [
  { code: 'sa', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', flagEmoji: '🇸🇦' },
  { code: 'ae', name: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة', flagEmoji: '🇦🇪' },
  { code: 'kw', name: 'Kuwait', nameAr: 'الكويت', flagEmoji: '🇰🇼' },
  { code: 'qa', name: 'Qatar', nameAr: 'قطر', flagEmoji: '🇶🇦' },
  { code: 'bh', name: 'Bahrain', nameAr: 'البحرين', flagEmoji: '🇧🇭' },
  { code: 'om', name: 'Oman', nameAr: 'عمان', flagEmoji: '🇴🇲' },
  { code: 'eg', name: 'Egypt', nameAr: 'مصر', flagEmoji: '🇪🇬' },
  { code: 'jo', name: 'Jordan', nameAr: 'الأردن', flagEmoji: '🇯🇴' },
];

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
          {value ? (
            <div className="flex items-center gap-2">
              <span className="text-lg">{countries.find(c => c.code === value)?.flagEmoji}</span>
              <span>
                {language === 'ar'
                  ? countries.find(c => c.code === value)?.nameAr
                  : countries.find(c => c.code === value)?.name
                }
              </span>
            </div>
          ) : null}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem
            key={country.code}
            value={country.code}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{country.flagEmoji}</span>
              <span>{language === 'ar' ? country.nameAr : country.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountryPicker;
