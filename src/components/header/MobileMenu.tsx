
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Home, UtensilsCrossed, ShoppingBag, Gift, Flag, Users, ShieldCheck, FileText, Cookie, Moon, Sun, Globe, ShoppingCart, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { countries } from '@/components/ui/country-picker';

// Define navigation icons
const navIcons: { [key: string]: React.ReactNode } = {
  home: <Home className="h-4 w-4 mr-2" />,
  restaurants: <UtensilsCrossed className="h-4 w-4 mr-2" />,
  products: <ShoppingBag className="h-4 w-4 mr-2" />,
  rewards: <Gift className="h-4 w-4 mr-2" />,
  addFood: <UtensilsCrossed className="h-4 w-4 mr-2" />,
  team: <Users className="h-4 w-4 mr-2" />,
  privacyPolicy: <ShieldCheck className="h-4 w-4 mr-2" />,
  termsConditions: <FileText className="h-4 w-4 mr-2" />,
  cookiePolicy: <Cookie className="h-4 w-4 mr-2" />,
};

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
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');

  // Navigation links
  const navigationLinks = [
    { key: "home", title: t('home'), path: "/" },
    { key: "restaurants", title: t('restaurants'), path: "/restaurants" },
    { key: "products", title: t('products'), path: "/products" },
    { key: "rewards", title: t('rewards'), path: "/rewards" },
    { key: "addFood", title: t('addFood'), path: "/add-food" },
    { key: "team", title: t('team'), path: "/team" },
    { key: "privacyPolicy", title: t('privacyPolicy'), path: "/privacy-policy" },
    { key: "termsConditions", title: t('termsConditions'), path: "/terms-conditions" },
    { key: "cookiePolicy", title: t('cookiePolicy'), path: "/cookie-policy" },
  ];

  const filteredCountries = countrySearchQuery.trim() === ''
    ? countries
    : countries.filter(country => {
        const query = countrySearchQuery.toLowerCase();
        return (
          country.name.toLowerCase().includes(query) ||
          country.nameAr.toLowerCase().includes(query) ||
          country.code.toLowerCase().includes(query)
        );
      });

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-300 ring-1 ring-primary/10 shadow-md bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-blue-900/60 dark:to-blue-800/20 dark:ring-0"
          aria-label={t('menu')}
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
          <div className="w-full pb-1 mb-1 border-b border-yellow-100 dark:border-gray-800 flex items-center justify-center">
            <span className="text-lg font-extrabold tracking-widest text-yellow-600 dark:text-yellow-300 flex items-center gap-2 animate-fade-in">
              <Menu className="h-5 w-5 inline-block" />
              <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse inline-block"></span>
            </span>
          </div>

          {/* Country selection */}
          <div className="px-3 py-2 mb-2">
            <div className="flex justify-center flex-wrap">
              {countries.slice(0, 6).map((country) => (
                <Button
                  key={country.code}
                  variant="ghost"
                  size="icon"
                  className={`rounded-full w-7 h-7 mx-0.5 ${selectedCountry === country.code ? 'bg-primary/20 ring-2 ring-primary' : ''}`}
                  onClick={() => handleCountryChange(country.code)}
                >
                  <span className="text-base">{country.flagEmoji}</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-7 h-7 mx-0.5"
                onClick={() => setCountryMenuOpen(!countryMenuOpen)}
              >
                <Flag className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            {/* Detailed country list */}
            {countryMenuOpen && (
              <div className="mt-2 animate-fade-in">
                <div className="relative mb-2">
                  <input 
                    type="text" 
                    placeholder={t('searchCountries') || 'بحث الدول...'}
                    className="w-full p-1.5 rounded-md border border-input text-xs pr-6 text-black dark:text-white"
                    value={countrySearchQuery}
                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                  />
                  <Search className="absolute top-1.5 right-2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                <div className="grid grid-cols-5 gap-1 max-h-[150px] overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <Button
                      key={country.code}
                      variant="ghost"
                      size="icon"
                      className={`rounded-full w-7 h-7 ${selectedCountry === country.code ? 'bg-primary/20 ring-2 ring-primary' : ''}`}
                      onClick={() => handleCountryChange(country.code)}
                      title={language === 'ar' ? country.nameAr : country.name}
                    >
                      <span className="text-base">{country.flagEmoji}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main menu items */}
          <div className="flex flex-col gap-1">
            {navigationLinks.map(link => (
              <DropdownMenuItem
                key={link.path}
                className={`
                  group cursor-pointer flex items-center gap-2 rounded-lg px-3 py-2
                  font-semibold transition-all duration-150 ease-in-out shadow-none relative
                  focus:bg-yellow-50 focus:text-yellow-900 dark:focus:bg-yellow-900/20 dark:focus:text-yellow-100
                  hover:scale-[1.03] hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-amber-500/80 hover:text-white dark:hover:from-yellow-700 dark:hover:to-yellow-900/80 dark:hover:text-yellow-100
                  active:scale-[1.01] active:ring-2 active:ring-yellow-400
                  ${link.key === "addFood" ? "bg-gradient-to-tr from-yellow-300 via-yellow-200 to-amber-200 dark:from-yellow-700 dark:to-yellow-900/60 text-amber-700 dark:text-yellow-200 font-bold scale-[1.04] shadow hover:scale-[1.07] my-[3px]" : ""}
                `}
                onClick={() => {
                  navigate(link.path);
                  setIsMenuOpen(false);
                }}
                style={{ fontWeight: link.key === "addFood" ? 700 : undefined }}
              >
                <span className="flex items-center justify-center bg-yellow-50 dark:bg-yellow-800 rounded-full p-1.5 group-hover:bg-white/20 transition-all duration-200 shadow ring-1 ring-yellow-200 dark:ring-yellow-900">
                  {navIcons[link.key] ?? <span className="h-4 w-4 mr-2"></span>}
                </span>
                <span className="text-base font-cairo truncate">{link.title}</span>
              </DropdownMenuItem>
            ))}
          </div>

          {/* Control buttons: theme, language, cart */}
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
                setIsMenuOpen(false);
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
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
