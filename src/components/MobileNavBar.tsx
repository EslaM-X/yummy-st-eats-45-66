
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  UtensilsCrossed, 
  ShoppingBag, 
  Gift, 
  User, 
  Menu, 
  X, 
  Settings,
  LogOut,
  LogIn,
  PanelLeft,
  Book,
  ShieldCheck,
  HelpCircle,
  Heart
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function MobileNavBar() {
  const location = useLocation();
  const { t, language, setLanguage, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const mainNavItems = [
    { icon: Home, label: t('navigation:home'), path: '/' },
    { icon: UtensilsCrossed, label: t('navigation:restaurants'), path: '/restaurants' },
    { icon: ShoppingBag, label: t('navigation:products'), path: '/products' },
    { icon: Gift, label: t('navigation:rewards'), path: '/rewards' },
    { icon: User, label: t('navigation:profile'), path: '/profile' },
  ];

  const menuItems = [
    { 
      label: t('navigation:addFood'), 
      icon: Heart, 
      path: '/add-food',
      highlight: true
    },
    { 
      label: t('navigation:team'), 
      icon: User, 
      path: '/team' 
    },
    { 
      label: t('navigation:privacyPolicy'), 
      icon: ShieldCheck, 
      path: '/privacy-policy' 
    },
    { 
      label: t('navigation:termsConditions'), 
      icon: Book, 
      path: '/terms-conditions' 
    },
    { 
      label: t('navigation:cookiePolicy'), 
      icon: HelpCircle, 
      path: '/cookie-policy' 
    }
  ];
  
  return (
    <>
      {/* القائمة الرئيسية المثبتة في الأسفل */}
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      >
        <div className="bg-background/80 backdrop-blur-lg border-t border-border px-2 py-1">
          <div className="flex items-center justify-around">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center py-2 px-3 relative transition-all',
                  location.pathname === item.path 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="bubble"
                    className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.path === '/profile' && 
                  <div className="relative">
                    <item.icon className="h-5 w-5 mb-1" />
                    {isAuthenticated && (
                      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                }
                {item.path === '/cart' ? (
                  <div className="relative">
                    <ShoppingBag className="h-5 w-5 mb-1" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                ) : (
                  <item.icon className="h-5 w-5 mb-1" />
                )}
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* زر القائمة الجانبية */}
      <div className="fixed top-4 right-4 md:hidden z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={language === 'ar' ? "right" : "left"} className="w-64 pt-12">
            <div className="flex flex-col h-full">
              <div className="space-y-2 mb-6">
                {/* رأس القائمة مع الإعدادات */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">{t('navigation:menu')}</h2>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={toggleTheme}
                      className="h-8 w-8 rounded-full"
                    >
                      {theme === 'light' ? (
                        <Moon className="h-4 w-4" />
                      ) : (
                        <Sun className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={toggleLanguage}
                      className="h-8 w-8 rounded-full"
                    >
                      <span className="text-xs font-bold">
                        {language === 'ar' ? 'EN' : 'ع'}
                      </span>
                    </Button>
                  </div>
                </div>

                {/* زر إضافة الطعام المميز */}
                <Link to="/add-food">
                  <Button 
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-md group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    <Heart className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 animate-pulse" />
                    {t('navigation:addFood')}
                  </Button>
                </Link>

                {/* بقية العناصر في القائمة */}
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center px-4 py-2.5 rounded-md transition-colors',
                      location.pathname === item.path 
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-primary/5'
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-3 rtl:ml-3 rtl:mr-0" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto border-t pt-4">
                {isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t('navigation:logout')}
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button 
                      variant="default" 
                      className="w-full justify-start"
                    >
                      <LogIn className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {t('navigation:login')}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default MobileNavBar;
