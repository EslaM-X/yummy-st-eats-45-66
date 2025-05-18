import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Gift, Star, Clock, ChevronRight, Utensils } from "lucide-react";
import { UserPoints, UserReward, RewardTier } from '@/types';

// بيانات وهمية لنظام المكافآت
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

  const renderTierIcon = (iconName: string) => {
    if (iconName === 'award') {
      return <Award className="h-6 w-6 text-yellow-500" />;
    } else {
      return <Star className="h-6 w-6 text-yellow-500" />;
    }
  };

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
          </div>

          {/* Rewards Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-10">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="available" className="text-lg py-3">المكافآت المتاحة</TabsTrigger>
              <TabsTrigger value="history" className="text-lg py-3">سجل النقاط</TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableRewards.map(reward => (
                  <Card key={reward.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                        variant={userPoints.total >= reward.points ? "default" : "outline"}
                        disabled={userPoints.total < reward.points}
                        onClick={() => handleRedeemReward(reward)}
                        className={userPoints.total >= reward.points ? 
                          "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800" : 
                          ""}
                      >
                        {userPoints.total >= reward.points ? "استبدال" : "نقاط غير كافية"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>سجل النقاط</CardTitle>
                  <CardDescription>تاريخ كسب واستبدال النقاط</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userPoints.history.map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'earned' ? 
                              'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 
                              'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                          }`}>
                            {transaction.type === 'earned' ? 
                              <Star className="h-5 w-5" /> : 
                              <Gift className="h-5 w-5" />
                            }
                          </div>
                          <div className="mr-4 rtl:ml-4 rtl:mr-0">
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                          </div>
                        </div>
                        <div className={`font-semibold ${
                          transaction.type === 'earned' ? 
                            'text-green-600 dark:text-green-400' : 
                            'text-amber-600 dark:text-amber-400'
                        }`}>
                          {transaction.type === 'earned' ? '+' : ''}{transaction.points} نقطة
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* All Tiers Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">مستويات العضوية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewardTiers.map((tier, index) => (
                <Card 
                  key={tier.id} 
                  className={`${tier.id === userPoints.tier.id 
                    ? 'border-2 border-yellow-400 dark:border-yellow-600 shadow-xl' 
                    : ''}`}
                >
                  <CardHeader className={`${tier.id === userPoints.tier.id 
                    ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30' 
                    : ''}`}>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        {renderTierIcon(tier.icon)}
                        <span className="mr-2">{tier.name}</span>
                      </CardTitle>
                      {tier.id === userPoints.tier.id && (
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          مستواك الحالي
                        </span>
                      )}
                    </div>
                    <CardDescription className="text-lg font-semibold mt-2">
                      {tier.pointsRequired} نقطة
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
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How to Earn Points */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">كيف تكسب المزيد من النقاط؟</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">اطلب الطعام</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  اكسب نقاط على كل طلب طعام من أي مطعم (نقطة لكل ST)
                </p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">قيّم المطاعم</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  اكسب 20 نقطة عند تقييم المطاعم والأطباق مع تعليق
                </p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">أضف طعامك</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  اكسب 50 نقطة عند إضافة أطباق منزلية أو وصفات خاصة
                </p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">مهام خاصة</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  أكمل المهام الأسبوعية والتحديات الموسمية لكسب نقاط إضافية
                </p>
              </div>
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
