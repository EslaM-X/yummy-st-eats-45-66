
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="relative flex-grow">
      <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
      <Input 
        type="text"
        placeholder={t('searchProductsPlaceholder')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`${isRTL ? 'pr-10' : 'pl-10'} w-full`}
      />
    </div>
  );
};

export default SearchBar;
