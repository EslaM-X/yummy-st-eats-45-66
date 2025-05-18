
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Logo: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center" aria-label={t('home')}>
        <img 
          src="/lovable-uploads/5483091a-e5bd-4397-9e86-24fb0ce87243.png" 
          alt="ST Pizza Logo" 
          className="h-8 w-8 sm:h-10 sm:w-10 mr-2 rtl:mr-0 rtl:ml-2"
        />
        <h1 className="text-xl sm:text-3xl font-bold font-cairo text-yellow-800 dark:text-yellow-600">
          ST<span className="text-teal-500 ml-1 rtl:mr-1 rtl:ml-0">🍕 Eat</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
