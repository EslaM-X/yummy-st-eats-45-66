
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { AuthButtons } from '../auth/AuthButtons';

export function HeaderActionButtons() {
  const { setTheme, theme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme} 
        className="h-9 w-9"
        aria-label={language === 'ar' ? 'تبديل وضع السمة' : 'Toggle theme'}
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleLanguage}
        className="h-9 w-9"
        aria-label={language === 'ar' ? 'تغيير اللغة' : 'Change language'}
      >
        <Globe className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/cart')}
        className="h-9 w-9 relative"
        aria-label={language === 'ar' ? 'عربة التسوق' : 'Shopping cart'}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartItemsCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-primary text-[11px] font-medium flex items-center justify-center text-primary-foreground">
            {cartItemsCount}
          </span>
        )}
      </Button>
      
      <AuthButtons />
    </div>
  );
}

export default HeaderActionButtons;
