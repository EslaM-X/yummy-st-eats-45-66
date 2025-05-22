import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/formatters';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showAddToCart = true,
  className 
}) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const quantity = getItemQuantity(product.id);
  
  // تحديد ما إذا كان المنتج متاحًا
  const isAvailable = product.available !== false;
  
  // تنسيق السعر بناءً على وجود خصم
  const formattedPrice = formatPrice(product.price);
  const formattedDiscountPrice = product.discount_price 
    ? formatPrice(product.discount_price)
    : null;
  
  // تحديد نسبة الخصم إذا كان هناك سعر خصم
  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : null;
  
  // معالجة النقر على المنتج للانتقال إلى صفحة التفاصيل
  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  // معالجة إضافة المنتج إلى السلة
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // منع انتشار الحدث إلى البطاقة
    
    if (!isAvailable) {
      toast({
        title: language === 'ar' ? "غير متوفر" : "Not Available",
        description: language === 'ar' 
          ? "هذا المنتج غير متوفر حاليًا"
          : "This product is currently unavailable",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product);
    toast({
      title: language === 'ar' ? "تمت الإضافة إلى السلة" : "Added to Cart",
      description: language === 'ar' 
        ? `تمت إضافة ${product.name} إلى سلة التسوق`
        : `${product.name} has been added to your cart`,
    });
  };
  
  // معالجة إزالة المنتج من السلة
  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // منع انتشار الحدث إلى البطاقة
    removeFromCart(product.id);
  };
  
  // معالجة تبديل حالة المفضلة
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // منع انتشار الحدث إلى البطاقة
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite 
        ? (language === 'ar' ? "تمت الإزالة من المفضلة" : "Removed from Favorites")
        : (language === 'ar' ? "تمت الإضافة إلى المفضلة" : "Added to Favorites"),
      description: isFavorite
        ? (language === 'ar' ? `تمت إزالة ${product.name} من المفضلة` : `${product.name} has been removed from your favorites`)
        : (language === 'ar' ? `تمت إضافة ${product.name} إلى المفضلة` : `${product.name} has been added to your favorites`),
    });
  };
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer",
        !isAvailable && "opacity-70",
        className
      )}
      onClick={handleProductClick}
    >
      <div className="relative aspect-square overflow-hidden">
        {/* صورة المنتج */}
        <img 
          src={product.image || '/placeholder-food.jpg'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* شارة الخصم */}
        {discountPercentage && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {language === 'ar' ? `${discountPercentage}% خصم` : `${discountPercentage}% OFF`}
          </Badge>
        )}
        
        {/* شارة غير متوفر */}
        {!isAvailable && (
          <Badge className="absolute top-2 right-2 bg-gray-500 hover:bg-gray-600">
            {language === 'ar' ? "غير متوفر" : "Unavailable"}
          </Badge>
        )}
        
        {/* زر المفضلة */}
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white",
            isFavorite && "text-red-500 hover:text-red-600"
          )}
          onClick={handleToggleFavorite}
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
          {product.description || (language === 'ar' ? "لا يوجد وصف متاح" : "No description available")}
        </p>
        
        <div className="flex items-center gap-2">
          {formattedDiscountPrice ? (
            <>
              <span className="font-bold text-primary">{formattedDiscountPrice}</span>
              <span className="text-muted-foreground text-sm line-through">{formattedPrice}</span>
            </>
          ) : (
            <span className="font-bold text-primary">{formattedPrice}</span>
          )}
        </div>
      </CardContent>
      
      {showAddToCart && (
        <CardFooter className="p-4 pt-0">
          {quantity > 0 ? (
            <div className="flex items-center justify-between w-full">
              <Button
                size="icon"
                variant="outline"
                onClick={handleRemoveFromCart}
                disabled={!isAvailable}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="font-medium">{quantity}</span>
              
              <Button
                size="icon"
                variant="outline"
                onClick={handleAddToCart}
                disabled={!isAvailable}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full" 
              onClick={handleAddToCart}
              disabled={!isAvailable}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {language === 'ar' ? "أضف إلى السلة" : "Add to Cart"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
