
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';

// تعريف نوع عنصر سلة التسوق
export interface CartItem extends Product {
  quantity: number;
}

// تعريف نوع سياق سلة التسوق
export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
}

// إنشاء سياق سلة التسوق
const CartContext = createContext<CartContextType>({
  items: [],
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
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        // تقليل الكمية إذا كان هناك أكثر من واحد
        return currentItems.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        // إزالة المنتج بالكامل إذا كانت الكمية واحدة
        return currentItems.filter(item => item.id !== productId);
      }
    });
  };

  // تحديث كمية منتج في سلة التسوق
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      // إزالة المنتج إذا كانت الكمية صفر أو أقل
      setItems(currentItems => currentItems.filter(item => item.id !== productId));
    } else {
      // تحديث الكمية
      setItems(currentItems => 
        currentItems.map(item => 
          item.id === productId 
            ? { ...item, quantity } 
            : item
        )
      );
    }
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
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // حساب إجمالي السعر في السلة
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const itemPrice = item.discount_price || item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  // القيم التي سيتم توفيرها للمكونات
  const value = {
    items,
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
