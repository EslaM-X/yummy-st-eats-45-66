
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamPageHeader from '@/components/team/TeamPageHeader';
import TeamMemberCard from '@/components/team/TeamMemberCard';

const CoreTeamPage: React.FC = () => {
  const { t, language } = useLanguage();

  // Founder data configuration
  const founderData = {
    imageSrc: "/lovable-uploads/a71929a4-ce05-455b-bf7d-1626766a38cb.png",
    imageAlt: t('founderImageAlt'),
    name: t('founderName'),
    title: t('founderTitle'),
    bio: t('founderBio'),
    companyLogoSrc: "/lovable-uploads/5483091a-e5bd-4397-9e86-24fb0ce87243.png",
    companyName: "ST🍕 Eat",
    skills: [
      'programming', 
      'cybersecurity', 
      'infosecurity', 
      'smartcontracts', 
      'systemdevelopment', 
      'systemdesign', 
      'frontenddesign',
      'mobiledev', 
      'projectmanagement', 
      'technicalleadership'
    ],
    interests: ['programming', 'blockchain', 'ai', 'web3', 'web5', 'innovation', 'dapp'],
    borderGradient: "from-purple-50 to-teal-50 dark:from-gray-800 dark:to-gray-900",
    roleEmoji: "🚀",
    badgeBgClass: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    skillsBgClass: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
    interestsBgClass: "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200",
    techSkillsTitle: t('founderTechSkills'),
    interestsTitle: t('interests')
  };

  // CTO data configuration - تحديث الصورة هنا
  const ctoData = {
    imageSrc: "/lovable-uploads/1609993d-07d1-4e29-9549-0882719efaa0.png", // تم تحديث الصورة بالصورة الجديدة
    imageAlt: t('ctoImageAlt'),
    name: t('ctoName'),
    title: t('ctoTitle'),
    bio: t('ctoBio'),
    companyLogoSrc: "/lovable-uploads/5483091a-e5bd-4397-9e86-24fb0ce87243.png",
    companyName: "ST🍕 Eat",
    companyLink: t('ctoCompanyLink'),
    linkText: "salla-shop.com",
    companyDescription: language === 'en' 
      ? "Founder, CTO and Developer at salla-shop" 
      : "مؤسس ورئيس قسم التكنولوجيا ومطور في سلة- شوب",
    skills: [
      'frontend', 
      'backend', 
      'devops', 
      'mobile', 
      'database', 
      'architecture', 
      'security',
      'mobiledev', 
      'projectmanagement', 
      'smartcontracts', 
      'dapp' 
    ],
    interests: ['programming', 'innovation', 'ai', 'mobiledev', 'cloudcomputing', 'cybersecurity', 'systemdesign', 'web3', 'web5', 'dapp'],
    borderGradient: "from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900",
    roleEmoji: "💻",
    badgeBgClass: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    skillsBgClass: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    interestsBgClass: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    techSkillsTitle: t('techSkills'),
    interestsTitle: t('interests')
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <TeamPageHeader />
            
            {/* Founder Card */}
            <TeamMemberCard {...founderData} />
            
            {/* CTO Card */}
            <TeamMemberCard {...ctoData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoreTeamPage;
