
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthButtons } from '../auth/AuthButtons';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/components/ui/country-data';
import MobileMenu from './MobileMenu';
import CountryDropdown from './CountryDropdown';

// Create a global country state for use across components
export const useSelectedCountry = () => {
  const [globalSelectedCountry, setGlobalSelectedCountry] = useState<string>(() => {
    // Try to get from localStorage first
    const saved = localStorage.getItem('selectedCountry');
    return saved || 'sa'; // Default to Saudi Arabia if not found
  });

  // Update localStorage when the country changes
  useEffect(() => {
    localStorage.setItem('selectedCountry', globalSelectedCountry);
  }, [globalSelectedCountry]);
  
  return { selectedCountry: globalSelectedCountry, setSelectedCountry: setGlobalSelectedCountry };
};

export function HeaderActionButtons() {
  const { setTheme, theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();

  // Toggle theme (light/dark mode)
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast({
      title: newTheme === "dark" 
        ? t('darkModeEnabled') 
        : t('lightModeEnabled'),
      description: newTheme === "dark" 
        ? t('enjoyDarkMode') 
        : t('enjoyLightMode'),
      duration: 1500
    });
  };

  // Toggle language (Arabic/English)
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // Cart items count
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Navigate to cart
  const navigateToCart = () => navigate('/cart');

  // Change selected country with page reload
  const handleCountryChange = (code: string) => {
    if (code === selectedCountry) return; // Skip if same country
    
    // Apply transition effect to the whole page
    document.body.classList.add('transition-opacity', 'duration-300', 'opacity-50');
    
    // Change the country in state/localStorage
    setSelectedCountry(code);
    
    // Display toast notification for country change
    const country = countries.find(c => c.code === code);
    toast({
      title: t('countryChanged') || 'تم تغيير الدولة',
      description: language === 'ar' ? `تم التغيير إلى ${country?.nameAr}` : `Changed to ${country?.name}`,
      duration: 1500
    });
    
    // Immediate page reload to refresh content based on new country
    window.location.reload();
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('transition-all');
    root.classList.add('duration-300');
    root.classList.add('ease-in-out');
    return () => {
      root.classList.remove('transition-all');
      root.classList.remove('duration-300');
      root.classList.remove('ease-in-out');
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Mobile dropdown menu */}
      <MobileMenu 
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
        navigateToCart={navigateToCart}
        cartItemsCount={cartItemsCount}
        theme={theme}
      />

      {/* Country dropdown for large screens */}
      <CountryDropdown 
        selectedCountry={selectedCountry} 
        handleCountryChange={handleCountryChange} 
      />
      
      {/* Control buttons for large screens */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="hidden sm:flex h-9 w-9 rounded-full bg-opacity-20 hover:scale-110 hover:bg-primary/20 transition-all duration-300 relative overflow-hidden group"
        aria-label={t('toggleTheme')}
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
        aria-label={t('changeLanguage')}
      >
        <Globe className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={navigateToCart}
        className="h-9 w-9 rounded-full relative hover:scale-110 hover:bg-primary/20 transition-all duration-300"
        aria-label={t('cart')}
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
