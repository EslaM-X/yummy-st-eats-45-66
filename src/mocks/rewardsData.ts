
import { UserPoints, UserReward, RewardTier, PointTransaction } from '@/types';

// نصوص الفوائد وأسماء المستويات كـ "مفاتيح ترجمة" (بصيغة tKey)
export const rewardTiers: RewardTier[] = [
  {
    id: 'bronze',
    name: 'rewardTierBronze',
    pointsRequired: 0,
    benefits: [
      'rewardTierBronzeBenefit1',
      'rewardTierBronzeBenefit2',
    ],
    icon: 'star'
  },
  {
    id: 'silver',
    name: 'rewardTierSilver',
    pointsRequired: 200,
    benefits: [
      'rewardTierSilverBenefit1',
      'rewardTierSilverBenefit2',
      'rewardTierSilverBenefit3',
    ],
    icon: 'star'
  },
  {
    id: 'gold',
    name: 'rewardTierGold',
    pointsRequired: 400,
    benefits: [
      'rewardTierGoldBenefit1',
      'rewardTierGoldBenefit2',
      'rewardTierGoldBenefit3',
      'rewardTierGoldBenefit4'
    ],
    icon: 'award'
  },
  {
    id: 'platinum',
    name: 'rewardTierPlatinum',
    pointsRequired: 1000,
    benefits: [
      'rewardTierPlatinumBenefit1',
      'rewardTierPlatinumBenefit2',
      'rewardTierPlatinumBenefit3',
      'rewardTierPlatinumBenefit4',
      'rewardTierPlatinumBenefit5',
      'rewardTierPlatinumBenefit6'
    ],
    icon: 'award'
  }
];

// تعديل userPoints لاستخدام مفتاح الترجمة بدلاً من الاسم العربي
export const mockUserPoints: UserPoints = {
  total: 420,
  history: [
    { id: '1', date: '2025-05-14', points: 50, type: 'earned', description: 'طلب من مطعم البيت السوري' },
    { id: '2', date: '2025-05-10', points: 30, type: 'earned', description: 'طلب من مطعم حلويات الشام' },
    { id: '3', date: '2025-04-28', points: 25, type: 'earned', description: 'طلب من مطعم شاورما على كيفك' },
    { id: '4', date: '2025-04-15', points: 100, type: 'earned', description: 'تقييم 5 مطاعم' },
    { id: '5', date: '2025-04-05', points: -75, type: 'redeemed', description: 'استبدال مكافأة خصم 15%' },
  ],
  tier: {
    id: 'gold',
    name: 'rewardTierGold',
    pointsRequired: 400,
    benefits: [
      'rewardTierGoldBenefit1',
      'rewardTierGoldBenefit2',
      'rewardTierGoldBenefit3',
      'rewardTierGoldBenefit4'
    ],
    icon: 'award'
  }
};

// Available rewards data
export const availableRewards: UserReward[] = [
  {
    id: '1',
    name: 'خصم 25% على طلبك القادم',
    points: 150,
    description: 'احصل على خصم 25% على أي طلب من أي مطعم (حتى 30 ST)',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format',
    expiryDate: '2025-06-30',
    type: 'discount'
  },
  {
    id: '2',
    name: 'وجبة مجانية',
    points: 300,
    description: 'طبق رئيسي مجاني من أي من مطاعمنا المميزة (حتى 45 ST)',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format',
    expiryDate: '2025-06-15',
    type: 'freeItem'
  },
  {
    id: '3',
    name: 'توصيل مجاني لمدة شهر',
    points: 200,
    description: 'توصيل مجاني غير محدود لجميع طلباتك لمدة 30 يوم',
    imageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=500&auto=format',
    expiryDate: '2025-07-15',
    type: 'delivery'
  },
  {
    id: '4',
    name: 'تجربة طعام حصرية',
    points: 500,
    description: 'تجربة عشاء لشخصين في مطعم فاخر مع قائمة طعام خاصة',
    imageUrl: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=500&auto=format',
    expiryDate: '2025-08-30',
    type: 'exclusive'
  },
  {
    id: '5',
    name: 'حلويات مجانية',
    points: 100,
    description: 'حلوى مجانية مع أي طلب لمدة أسبوع',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format',
    expiryDate: '2025-06-10',
    type: 'freeItem'
  }
];

// Helper function to get the next tier and calculate progress
export const getNextTierInfo = (userPoints: UserPoints, allTiers: RewardTier[]) => {
  // حساب المستوى التالي
  const currentTierIndex = allTiers.findIndex(tier => tier.id === userPoints.tier.id);
  const nextTier = currentTierIndex < allTiers.length - 1 ? allTiers[currentTierIndex + 1] : null;
  
  // حساب نسبة التقدم للمستوى التالي
  let progressPercentage = 100;
  let pointsToNextTier = 0;
  
  if (nextTier) {
    const currentTierPoints = userPoints.tier.pointsRequired;
    const nextTierPoints = nextTier.pointsRequired;
    const pointsRange = nextTierPoints - currentTierPoints;
    const userProgressInRange = userPoints.total - currentTierPoints;
    progressPercentage = Math.min(Math.round((userProgressInRange / pointsRange) * 100), 100);
    pointsToNextTier = nextTierPoints - userPoints.total;
  }

  return {
    nextTier,
    progressPercentage,
    pointsToNextTier
  };
};
