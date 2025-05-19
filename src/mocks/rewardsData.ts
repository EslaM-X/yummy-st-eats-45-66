
import { UserPoints, UserReward, RewardTier, PointTransaction } from '@/types';

// Mock user points data
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
    name: 'المستوى الذهبي',
    pointsRequired: 400,
    benefits: [
      'خصم 10% على جميع الطلبات',
      'توصيل مجاني للطلبات فوق 100 ST',
      'نقاط مضاعفة في المناسبات الخاصة',
      'أولوية في خدمة العملاء'
    ],
    icon: 'award'
  }
};

// Reward tiers data
export const rewardTiers: RewardTier[] = [
  {
    id: 'bronze',
    name: 'المستوى البرونزي',
    pointsRequired: 0,
    benefits: [
      'نقاط على كل طلب',
      'عروض أسبوعية خاصة'
    ],
    icon: 'star'
  },
  {
    id: 'silver',
    name: 'المستوى الفضي',
    pointsRequired: 200,
    benefits: [
      'نقاط على كل طلب',
      'عروض أسبوعية خاصة',
      'خصم 5% على الطلبات فوق 75 ST'
    ],
    icon: 'star'
  },
  {
    id: 'gold',
    name: 'المستوى الذهبي',
    pointsRequired: 400,
    benefits: [
      'خصم 10% على جميع الطلبات',
      'توصيل مجاني للطلبات فوق 100 ST',
      'نقاط مضاعفة في المناسبات الخاصة',
      'أولوية في خدمة العملاء'
    ],
    icon: 'award'
  },
  {
    id: 'platinum',
    name: 'المستوى البلاتيني',
    pointsRequired: 1000,
    benefits: [
      'خصم 15% على جميع الطلبات',
      'توصيل مجاني بدون حد أدنى',
      'نقاط مضاعفة دائماً',
      'أولوية قصوى في خدمة العملاء',
      'هدية عيد ميلاد سنوية',
      'دعوات لفعاليات حصرية'
    ],
    icon: 'award'
  }
];

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
