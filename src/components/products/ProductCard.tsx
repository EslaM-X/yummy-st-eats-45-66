import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, Award, Tag, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const { addToCart, cartItems } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  
  // Check if product is already in cart
  useEffect(() => {
    const isInCart = cartItems.some(item => item.id === product.id);
    setIsAddedToCart(isInCart);
  }, [cartItems, product.id]);
  
  const handleAddToCart = () => {
    if (isAddedToCart) return;
    
    setIsLoadingCart(true);
    
    // Extract the numeric price from the string (e.g., "50 ST" -> 50)
    const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    
    // Create cart item from product
    const cartItem = {
      id: product.id,
      name: product.name,
      price: numericPrice,
      quantity: 1,
      imageUrl: product.imageUrl,
      restaurant: product.restaurant
    };
    
    // Simulate API call
    setTimeout(() => {
      addToCart(cartItem);
      setIsAddedToCart(true);
      setIsLoadingCart(false);
    }, 600);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast(`${product.isFavorite ? t('removedFromFavorites') : t('addedToFavorites')} ${product.name} ${product.isFavorite ? t('from') : t('to')} ${t('favorite')}`);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative animate-fade-in">
      <div className="relative overflow-hidden h-52">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80&txt=Food+Image";
          }}
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
      </div>
    </div>
  );
};

export default ProductCard;
