import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const DesktopNavigation = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { name: t('navigation:home'), href: '/' },
    { name: t('navigation:restaurants'), href: '/restaurants' },
    { name: t('navigation:products'), href: '/products' },
    { name: t('navigation:addFood'), href: '/add-food' },
    { name: t('navigation:wallet'), href: '/wallet' },
    { name: t('navigation:team'), href: '/team' },
    { name: t('navigation:rewards'), href: '/rewards' },
  ];

  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
        >
          {item.name}
        </Link>
      ))}
      {isLoggedIn ? (
        <button
          onClick={logout}
          className="text-sm font-semibold text-red-600 hover:text-red-900 dark:text-red-300 dark:hover:text-red-500 transition-colors duration-200"
        >
          {t('navigation:logout')}
        </button>
      ) : (
        <Link
          to="/login"
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
        >
          {t('navigation:login')}
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavigation;
