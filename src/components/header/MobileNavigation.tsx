
import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

interface MobileNavigationProps {
  isOpen: boolean;
  navItems: Array<{ title: string; path: string }>;
  isActive: (path: string) => boolean;
  onItemClick: () => void;
  onLanguageToggle: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  isOpen, 
  navItems, 
  isActive, 
  onItemClick, 
  onLanguageToggle 
}) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
      <nav className="flex flex-col space-y-3">
        {/* زر إضافة طعام مميز وجذاب - للموبايل */}
        <Link to="/add-food" onClick={onItemClick}>
          <Button 
            variant="outline" 
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white border-none transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden relative group"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <ChefHat className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0 animate-pulse" />
            <span className="font-bold">{t('addFood')}</span>
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
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('common:changeLanguage')}</span>
          <button 
            onClick={onLanguageToggle}
            className="px-3 py-1 rounded-md text-sm font-medium bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
