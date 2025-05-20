
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Moon,
  Sun,
  LogOut,
  LogIn,
  Heart,
  User,
  ShieldCheck,
  Book,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import SideMenuItem from './SideMenuItem';

export const SideMenuDrawer: React.FC = () => {
  const location = useLocation();
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
              {/* Header with settings */}
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

              {/* Featured Add Food button */}
              <Link to="/add-food">
                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-md group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <Heart className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 animate-pulse" />
                  {t('navigation:addFood')}
                </Button>
              </Link>

              {/* Menu items */}
              {menuItems.map((item) => (
                <SideMenuItem
                  key={item.path}
                  path={item.path}
                  label={item.label}
                  icon={item.icon}
                  isActive={location.pathname === item.path}
                  highlight={item.highlight}
                />
              ))}
            </div>

            <div className="mt-auto border-t pt-4">
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={signOut}
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
  );
};

export default SideMenuDrawer;
