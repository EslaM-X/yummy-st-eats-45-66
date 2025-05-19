
import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, ChefHat } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

interface MobileNavigationProps {
  isOpen: boolean;
  navItems: Array<{ title: string; path: string }>;
  isActive: (path: string) => boolean;
  onItemClick: () => void;
  onLoginClick: () => void;
  onLanguageToggle: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  isOpen, 
  navItems, 
  isActive, 
  onItemClick, 
  onLoginClick, 
  onLanguageToggle 
}) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
      <nav className="flex flex-col space-y-3">
        {/* Add Food Button - Mobile */}
        <Link to="/add-food" onClick={onItemClick}>
          <Button 
            variant="outline" 
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 border-none transition-all duration-300"
          >
            <ChefHat className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
            {t('addYourFood')}
          </Button>
        </Link>
        
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
            onClick={onItemClick}
          >
            {item.title}
          </Link>
        ))}
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('language')}</span>
          <button 
            onClick={onLanguageToggle}
            className="px-3 py-1 rounded-md text-sm font-medium bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>
        <button 
          onClick={onLoginClick}
          className="mx-4 bg-yellow-800 hover:bg-yellow-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-center shadow-sm hover:shadow-md flex items-center justify-center"
        >
          <LogIn className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
          {t('login')}
        </button>
      </nav>
    </div>
  );
};

export default MobileNavigation;
