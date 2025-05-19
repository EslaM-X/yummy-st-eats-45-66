
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TeamPageHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-600 dark:text-teal-400">
      {t('coreTeamTitle')}
    </h1>
  );
};

export default TeamPageHeader;
