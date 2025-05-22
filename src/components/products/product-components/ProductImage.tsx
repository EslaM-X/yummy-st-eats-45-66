
import React from 'react';
import { Heart, Award, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries } from '@/components/ui/country-picker';

interface ProductImageProps {
  imageUrl: string;
  name: string;
  country?: string;
  isFavorite?: boolean;
  toggleFavorite: (e: React.MouseEvent) => void;
  discountPercentage?: number;
  bestseller?: boolean;
  isNew?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  name,
  country,
  isFavorite,
  toggleFavorite,
  discountPercentage,
  bestseller,
  isNew
}) => {
  const { t } = useLanguage();
  
  // Get country info
  const countryInfo = country ? countries.find(c => c.code === country) : null;

  return (
    <div className="relative overflow-hidden h-52">
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80&txt=Food+Image";
        }}
      />
      
      {/* Badge Overlays */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        {bestseller && (
          <span className="bg-amber-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md flex items-center">
            <Award className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" /> {t('bestSellers')}
          </span>
        )}
        {isNew && (
          <span className="bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
            {t('new')}
          </span>
        )}
      </div>
      
      {/* Discount Badge */}
      {discountPercentage && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md flex items-center">
          <Tag className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" /> {t('discount')} {discountPercentage}%
        </span>
      )}
      
      {/* Country flag - Enhanced styling */}
      {countryInfo && (
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-white/90 to-white/80 dark:from-black/70 dark:to-black/60 p-1.5 backdrop-blur-sm rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 border border-yellow-500/20 dark:border-blue-500/30">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <span 
              className="text-lg filter drop-shadow-sm" 
              title={t('language') === 'ar' ? countryInfo.nameAr : countryInfo.name}
            >
              {countryInfo.flagEmoji}
            </span>
          </div>
        </div>
      )}
      
      {/* Add to favorite button */}
      <button 
        onClick={toggleFavorite}
        className={cn(
          "absolute bottom-3 right-3 p-2 rounded-full",
          "bg-white/90 dark:bg-gray-800/90 shadow-md backdrop-blur-sm",
          "transition-transform hover:scale-110",
          isFavorite ? "text-red-500" : "text-gray-500 hover:text-red-500"
        )}
      >
        <Heart 
          className="h-5 w-5" 
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
};

export default ProductImage;
