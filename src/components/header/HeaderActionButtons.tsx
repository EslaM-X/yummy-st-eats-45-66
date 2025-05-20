
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Moon, Sun, Globe, Menu, Home, UtensilsCrossed, ShoppingBag, Gift, Users, FileText, ShieldCheck, Cookie, Flag } from "lucide-react";
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
import { countries } from '@/components/ui/country-picker';

// تعريف أيقونات التنقل
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
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('sa');

  // تبديل السمة (وضع النهار/الليل)
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

  // تبديل اللغة (العربية/الإنجليزية)
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // عدد العناصر في سلة التسوق
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // تغيير البلد المحدد
  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);
    setCountryMenuOpen(false);
    
    // عرض رسالة تفيد بتغيير البلد
    const country = countries.find(c => c.code === code);
    toast({
      title: t('countryChanged') || 'تم تغيير الدولة',
      description: language === 'ar' ? `تم التغيير إلى ${country?.nameAr}` : `Changed to ${country?.name}`,
      duration: 1500
    });
    
    // هنا يمكن إضافة منطق إضافي مثل تحديث المنتجات المعروضة بناءً على البلد المحدد
    // على سبيل المثال: navigate(`/products?country=${code}`);
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

  // قائمة الروابط التنقلية
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

  // قائمة منسدلة للهاتف المحمول
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
        className="w-[96vw] max-w-[320px] rounded-2xl p-1.5 mt-2 bg-white/95 dark:bg-gray-900/95 border-none shadow-2xl ring-2 ring-primary/10 animate-scale-in z-[1000]"
        sideOffset={8}
      >
        <div className="flex flex-col gap-0.5">
          {/* Header مصغر */}
          <div className="w-full pb-1 mb-1 border-b border-yellow-100 dark:border-gray-800 flex items-center justify-center">
            <span className="text-lg font-extrabold tracking-widest text-yellow-600 dark:text-yellow-300 flex items-center gap-2 animate-fade-in">
              <Menu className="h-5 w-5 inline-block" />
              <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse inline-block"></span>
            </span>
          </div>

          {/* إضافة قائمة اختيار البلد */}
          <div className="px-3 py-2 mb-2">
            <div className="flex justify-center">
              {countries.slice(0, 4).map((country) => (
                <Button
                  key={country.code}
                  variant="ghost"
                  size="icon"
                  className={`rounded-full w-8 h-8 mx-1 ${selectedCountry === country.code ? 'bg-primary/20 ring-2 ring-primary' : ''}`}
                  onClick={() => handleCountryChange(country.code)}
                >
                  <span className="text-lg">{country.flagEmoji}</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-8 mx-1"
                onClick={() => setCountryMenuOpen(!countryMenuOpen)}
              >
                <Flag className="h-4 w-4" />
              </Button>
            </div>
            
            {/* قائمة مفصلة للدول */}
            {countryMenuOpen && (
              <div className="grid grid-cols-4 gap-2 mt-2 animate-fade-in">
                {countries.map((country) => (
                  <Button
                    key={country.code}
                    variant="ghost"
                    size="icon"
                    className={`rounded-full w-8 h-8 ${selectedCountry === country.code ? 'bg-primary/20 ring-2 ring-primary' : ''}`}
                    onClick={() => handleCountryChange(country.code)}
                    title={language === 'ar' ? country.nameAr : country.name}
                  >
                    <span className="text-lg">{country.flagEmoji}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* عناصر القائمة الرئيسية */}
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

          {/* عناصر التحكم: الثيم، اللغة، سلة الشراء */}
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
                navigate('/cart');
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

  // قائمة البلدان للشاشات الكبيرة
  const CountryDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex h-9 w-9 rounded-full hover:scale-110 hover:bg-primary/20 transition-all duration-300 relative"
          aria-label={t('selectCountry') || 'اختر الدولة'}
        >
          <div className="flex items-center justify-center">
            <span className="text-lg">
              {countries.find(c => c.code === selectedCountry)?.flagEmoji}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-[180px] p-2">
        <DropdownMenuLabel className="text-center font-semibold text-primary">
          {t('selectCountry') || 'اختر الدولة'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            className={`flex items-center gap-2 cursor-pointer my-1 rounded hover:bg-primary/10 transition-all ${selectedCountry === country.code ? 'bg-primary/20' : ''}`}
            onClick={() => handleCountryChange(country.code)}
          >
            <span className="text-lg">{country.flagEmoji}</span>
            <span>{language === 'ar' ? country.nameAr : country.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex items-center gap-2">
      {/* القائمة المنسدلة للأجهزة المحمولة */}
      <MobileMenu />

      {/* قائمة البلدان للشاشات الكبيرة */}
      <CountryDropdown />
      
      {/* أزرار التبديل للشاشات الكبيرة */}
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
