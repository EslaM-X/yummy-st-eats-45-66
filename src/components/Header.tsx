
import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from './header/Logo';
import DesktopNavigation from './header/DesktopNavigation';
import HeaderActionButtons from './header/HeaderActionButtons';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation - hidden on mobile screens */}
          <div className="hidden lg:block">
            <DesktopNavigation />
          </div>

          {/* Action Buttons - includes mobile dropdown menu */}
          <HeaderActionButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
