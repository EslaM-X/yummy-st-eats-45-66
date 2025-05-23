
import { UserPoints, UserReward, RewardTier, PointTransaction } from '@/types';

// Mock reward tiers
export const rewardTiers: RewardTier[] = [
  {
    name: 'bronzeTier',
    pointsRequired: 0,
    icon: 'award',
    benefits: ['freeDelivery', 'birthdayBonus', 'exclusiveDeals']
  },
  {
    name: 'silverTier',
    pointsRequired: 500,
    icon: 'award',
    benefits: ['freeDelivery', 'birthdayBonus', 'exclusiveDeals', 'prioritySupport']
  },
  {
    name: 'goldTier',
    pointsRequired: 1000,
    icon: 'star',
    benefits: ['freeDelivery', 'birthdayBonus', 'exclusiveDeals', 'prioritySupport', 'doublePoints']
  },
  {
    name: 'platinumTier',
    pointsRequired: 2500,
    icon: 'star',
    benefits: ['freeDelivery', 'birthdayBonus', 'exclusiveDeals', 'prioritySupport', 'doublePoints', 'vipEvents', 'dedicatedManager']
  }
];

// Mock user points
export const mockUserPoints: UserPoints = {
  id: '1',
  user_id: '123',
  total: 750,
  tier: rewardTiers[1] // Silver tier
};

// Mock rewards
export const availableRewards: UserReward[] = [
  {
    id: '1',
    name: '10% off next order',
    description: 'Get 10% off your next order',
    points: 200,
    type: 'discount',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800',
    expiryDate: '2025-12-31'
  },
  {
    id: '2',
    name: 'Free dessert',
    description: 'Enjoy a free dessert with your next meal',
    points: 350,
    type: 'freeItem',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800',
    expiryDate: '2025-12-31'
  },
  {
    id: '3',
    name: 'Free delivery for a week',
    description: 'Get free delivery on all orders for a week',
    points: 500,
    type: 'delivery',
    imageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800',
    expiryDate: '2025-12-31'
  },
  {
    id: '4',
    name: 'VIP restaurant experience',
    description: 'Enjoy a special VIP treatment at selected restaurants',
    points: 1000,
    type: 'exclusive',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800',
    expiryDate: '2025-12-31'
  }
];

// Mock points transaction history
export const pointsHistory: PointTransaction[] = [
  {
    id: '1',
    type: 'earned',
    points: 125,
    description: 'Order #12345',
    date: '2025-05-15'
  },
  {
    id: '2',
    type: 'earned',
    points: 75,
    description: 'Order #12346',
    date: '2025-05-08'
  },
  {
    id: '3',
    type: 'redeemed',
    points: 200,
    description: 'Redeemed for 10% discount',
    date: '2025-05-01'
  },
  {
    id: '4',
    type: 'earned',
    points: 250,
    description: 'Special promo bonus',
    date: '2025-04-20'
  },
  {
    id: '5',
    type: 'earned',
    points: 100,
    description: 'Order #12340',
    date: '2025-04-15'
  },
  {
    id: '6',
    type: 'redeemed',
    points: 350,
    description: 'Redeemed for free dessert',
    date: '2025-04-10'
  }
];

// Helper function to calculate next tier and progress
export const calculateRewardsProgress = (currentPoints: number): {
  nextTier: RewardTier | null;
  pointsToNextTier: number;
  progressPercentage: number;
} => {
  // Find current tier and next tier
  let currentTierIndex = -1;
  for (let i = rewardTiers.length - 1; i >= 0; i--) {
    if (currentPoints >= rewardTiers[i].pointsRequired) {
      currentTierIndex = i;
      break;
    }
  }

  // If user is at max tier
  if (currentTierIndex === rewardTiers.length - 1) {
    return {
      nextTier: null,
      pointsToNextTier: 0,
      progressPercentage: 100
    };
  }

  const nextTier = rewardTiers[currentTierIndex + 1];
  const currentTierPoints = rewardTiers[currentTierIndex].pointsRequired;
  const pointsToNextTier = nextTier.pointsRequired - currentPoints;
  const tierPointsRange = nextTier.pointsRequired - currentTierPoints;
  const progressPercentage = Math.round(((currentPoints - currentTierPoints) / tierPointsRange) * 100);

  return {
    nextTier,
    pointsToNextTier,
    progressPercentage
  };
};
