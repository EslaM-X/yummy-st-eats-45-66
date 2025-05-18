
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Star } from "lucide-react";
import { UserPoints, RewardTier } from '@/types';

interface UserPointsCardProps {
  userPoints: UserPoints;
  nextTier: RewardTier | null;
  progressPercentage: number;
  pointsToNextTier: number;
}

const UserPointsCard: React.FC<UserPointsCardProps> = ({
  userPoints,
  nextTier,
  progressPercentage,
  pointsToNextTier
}) => {
  const renderTierIcon = (iconName: string) => {
    if (iconName === 'award') {
      return <Award className="h-6 w-6 text-yellow-500" />;
    } else {
      return <Star className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-yellow-200 dark:border-yellow-900">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 pb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <CardTitle className="text-2xl mb-2 flex items-center">
              {renderTierIcon(userPoints.tier.icon)}
              <span className="mr-2">{userPoints.tier.name}</span>
            </CardTitle>
            <CardDescription>استمتع بمزايا حصرية مع مستواك الحالي</CardDescription>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-500 flex items-center">
              <Star className="inline-block h-6 w-6 mr-2 fill-yellow-500 text-yellow-500" />
              {userPoints.total} نقطة
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        {nextTier ? (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>{userPoints.tier.name}</span>
              <span>{nextTier.name}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
              {pointsToNextTier} نقطة متبقية للوصول إلى {nextTier.name}
            </p>
          </div>
        ) : (
          <div className="mb-6 text-center">
            <p className="text-green-600 dark:text-green-500 font-semibold">
              تهانينا! لقد وصلت إلى أعلى مستوى في برنامج المكافآت
            </p>
            <Progress value={100} className="h-2 mt-2" />
          </div>
        )}
        
        <div className="mt-6">
          <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">مزايا مستواك الحالي:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {userPoints.tier.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="h-5 w-5 text-yellow-500 mr-2 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPointsCard;
