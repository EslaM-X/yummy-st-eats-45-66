
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Wallet, Menu, X, LogIn } from "lucide-react";
import { useTheme } from '@/components/theme-provider';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [cartCount, setCartCount] = useState(3); // Example cart count
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { title: "الرئيسية", path: "/" },
    { title: "المطاعم", path: "/restaurants" },
    { title: "المنتجات", path: "/products" },
    { title: "المحفظة", path: "/wallet" },
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

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" aria-label="الصفحة الرئيسية">
              <img 
                src="/lovable-uploads/b1796902-3206-4112-a199-07b14b0b76de.png" 
                alt="ST Coin Logo" 
                className="h-10 w-10 mr-3"
              />
              <h1 className="text-3xl font-bold text-yellow-800 dark:text-yellow-600">
                ST<span className="text-teal-500 ml-1">🍕 Eat</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <NavigationMenu className="mr-4">
              <NavigationMenuList className="flex space-x-6 rtl:space-x-reverse">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link to={item.path}>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md relative",
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
              className="bg-yellow-800 hover:bg-yellow-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center"
            >
              <LogIn className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
              تسجيل الدخول
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20" 
              onClick={toggleTheme}
              aria-label="تبديل الوضع المظلم"
            >
              <Moon className="h-5 w-5" />
            </Button>
            
            <Link to="/wallet">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "relative text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20",
                  isActive('/wallet') && "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500"
                )}
                aria-label="المحفظة"
              >
                <Wallet className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "relative text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20",
                  isActive('/cart') && "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500"
                )}
                aria-label="عربة التسوق"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-yellow-800 dark:hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
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
              <button 
                onClick={openLoginModal}
                className="mx-4 bg-yellow-800 hover:bg-yellow-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-center shadow-sm hover:shadow-md flex items-center justify-center"
              >
                <LogIn className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                تسجيل الدخول
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
