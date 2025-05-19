
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star } from "lucide-react";
import { RewardTier } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface TierCardProps {
  tier: RewardTier;
  isCurrentTier: boolean;
}

const TierCard: React.FC<TierCardProps> = ({ tier, isCurrentTier }) => {
  const { t, language } = useLanguage();

  const renderTierIcon = (iconName: string) => {
    if (iconName === 'award') {
      return <Award className="h-6 w-6 text-yellow-500" />;
    } else {
      return <Star className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <Card 
      className={`${isCurrentTier 
        ? 'border-2 border-yellow-400 dark:border-yellow-600 shadow-xl' 
        : ''}`}
    >
      <CardHeader className={`${isCurrentTier 
        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30' 
        : ''}`}>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            {renderTierIcon(tier.icon)}
            <span className="mr-2">{t(tier.name)}</span>
          </CardTitle>
          {isCurrentTier && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              {t("currentTierLabel")}
            </span>
          )}
        </div>
        <CardDescription className="text-lg font-semibold mt-2">
          {tier.pointsRequired} {t("pointsUnit")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tier.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <div className="h-5 w-5 text-yellow-500 mr-2 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">{t(benefit)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TierCard;
