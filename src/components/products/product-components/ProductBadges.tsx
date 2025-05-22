
import React from 'react';
import { Award, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductBadgesProps {
  bestseller?: boolean;
  isNew?: boolean;
  discountPercentage?: number;
}

const ProductBadges: React.FC<ProductBadgesProps> = ({
  bestseller,
  isNew,
  discountPercentage
}) => {
  const { t } = useLanguage();
  
  return (
    <>
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
      
      {discountPercentage && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md flex items-center">
          <Tag className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" /> {t('discount')} {discountPercentage}%
        </span>
      )}
    </>
  );
};

export default ProductBadges;
