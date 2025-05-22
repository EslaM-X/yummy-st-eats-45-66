
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';

// تعريف نوع عنصر سلة التسوق
export interface CartItem extends Product {
  quantity: number;
  variant?: string;
}

// تعريف نوع سياق سلة التسوق
export interface CartContextType {
  items: CartItem[];
  cartItems: CartItem[];
  totalAmount: number;
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number | 'increase' | 'decrease') => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
}

// إنشاء سياق سلة التسوق
const CartContext = createContext<CartContextType>({
  items: [],
  cartItems: [],
  totalAmount: 0,
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  getItemQuantity: () => 0,
});

// مزود سياق سلة التسوق
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // حالة عناصر سلة التسوق
  const [items, setItems] = useState<CartItem[]>([]);

  // استرجاع عناصر سلة التسوق من التخزين المحلي عند التحميل
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // حفظ عناصر سلة التسوق في التخزين المحلي عند تغييرها
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // إضافة منتج إلى سلة التسوق
  const addToCart = (product: Product) => {
    setItems(currentItems => {
      // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // تحديث الكمية إذا كان المنتج موجودًا بالفعل
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // إضافة المنتج الجديد إلى السلة
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  // إزالة منتج من سلة التسوق
  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  // تحديث كمية منتج في سلة التسوق
  const updateQuantity = (productId: string, quantity: number | 'increase' | 'decrease') => {
    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.id === productId) {
          if (typeof quantity === 'number') {
            // إذا كانت الكمية صفر أو أقل، قم بإزالة العنصر
            if (quantity <= 0) {
              return null; // سيتم تصفيته لاحقًا
            }
            return { ...item, quantity };
          } else if (quantity === 'increase') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (quantity === 'decrease') {
            // إذا كانت الكمية الحالية واحد، قم بإزالة العنصر
            if (item.quantity <= 1) {
              return null; // سيتم تصفيته لاحقًا
            }
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      }).filter(Boolean) as CartItem[]; // تصفية العناصر المحذوفة (null)
    });
  };

  // الحصول على كمية منتج معين في السلة
  const getItemQuantity = (productId: string): number => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // مسح سلة التسوق بالكامل
  const clearCart = () => {
    setItems([]);
  };

  // حساب إجمالي عدد العناصر في السلة
  const getTotalItems = (): number => {
    return items ? items.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  // حساب إجمالي السعر في السلة
  const getTotalPrice = (): number => {
    return items ? items.reduce((total, item) => {
      const itemPrice = item.discount_price || item.price;
      return total + itemPrice * item.quantity;
    }, 0) : 0;
  };

  // حساب المبلغ الإجمالي (لاستخدامه مباشرة)
  const totalAmount = getTotalPrice();

  // القيم التي سيتم توفيرها للمكونات
  const value = {
    items,
    cartItems: items, // تعيين مباشر لدعم الاستخدام المباشر
    totalAmount, // تعيين المبلغ الإجمالي للوصول المباشر
    total: totalAmount, // نسخة إضافية للتوافق مع الاستخدامات المختلفة
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// هوك مخصص للوصول إلى سياق سلة التسوق
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
