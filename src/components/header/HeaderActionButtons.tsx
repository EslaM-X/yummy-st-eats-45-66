
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Menu, X, Award, Globe, ChefHat } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderActionButtonsProps {
  cartCount: number;
  theme: string;
  isActive: (path: string) => boolean;
  toggleTheme: () => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({
  cartCount,
  theme,
  isActive,
  toggleTheme,
  toggleMobileMenu,
  isMobileMenuOpen
}) => {
  const { t, language, setLanguage, isRTL } = useLanguage();

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 rtl:space-x-reverse">
      {/* Add Food Button */}
      <Link to="/add-food">
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "hidden sm:flex items-center text-sm font-medium bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 border-none transition-all duration-300 shadow-md hover:shadow-lg",
            isActive('/add-food') && "bg-yellow-700"
          )}
        >
          <ChefHat className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
          {t('addYourFood')}
        </Button>
      </Link>
    
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 h-8 w-8"
            aria-label={t('language')}
          >
            <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isRTL ? "end" : "start"}>
          <DropdownMenuItem onClick={() => setLanguage('ar')} className={language === 'ar' ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}>
            العربية
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}>
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button 
        variant="ghost" 
        size="icon" 
        className="relative text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 h-8 w-8" 
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
      >
        <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      
      <Link to="/rewards">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "relative text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 h-8 w-8",
            isActive('/rewards') && "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500"
          )}
          aria-label={t('rewards')}
        >
          <Award className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </Link>
      
      <Link to="/cart">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "relative text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 h-8 w-8",
            isActive('/cart') && "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500"
          )}
          aria-label={t('cart')}
        >
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </Button>
      </Link>

      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 h-8 w-8"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default HeaderActionButtons;
