
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CoreTeamPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-600 dark:text-teal-400">
              {t('coreTeamTitle')}
            </h1>
            
            {/* First Team Member - CEO */}
            <div className="bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="p-8 md:p-12">
                <div className="flex flex-col items-center">
                  {/* Founder Image with animated border */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-purple-500 to-yellow-500 rounded-full animate-pulse-slow blur-sm"></div>
                    <div className="relative p-1 rounded-full bg-white dark:bg-gray-900">
                      <img 
                        src="/lovable-uploads/a71929a4-ce05-455b-bf7d-1626766a38cb.png" 
                        alt={t('founderImageAlt')} 
                        className="rounded-full h-48 w-48 object-cover border-4 border-white dark:border-gray-800"
                      />
                    </div>
                  </div>
                  
                  {/* Founder Name */}
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                    {t('founderName')}
                  </h2>
                  
                  {/* Animated line */}
                  <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-purple-600 rounded mb-6"></div>
                  
                  {/* Founder Role with rocket emoji */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-medium mb-8">
                    <span className="mr-2">🚀</span>
                    {t('founderTitle')}
                  </div>
                  
                  {/* Pizza Logo Reference */}
                  <div className="flex items-center justify-center mb-6">
                    <img 
                      src="/lovable-uploads/5483091a-e5bd-4397-9e86-24fb0ce87243.png" 
                      alt="ST Pizza Logo" 
                      className="h-10 w-10 mr-2"
                    />
                    <span className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                      ST🍕 Eat
                    </span>
                  </div>
                  
                  {/* Founder Bio */}
                  <p className={`text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('founderBio')}
                  </p>
                  
                  {/* Skills/Interests Section */}
                  <div className="w-full">
                    <h3 className={`text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('interests')}
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {['programming', 'blockchain', 'ai', 'web3', 'web5', 'innovation', 'dapp'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 transition-transform hover:scale-110"
                        >
                          {t(`skill${skill.charAt(0).toUpperCase() + skill.slice(1)}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second Team Member - CTO */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex flex-col items-center">
                  {/* CTO Image with animated border */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-teal-500 to-green-500 rounded-full animate-pulse-slow blur-sm"></div>
                    <div className="relative p-1 rounded-full bg-white dark:bg-gray-900">
                      <img 
                        src="/lovable-uploads/b1796902-3206-4112-a199-07b14b0b76de.png" 
                        alt={t('ctoImageAlt')} 
                        className="rounded-full h-48 w-48 object-cover border-4 border-white dark:border-gray-800"
                      />
                    </div>
                  </div>
                  
                  {/* CTO Name */}
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                    {t('ctoName')}
                  </h2>
                  
                  {/* Animated line */}
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-600 rounded mb-6"></div>
                  
                  {/* CTO Role with coding emoji */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium mb-8">
                    <span className="mr-2">💻</span>
                    {t('ctoTitle')}
                  </div>
                  
                  {/* Pizza Logo Reference */}
                  <div className="flex items-center justify-center mb-6">
                    <img 
                      src="/lovable-uploads/5483091a-e5bd-4397-9e86-24fb0ce87243.png" 
                      alt="ST Pizza Logo" 
                      className="h-10 w-10 mr-2"
                    />
                    <span className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                      ST🍕 Eat
                    </span>
                  </div>
                  
                  {/* External Link */}
                  <div className="mb-6">
                    <a 
                      href="https://salla-shop.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-600 dark:text-teal-400 hover:underline flex items-center"
                    >
                      <span className="mr-1">🔗</span> {t('ctoCompanyLink')}
                    </a>
                  </div>
                  
                  {/* CTO Bio */}
                  <p className={`text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('ctoBio')}
                  </p>
                  
                  {/* Skills/Interests Section */}
                  <div className="w-full">
                    <h3 className={`text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('techSkills')}
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {['frontend', 'backend', 'devops', 'mobile', 'database', 'architecture', 'security'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 transition-transform hover:scale-110"
                        >
                          {t(`skill${skill.charAt(0).toUpperCase() + skill.slice(1)}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoreTeamPage;
