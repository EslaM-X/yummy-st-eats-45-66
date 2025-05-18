
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    toast.success(`تمت إضافة ${product.name} إلى سلة التسوق`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">من: {product.restaurant}</p>
        <p className="text-lg font-bold text-yellow-800 dark:text-yellow-500 mb-4">{product.price}</p>
        <Button 
          className="w-full bg-yellow-800 hover:bg-yellow-900 text-white font-semibold flex items-center justify-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          أضف للسلة
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
