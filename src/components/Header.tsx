
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Wallet } from "lucide-react"; // Import icons
import { useTheme } from '@/components/theme-provider';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [cartCount, setCartCount] = useState(3); // Example cart count

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/b1796902-3206-4112-a199-07b14b0b76de.png" 
                alt="ST Coin Logo" 
                className="h-10 w-10 mr-3"
              />
              <h1 className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">
                ST<span className="text-teal-500 ml-1">🍕 Eat</span>
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4 rtl:space-x-reverse">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              الرئيسية
            </Link>
            <Link to="/restaurants" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              المطاعم
            </Link>
            <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              المنتجات
            </Link>
            <Link to="/wallet" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              المحفظة
            </Link>
            <a href="#" className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              سجل الآن
            </a>
          </nav>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}
              aria-label="تبديل الوضع المظلم"
            >
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
            <Link to="/wallet">
              <Button variant="ghost" size="icon" aria-label="المحفظة">
                <Wallet className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              aria-label="عربة التسوق"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
