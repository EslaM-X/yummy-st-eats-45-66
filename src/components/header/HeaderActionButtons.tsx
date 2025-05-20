
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { AuthButtons } from '../auth/AuthButtons';
import { useToast } from '@/hooks/use-toast';

export function HeaderActionButtons() {
  const { setTheme, theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // إظهار رسالة توست عند تغيير الوضع
    toast({
      title: newTheme === "dark" 
        ? t('common:darkModeEnabled') 
        : t('common:lightModeEnabled'),
      description: newTheme === "dark" 
        ? t('common:enjoyDarkMode') 
        : t('common:enjoyLightMode'),
      duration: 1500
    });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // تطبيق التأثير المرئي عند تغيير الوضع - تم تصحيح طريقة إضافة الفئات
  useEffect(() => {
    const root = document.documentElement;
    
    // إضافة كل فئة على حدة بدلاً من سلسلة واحدة
    root.classList.add('transition-all');
    root.classList.add('duration-300');
    root.classList.add('ease-in-out');
    
    return () => {
      // إزالة كل فئة على حدة عند التنظيف
      root.classList.remove('transition-all');
      root.classList.remove('duration-300');
      root.classList.remove('ease-in-out');
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme} 
        className="h-9 w-9 rounded-full bg-opacity-20 hover:scale-110 hover:bg-primary/20 transition-all duration-300 relative overflow-hidden group"
        aria-label={t('common:toggleTheme')}
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5 absolute transform transition-transform duration-300 ease-in-out z-10" />
        ) : (
          <Sun className="h-5 w-5 absolute transform transition-transform duration-300 ease-in-out z-10" />
        )}
        <span className="absolute inset-0 bg-gradient-to-tr from-yellow-300 to-yellow-500 dark:from-blue-800 dark:to-indigo-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleLanguage}
        className="h-9 w-9 rounded-full hover:scale-110 hover:bg-primary/20 transition-all duration-300"
        aria-label={t('common:changeLanguage')}
      >
        <Globe className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/cart')}
        className="h-9 w-9 rounded-full relative hover:scale-110 hover:bg-primary/20 transition-all duration-300"
        aria-label={t('common:cart')}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartItemsCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-primary text-[11px] font-medium flex items-center justify-center text-primary-foreground animate-fade-in">
            {cartItemsCount}
          </span>
        )}
      </Button>
      
      <AuthButtons />
    </div>
  );
}

export default HeaderActionButtons;
