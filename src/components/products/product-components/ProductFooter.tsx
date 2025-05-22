
import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductFooterProps {
  price: number | string;
  oldPrice?: string;
  category: string;
  isAddedToCart: boolean;
  isLoadingCart: boolean;
  handleAddToCart: () => void;
}

const ProductFooter: React.FC<ProductFooterProps> = ({
  price,
  oldPrice,
  category,
  isAddedToCart,
  isLoadingCart,
  handleAddToCart
}) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          {oldPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-yellow-800 dark:text-yellow-500">{price}</span>
              <span className="text-sm text-gray-400 line-through">{oldPrice}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-yellow-800 dark:text-yellow-500">{price}</span>
          )}
        </div>
        
        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 py-1 px-2 rounded-full">
          {category}
        </span>
      </div>
      
      <Button 
        className={cn(
          "w-full relative overflow-hidden font-semibold shadow-md font-cairo",
          isAddedToCart 
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gradient-to-r from-yellow-700 to-yellow-800 hover:from-yellow-800 hover:to-yellow-900"
        )}
        onClick={handleAddToCart}
        disabled={isLoadingCart || isAddedToCart}
      >
        <div className={cn(
          "flex items-center justify-center gap-2 w-full transition-all",
          isLoadingCart && "opacity-0"
        )}>
          {isAddedToCart ? (
            <>
              <Check className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t('added')}
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t('addToCart')}
            </>
          )}
        </div>
        
        {isLoadingCart && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
          </div>
        )}
      </Button>
    </>
  );
};

export default ProductFooter;
