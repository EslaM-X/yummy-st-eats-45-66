
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

interface DesktopNavigationProps {
  navItems: Array<{ title: string; path: string }>;
  isActive: (path: string) => boolean;
  openLoginModal: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ 
  navItems, 
  isActive, 
  openLoginModal 
}) => {
  const { t, isRTL } = useLanguage();

  return (
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
  );
};

export default DesktopNavigation;
