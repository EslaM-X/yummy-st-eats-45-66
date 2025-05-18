
import React from 'react';
import RewardCard from './RewardCard';
import { UserReward } from '@/types';

interface AvailableRewardsProps {
  rewards: UserReward[];
  userPoints: number;
  onRedeemReward: (reward: UserReward) => void;
}

const AvailableRewards: React.FC<AvailableRewardsProps> = ({ rewards, userPoints, onRedeemReward }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rewards.map(reward => (
        <RewardCard 
          key={reward.id}
          reward={reward}
          canRedeem={userPoints >= reward.points}
          onRedeem={onRedeemReward}
        />
      ))}
    </div>
  );
};

export default AvailableRewards;
