
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext'; // Add this import
import LoginModal from './LoginModal';
import Logo from './header/Logo';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import HeaderActionButtons from './header/HeaderActionButtons';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { totalItems } = useCart(); // Get total items from cart context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: t('home'), path: "/" },
    { title: t('restaurants'), path: "/restaurants" },
    { title: t('products'), path: "/products" },
    { title: t('rewards'), path: "/rewards" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNavigation 
            navItems={navItems} 
            isActive={isActive} 
            openLoginModal={openLoginModal} 
          />

          {/* Action Buttons */}
          <HeaderActionButtons 
            cartCount={totalItems}
            theme={theme}
            isActive={isActive}
            toggleTheme={toggleTheme}
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={mobileMenuOpen}
          />
        </div>

        {/* Mobile Navigation Menu */}
        <MobileNavigation 
          isOpen={mobileMenuOpen}
          navItems={navItems}
          isActive={isActive}
          onItemClick={() => setMobileMenuOpen(false)}
          onLoginClick={openLoginModal}
          onLanguageToggle={toggleLanguage}
        />
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
