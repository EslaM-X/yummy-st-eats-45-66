
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminFooter: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 p-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ST Eats. {t('allRightsReserved')}
        </p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
            {t('privacyPolicy')}
          </Link>
          <Link to="/terms-conditions" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
            {t('termsConditions')}
          </Link>
          <Link to="/core-team" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
            {t('coreTeam')}
          </Link>
          <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
            {t('home')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
