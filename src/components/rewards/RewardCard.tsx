
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Gift, Utensils, Award } from "lucide-react";
import { UserReward } from '@/types';

interface RewardCardProps {
  reward: UserReward;
  canRedeem: boolean;
  onRedeem: (reward: UserReward) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, canRedeem, onRedeem }) => {
  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <Gift className="h-5 w-5 text-red-500" />;
      case 'freeItem':
        return <Utensils className="h-5 w-5 text-green-500" />;
      case 'delivery':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'exclusive':
        return <Award className="h-5 w-5 text-purple-500" />;
      default:
        return <Gift className="h-5 w-5" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={reward.imageUrl} 
          alt={reward.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold shadow-sm flex items-center">
            {getRewardTypeIcon(reward.type)}
            <span className="mr-1">{reward.points} نقطة</span>
          </span>
        </div>
      </div>
      <CardHeader>
        <CardTitle>{reward.name}</CardTitle>
        <CardDescription className="line-clamp-2">{reward.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          ينتهي: {reward.expiryDate}
        </div>
        <Button 
          variant={canRedeem ? "default" : "outline"}
          disabled={!canRedeem}
          onClick={() => onRedeem(reward)}
          className={canRedeem ? 
            "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800" : 
            ""}
        >
          {canRedeem ? "استبدال" : "نقاط غير كافية"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RewardCard;
