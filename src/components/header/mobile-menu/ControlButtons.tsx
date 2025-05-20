
import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Globe, ShoppingCart } from "lucide-react";

interface ControlButtonsProps {
  theme: string;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  navigateToCart: () => void;
  closeMenu: () => void;
  cartItemsCount: number;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ 
  theme, 
  toggleTheme, 
  toggleLanguage, 
  navigateToCart, 
  closeMenu, 
  cartItemsCount 
}) => {
  return (
    <div className="flex gap-2 mt-3 justify-center px-1">
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleTheme}
        className="rounded-full !w-10 !h-10 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-blue-900 dark:to-yellow-900/10 border-none shadow-md hover:scale-110 transition-transform duration-300"
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5 text-blue-800" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-400" />
        )}
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleLanguage}
        className="rounded-full !w-10 !h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-950 border-none shadow-md hover:scale-110 transition-transform duration-300"
      >
        <Globe className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => {
          navigateToCart();
          closeMenu();
        }}
        className="relative rounded-full !w-10 !h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 dark:from-yellow-900 dark:to-yellow-700 border-none shadow-md hover:scale-110 transition-transform duration-300"
      >
        <ShoppingCart className="h-5 w-5 text-white" />
        {cartItemsCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-white animate-fade-in">
            {cartItemsCount}
          </span>
        )}
      </Button>
    </div>
  );
};

export default ControlButtons;
