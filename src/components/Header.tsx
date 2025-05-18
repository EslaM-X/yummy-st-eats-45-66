
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Wallet, Menu, X, LogIn, Award, Globe } from "lucide-react";
import { useTheme } from '@/components/theme-provider';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [cartCount, setCartCount] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: t('home'), path: "/" },
    { title: t('restaurants'), path: "/restaurants" },
    { title: t('products'), path: "/products" },
    { title: t('rewards'), path: "/rewards" },
    { title: t('wallet'), path: "/wallet" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" aria-label={t('home')}>
              <img 
                src="/lovable-uploads/5483091a-e5bd-4397-9e86-24fb0ce87243.png" 
                alt="ST Pizza Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 mr-2 rtl:mr-0 rtl:ml-2"
              />
              <h1 className="text-xl sm:text-3xl font-bold font-cairo text-yellow-800 dark:text-yellow-600">
                ST<span className="text-teal-500 ml-1 rtl:mr-1 rtl:ml-0">🍕 Eat</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6 rtl:space-x-reverse">
            <NavigationMenu className="mr-2 lg:mr-4 rtl:mr-0 rtl:ml-2 lg:rtl:ml-4">
              <NavigationMenuList className="flex space-x-2 lg:space-x-6 rtl:space-x-reverse">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link to={item.path}>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-xs lg:text-sm font-medium transition-all duration-200 rounded-md relative px-2 py-1 lg:px-3 lg:py-2",
                          isActive(item.path) 
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500" 
                            : "text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                        )}
                      >
                        {item.title}
                        {isActive(item.path) && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-700 dark:bg-yellow-500 rounded-full"></span>
                        )}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <button 
              onClick={openLoginModal} 
              className="bg-yellow-800 hover:bg-yellow-900 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-md text-xs lg:text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center whitespace-nowrap"
            >
              <LogIn className="h-3 w-3 lg:h-4 lg:w-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {t('login')}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 rtl:space-x-reverse">
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
            
            <Link to="/wallet">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "relative text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 h-8 w-8",
                  isActive('/wallet') && "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500"
                )}
                aria-label={t('wallet')}
              >
                <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
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
              aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive(item.path) 
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500" 
                      : "text-gray-600 dark:text-gray-300 hover:bg-yellow-50 hover:text-yellow-800 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-500"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('language')}</span>
                <button 
                  onClick={toggleLanguage}
                  className="px-3 py-1 rounded-md text-sm font-medium bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                >
                  {language === 'ar' ? 'English' : 'العربية'}
                </button>
              </div>
              <button 
                onClick={openLoginModal}
                className="mx-4 bg-yellow-800 hover:bg-yellow-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-center shadow-sm hover:shadow-md flex items-center justify-center"
              >
                <LogIn className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                {t('login')}
              </button>
            </nav>
          </div>
        )}
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
