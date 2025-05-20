
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import { useLanguage } from '@/contexts/LanguageContext';
import LoginModal from './LoginModal';
import Logo from './header/Logo';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import HeaderActionButtons from './header/HeaderActionButtons';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

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
          <DesktopNavigation />

          {/* Action Buttons */}
          <HeaderActionButtons />
        </div>

        {/* Mobile Navigation Menu */}
        <MobileNavigation 
          isOpen={mobileMenuOpen}
          navItems={[
            { title: t('navigation:home'), path: "/" },
            { title: t('navigation:restaurants'), path: "/restaurants" },
            { title: t('navigation:products'), path: "/products" },
            { title: t('navigation:rewards'), path: "/rewards" }
          ]}
          isActive={(path) => location.pathname === path}
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
