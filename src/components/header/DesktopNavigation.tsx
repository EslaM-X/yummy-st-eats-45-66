
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const DesktopNavigation = () => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  
  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('restaurants'), href: '/restaurants' },
    { name: t('products'), href: '/products' },
    { name: t('addFood'), href: '/add-food' },
    { name: t('rewards'), href: '/rewards' },
  ];

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
      {user ? (
        <button
          onClick={() => signOut()}
          className="text-sm font-semibold text-red-600 hover:text-red-900 dark:text-red-300 dark:hover:text-red-500 transition-colors duration-200"
        >
          {t('logout')}
        </button>
      ) : (
        <Link
          to="/login"
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
        >
          {t('login')}
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavigation;
