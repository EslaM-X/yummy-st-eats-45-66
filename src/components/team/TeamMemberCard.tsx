
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamMemberCardProps {
  imageSrc: string;
  imageAlt: string;
  name: string;
  title: string;
  bio: string;
  companyLogoSrc: string;
  companyName: string;
  companyLink?: string;
  linkText?: string;
  companyDescription?: string;
  skills: string[];
  interests: string[];
  borderGradient: string;
  roleEmoji: string;
  badgeBgClass: string;
  skillsBgClass: string;
  interestsBgClass: string;
  techSkillsTitle: string;
  interestsTitle: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  imageSrc,
  imageAlt,
  name,
  title,
  bio,
  companyLogoSrc,
  companyName,
  companyLink,
  linkText,
  companyDescription,
  skills,
  interests,
  borderGradient,
  roleEmoji,
  badgeBgClass,
  skillsBgClass,
  interestsBgClass,
  techSkillsTitle,
  interestsTitle,
}) => {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className={`bg-gradient-to-br ${borderGradient} rounded-2xl shadow-xl overflow-hidden mb-12`}>
      <div className="p-8 md:p-12">
        <div className="flex flex-col items-center">
          {/* Member Image with animated border */}
          <div className="relative mb-8">
            <div className={`absolute inset-0 ${borderGradient} rounded-full animate-pulse-slow blur-sm`}></div>
            <div className="relative p-1 rounded-full bg-white dark:bg-gray-900">
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                className="rounded-full h-48 w-48 object-cover border-4 border-white dark:border-gray-800"
              />
            </div>
          </div>
          
          {/* Member Name */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            {name}
          </h2>
          
          {/* Animated line */}
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-purple-600 rounded mb-6"></div>
          
          {/* Member Role with emoji */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${badgeBgClass} font-medium mb-8`}>
            <span className="mr-2">{roleEmoji}</span>
            {title}
          </div>
          
          {/* Pizza Logo Reference */}
          <div className="flex items-center justify-center mb-6">
            <img 
              src={companyLogoSrc} 
              alt="ST Pizza Logo" 
              className="h-10 w-10 mr-2"
            />
            <span className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
              {companyName}
            </span>
          </div>
          
          {/* Conditional company description */}
          {companyDescription && (
            <div className="text-gray-700 dark:text-gray-300 mb-6 text-center">
              {companyDescription}
            </div>
          )}
          
          {/* External Link */}
          {companyLink && (
            <div className="mb-6">
              <a 
                href={companyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 hover:underline flex items-center"
              >
                <span className="mr-1">🔗</span> {linkText || companyLink}
              </a>
            </div>
          )}
          
          {/* Member Bio */}
          <p className={`text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {bio}
          </p>
          
          {/* Technical Expertise Section */}
          <div className="w-full mb-8">
            <h3 className={`text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
              {techSkillsTitle}
            </h3>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${skillsBgClass} transition-transform hover:scale-110`}
                >
                  {t(`skill${skill.charAt(0).toUpperCase() + skill.slice(1)}`)}
                </span>
              ))}
            </div>
          </div>
          
          {/* Skills/Interests Section */}
          <div className="w-full">
            <h3 className={`text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
              {interestsTitle}
            </h3>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${interestsBgClass} transition-transform hover:scale-110`}
                >
                  {t(`skill${interest.charAt(0).toUpperCase() + interest.slice(1)}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
