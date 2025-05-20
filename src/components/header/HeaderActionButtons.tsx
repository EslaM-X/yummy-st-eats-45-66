import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Sun, Globe, Menu, Home, UtensilsCrossed, ShoppingBag, Gift, Users, FileText, ShieldCheck, Cookie } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { AuthButtons } from '../auth/AuthButtons';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export function HeaderActionButtons() {
  const { setTheme, theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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

  // قائمة الروابط
  const navigationLinks = [
    { key: "home",        title: t('home'), path: "/" },
    { key: "restaurants", title: t('restaurants'), path: "/restaurants" },
    { key: "products",    title: t('products'), path: "/products" },
    { key: "rewards",     title: t('rewards'), path: "/rewards" },
    { key: "addFood",     title: t('addFood'), path: "/add-food" },
    { key: "team",        title: t('team'), path: "/team" },
    { key: "privacyPolicy", title: t('privacyPolicy'), path: "/privacy-policy" },
    { key: "termsConditions", title: t('termsConditions'), path: "/terms-conditions" },
    { key: "cookiePolicy", title: t('cookiePolicy'), path: "/cookie-policy" },
  ];

  // قائمة منسدلة للهاتف المحمول بتصميم جذاب وتفاعلي للغاية
  const MobileMenu = () => (
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
        className="w-[92vw] max-w-xs rounded-2xl p-2 mt-3 bg-white/95 dark:bg-gray-900/95 border-none shadow-2xl ring-2 ring-primary/10 animate-scale-in z-[1000]"
        sideOffset={10}
      >
        <div className="flex flex-col gap-1">

          {/* Header مصغر بدون كلمة navigation */}
          <div className="w-full pb-2 mb-2 border-b border-yellow-100 dark:border-gray-800 flex items-center justify-center">
            <span className="text-lg font-extrabold tracking-widest text-yellow-600 dark:text-yellow-300 flex items-center gap-2 animate-fade-in">
              <Menu className="h-5 w-5 inline-block" />
              {/* شيفون متحرك صغير بدل النص لتزيين القائمة */}
              <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse inline-block"></span>
            </span>
          </div>

          {/* عناصر القائمة بتأثيرات تفاعلية */}
          <div className="flex flex-col gap-2">
            {navigationLinks.map(link => (
              <DropdownMenuItem
                key={link.path}
                className={`
                  group cursor-pointer flex items-center gap-3 rounded-xl px-4 py-3 font-semibold
                  transition-all duration-200 ease-in-out shadow-none relative
                  focus:bg-yellow-50 focus:text-yellow-900 dark:focus:bg-yellow-900/20 dark:focus:text-yellow-100
                  hover:scale-[1.04] hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-amber-500/80 hover:text-white dark:hover:from-yellow-700 dark:hover:to-yellow-900/80 dark:hover:text-yellow-100
                  active:scale-[1.02] active:ring-2 active:ring-yellow-400
                  ${link.key === "addFood" ? "bg-gradient-to-tr from-yellow-300 via-yellow-200 to-amber-200 dark:from-yellow-700 dark:to-yellow-900/60 text-amber-700 dark:text-yellow-200 font-bold scale-[1.04] shadow hover:scale-[1.07] my-[6px]" : ""}
                `}
                onClick={() => {
                  navigate(link.path);
                  setIsMenuOpen(false);
                }}
                style={{ fontWeight: link.key === "addFood" ? 700 : undefined }}
              >
                <span className="flex items-center justify-center bg-yellow-50 dark:bg-yellow-800 rounded-full p-2 group-hover:bg-white/20 transition-all duration-300 shadow-md ring-1 ring-yellow-200 dark:ring-yellow-900">
                  {navIcons[link.key] ?? <span className="h-4 w-4 mr-2"></span>}
                </span>
                <span className="text-base font-cairo truncate">{link.title}</span>
                {/* خيط متحرك على يمين كل عنصر لتأكيد التفاعل */}
                <span className="ml-auto h-2 w-2 rounded-full bg-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
              </DropdownMenuItem>
            ))}
          </div>

          {/* عناصر التحكم: الثيم، اللغة، سلة الشراء (أكثر تفاعلية) */}
          <div className="flex gap-3 mt-4 justify-center px-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="rounded-full !w-12 !h-12 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-blue-900 dark:to-yellow-900/10 border-none shadow-md hover:scale-110 transition-transform duration-300"
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
              className="rounded-full !w-12 !h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-950 border-none shadow-md hover:scale-110 transition-transform duration-300"
            >
              <Globe className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                navigate('/cart');
                setIsMenuOpen(false);
              }}
              className="relative rounded-full !w-12 !h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 dark:from-yellow-900 dark:to-yellow-700 border-none shadow-md hover:scale-110 transition-transform duration-300"
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

  return (
    <div className="flex items-center gap-2">
      {/* القائمة المنسدلة للأجهزة المحمولة - تصميم مبتكر */}
      <MobileMenu />

      {/* أزرار التبديل للشاشات الكبيرة - لا تغيير */}
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
        onClick={() => navigate('/cart')}
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
