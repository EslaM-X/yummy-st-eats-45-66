
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Sun, Globe, Menu } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { AuthButtons } from '../auth/AuthButtons';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function HeaderActionButtons() {
  const { setTheme, theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // تطبيق التأثير المرئي عند تغيير الوضع - تصحيح طريقة إضافة الفئات
  useEffect(() => {
    const root = document.documentElement;
    
    // إضافة كل فئة على حدة بشكل صحيح
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

  // قائمة الروابط للتنقل
  const navigationLinks = [
    { title: t('navigation:home'), path: "/" },
    { title: t('navigation:restaurants'), path: "/restaurants" },
    { title: t('navigation:products'), path: "/products" },
    { title: t('navigation:rewards'), path: "/rewards" },
    { title: t('navigation:addFood'), path: "/add-food" },
    { title: t('navigation:team'), path: "/team" },
    { title: t('navigation:privacyPolicy'), path: "/privacy-policy" },
    { title: t('navigation:termsConditions'), path: "/terms-conditions" },
    { title: t('navigation:cookiePolicy'), path: "/cookie-policy" },
  ];

  // قائمة منسدلة للهاتف المحمول
  const MobileMenu = () => (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden h-9 w-9 rounded-full hover:bg-primary/20 transition-all duration-300"
          aria-label={t('navigation:menu')}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={language === 'ar' ? "end" : "start"}
        className="w-56 mt-2 bg-background border-border"
      >
        <DropdownMenuLabel className="text-center">
          {t('navigation:menu')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {navigationLinks.map((link) => (
          <DropdownMenuItem 
            key={link.path} 
            className="cursor-pointer" 
            onClick={() => {
              navigate(link.path);
              setIsMenuOpen(false);
            }}
          >
            {link.title}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer flex items-center justify-between" 
          onClick={toggleTheme}
        >
          {t('common:theme')}
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer" 
          onClick={toggleLanguage}
        >
          {language === 'ar' ? 'English' : 'العربية'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex items-center gap-2">
      {/* القائمة المنسدلة للأجهزة المحمولة */}
      <MobileMenu />
      
      {/* أزرار التبديل للشاشات الكبيرة */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme} 
        className="hidden sm:flex h-9 w-9 rounded-full bg-opacity-20 hover:scale-110 hover:bg-primary/20 transition-all duration-300 relative overflow-hidden group"
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
        className="hidden sm:flex h-9 w-9 rounded-full hover:scale-110 hover:bg-primary/20 transition-all duration-300"
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
