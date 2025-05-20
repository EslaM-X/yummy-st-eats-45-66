
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from './LanguageContext';

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  restaurant: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, action: 'increase' | 'decrease') => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { t } = useLanguage();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        const updatedItems = prevItems.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        toast({
          title: t('itemQuantityUpdated')
        });
        return updatedItems;
      } else {
        // Add new item to cart
        toast({
          title: `${t('added')} ${product.name} ${t('toCart')}`
        });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number | string) => {
    setCartItems(prevItems => {
      const filtered = prevItems.filter(item => item.id !== id);
      toast({
        title: t('itemRemovedFromCart')
      });
      return filtered;
    });
  };

  const updateQuantity = (id: number | string, action: 'increase' | 'decrease') => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          if (action === 'decrease' && item.quantity === 1) {
            return item;
          }
          return {
            ...item,
            quantity: action === 'increase' ? item.quantity + 1 : item.quantity - 1
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: t('cartCleared')
    });
  };

  // Calculate total items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
