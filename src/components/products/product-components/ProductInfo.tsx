
import React from 'react';
import { Star } from 'lucide-react';

interface ProductInfoProps {
  name?: string;
  description?: string;
  restaurant: string;
  rating?: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  description,
  restaurant,
  rating
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">{restaurant}</p>
        {rating && (
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1 rtl:ml-1 rtl:mr-0" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-bold font-cairo text-gray-800 dark:text-white mb-1">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 font-cairo">{description}</p>
    </>
  );
};

export default ProductInfo;
