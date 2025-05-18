
import React from 'react';
import { Utensils, Star, Gift, Award } from "lucide-react";

interface EarnPointsCardProps {
  icon: 'utensils' | 'star' | 'gift' | 'award';
  title: string;
  description: string;
}

const EarnPointsCard: React.FC<EarnPointsCardProps> = ({ icon, title, description }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'utensils':
        return <Utensils className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />;
      case 'star':
        return <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />;
      case 'gift':
        return <Gift className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />;
      case 'award':
        return <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />;
    }
  };

  return (
    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        {renderIcon()}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default EarnPointsCard;
