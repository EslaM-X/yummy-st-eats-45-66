
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import ProductImage from './product-components/ProductImage';
import ProductBadges from './product-components/ProductBadges';
import ProductFooter from './product-components/ProductFooter';
import ProductInfo from './product-components/ProductInfo';

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
    
    // Handle price conversion properly
    let numericPrice: number;
    
    // تعامل مع السعر بغض النظر عن نوعه (نص أو رقم)
    const priceValue = product.price;
    if (typeof priceValue === 'string') {
      numericPrice = parseFloat(priceValue.replace(/[^\d.]/g, ''));
    } else if (typeof priceValue === 'number') {
      numericPrice = priceValue;
    } else {
      // Fallback for unexpected types
      numericPrice = 0;
      console.error('Unexpected price type:', typeof priceValue);
    }
    
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
      <ProductImage 
        imageUrl={product.imageUrl} 
        name={product.name} 
        country={product.country} 
        isFavorite={product.isFavorite} 
        toggleFavorite={toggleFavorite}
        discountPercentage={product.discountPercentage}
        bestseller={product.bestseller}
        isNew={product.isNew}
      />
      
      <div className="p-4">
        <ProductInfo 
          name={product.name} 
          description={product.description} 
          restaurant={product.restaurant}
          rating={product.rating}
        />
        
        <ProductFooter
          price={product.price}
          oldPrice={product.oldPrice}
          category={product.category}
          isAddedToCart={isAddedToCart}
          isLoadingCart={isLoadingCart}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductCard;
