
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import refactored components
import MobileMenuHeader from './mobile-menu/MobileMenuHeader';
import CountrySelector from './mobile-menu/CountrySelector';
import NavigationLinks from './mobile-menu/NavigationLinks';
import ControlButtons from './mobile-menu/ControlButtons';

interface MobileMenuProps {
  selectedCountry: string;
  handleCountryChange: (code: string) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  navigateToCart: () => void;
  cartItemsCount: number;
  theme: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  selectedCountry,
  handleCountryChange,
  toggleTheme,
  toggleLanguage,
  navigateToCart,
  cartItemsCount,
  theme
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-300 ring-1 ring-primary/10 shadow-md bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-blue-900/60 dark:to-blue-800/20 dark:ring-0"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5 text-yellow-700 dark:text-yellow-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={language === 'ar' ? "end" : "start"}
        className="w-[96vw] max-w-[320px] rounded-2xl p-1.5 mt-2 bg-white/95 dark:bg-gray-900/95 border-none shadow-2xl ring-2 ring-primary/10 animate-scale-in z-[1000]"
        sideOffset={8}
      >
        <div className="flex flex-col gap-0.5">
          {/* Mini header */}
          <MobileMenuHeader />

          {/* Country selection */}
          <CountrySelector 
            selectedCountry={selectedCountry}
            handleCountryChange={handleCountryChange}
            countryMenuOpen={countryMenuOpen}
            setCountryMenuOpen={setCountryMenuOpen}
          />

          {/* Main menu items */}
          <NavigationLinks closeMenu={closeMenu} />

          {/* Control buttons: theme, language, cart */}
          <ControlButtons 
            theme={theme}
            toggleTheme={toggleTheme}
            toggleLanguage={toggleLanguage}
            navigateToCart={navigateToCart}
            closeMenu={closeMenu}
            cartItemsCount={cartItemsCount}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
