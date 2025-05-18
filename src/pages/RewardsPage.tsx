
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils } from "lucide-react";
import { UserPoints, UserReward, RewardTier } from '@/types';
import UserPointsCard from '@/components/rewards/UserPointsCard';
import AvailableRewards from '@/components/rewards/AvailableRewards';
import PointsHistoryList from '@/components/rewards/PointsHistoryList';
import TierCard from '@/components/rewards/TierCard';
import EarnPointsCard from '@/components/rewards/EarnPointsCard';

// Mock data
const mockUserPoints: UserPoints = {
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

const rewardTiers: RewardTier[] = [
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

const availableRewards: UserReward[] = [
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

const RewardsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('available');
  const navigate = useNavigate();
  const userPoints = mockUserPoints;

  // حساب المستوى التالي
  const currentTierIndex = rewardTiers.findIndex(tier => tier.id === userPoints.tier.id);
  const nextTier = currentTierIndex < rewardTiers.length - 1 ? rewardTiers[currentTierIndex + 1] : null;
  
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

  const handleRedeemReward = (reward: UserReward) => {
    // هنا ستكون المنطق الفعلي لاستبدال المكافأة
    alert(`تم استبدال المكافأة: ${reward.name}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block">
              <span className="relative z-10">نظام المكافآت</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/30 dark:bg-yellow-800/30 -z-0 transform -rotate-1"></span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              اكسب النقاط واستبدل المكافآت الحصرية مع كل طلب. كلما طلبت أكثر، كلما حصلت على مزايا أكثر!
            </p>
          </div>

          {/* User Points Summary Card */}
          <div className="mb-10">
            <UserPointsCard 
              userPoints={userPoints}
              nextTier={nextTier}
              progressPercentage={progressPercentage}
              pointsToNextTier={pointsToNextTier}
            />
          </div>

          {/* Rewards Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-10">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="available" className="text-lg py-3">المكافآت المتاحة</TabsTrigger>
              <TabsTrigger value="history" className="text-lg py-3">سجل النقاط</TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="space-y-4 animate-fade-in">
              <AvailableRewards 
                rewards={availableRewards}
                userPoints={userPoints.total}
                onRedeemReward={handleRedeemReward}
              />
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <PointsHistoryList transactions={userPoints.history} />
            </TabsContent>
          </Tabs>

          {/* All Tiers Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">مستويات العضوية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewardTiers.map((tier) => (
                <TierCard 
                  key={tier.id} 
                  tier={tier}
                  isCurrentTier={tier.id === userPoints.tier.id}
                />
              ))}
            </div>
          </div>

          {/* How to Earn Points */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">كيف تكسب المزيد من النقاط؟</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <EarnPointsCard 
                icon="utensils"
                title="اطلب الطعام"
                description="اكسب نقاط على كل طلب طعام من أي مطعم (نقطة لكل ST)"
              />
              
              <EarnPointsCard 
                icon="star"
                title="قيّم المطاعم"
                description="اكسب 20 نقطة عند تقييم المطاعم والأطباق مع تعليق"
              />
              
              <EarnPointsCard 
                icon="gift"
                title="أضف طعامك"
                description="اكسب 50 نقطة عند إضافة أطباق منزلية أو وصفات خاصة"
              />
              
              <EarnPointsCard 
                icon="award"
                title="مهام خاصة"
                description="أكمل المهام الأسبوعية والتحديات الموسمية لكسب نقاط إضافية"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-10">
            <Button 
              size="lg"
              onClick={() => navigate('/add-food')}
              className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 px-8 py-6 text-lg"
            >
              <Utensils className="mr-2 h-6 w-6" />
              أضف طعامك الآن واكسب 50 نقطة
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RewardsPage;
