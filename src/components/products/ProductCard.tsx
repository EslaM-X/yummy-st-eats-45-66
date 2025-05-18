
import React from 'react';
import { ShoppingCart, Star, Heart, Award, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  
  const handleAddToCart = () => {
    toast({
      title: `${t('added')} ${product.name} ${t('toCart')}`,
      variant: "default",
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: `${product.isFavorite ? t('removedFromFavorites') : t('addedToFavorites')} ${product.name} ${product.isFavorite ? t('from') : t('to')} ${t('favorite')}`,
      variant: "default",
    });
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative animate-fade-in">
      <div className="relative overflow-hidden h-52">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Badge Overlays */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.bestseller && (
            <span className="bg-amber-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md flex items-center">
              <Award className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" /> {t('bestSellers')}
            </span>
          )}
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
              {t('new')}
            </span>
          )}
        </div>
        
        {/* Discount Badge */}
        {product.discountPercent && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md flex items-center">
            <Tag className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" /> {t('discount')} {product.discountPercent}%
          </span>
        )}
        
        {/* Add to favorite button */}
        <button 
          onClick={toggleFavorite}
          className={cn(
            "absolute bottom-3 right-3 p-2 rounded-full",
            "bg-white/90 dark:bg-gray-800/90 shadow-md backdrop-blur-sm",
            "transition-transform hover:scale-110",
            product.isFavorite ? "text-red-500" : "text-gray-500 hover:text-red-500"
          )}
        >
          <Heart 
            className="h-5 w-5" 
            fill={product.isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">{product.restaurant}</p>
          {product.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1 rtl:ml-1 rtl:mr-0" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-bold font-cairo text-gray-800 dark:text-white mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 font-cairo">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            {product.oldPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-yellow-800 dark:text-yellow-500">{product.price}</span>
                <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-yellow-800 dark:text-yellow-500">{product.price}</span>
            )}
          </div>
          
          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 py-1 px-2 rounded-full">
            {product.category}
          </span>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-yellow-700 to-yellow-800 hover:from-yellow-800 hover:to-yellow-900 text-white font-semibold shadow-md font-cairo"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          {t('addToCart')}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
