
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserPointsCard from '@/components/rewards/UserPointsCard';
import AvailableRewards from '@/components/rewards/AvailableRewards';
import PointsHistoryList from '@/components/rewards/PointsHistoryList';
import TierCard from '@/components/rewards/TierCard';
import { useToast } from "@/hooks/use-toast";
import { UserReward } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { 
  mockUserPoints, 
  availableRewards, 
  pointsHistory, 
  rewardTiers,
  calculateRewardsProgress
} from '@/mocks/rewardsData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const RewardsPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("rewards");

  const userPoints = mockUserPoints;
  const { nextTier, pointsToNextTier, progressPercentage } = calculateRewardsProgress(userPoints.total);

  const handleRedeemReward = (reward: UserReward) => {
    toast({
      title: t('rewardRedeemed'),
      description: `${reward.name} - ${reward.points} ${t('pointsUnit')}`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('loginRequired')}</AlertTitle>
            <AlertDescription>
              {t('loginToAccessRewards')}
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {t('rewardsPageTitle')}
          </h1>

          <div className="mb-10">
            <UserPointsCard 
              userPoints={userPoints}
              nextTier={nextTier}
              progressPercentage={progressPercentage}
              pointsToNextTier={pointsToNextTier}
            />
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-10">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="rewards" className="flex-1">
                {t('availableRewards')}
              </TabsTrigger>
              <TabsTrigger value="tiers" className="flex-1">
                {t('rewardTiers')}
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1">
                {t('pointsHistory')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="rewards" className="p-1">
              <AvailableRewards 
                rewards={availableRewards} 
                userPoints={userPoints.total} 
                onRedeemReward={handleRedeemReward}
              />
            </TabsContent>
            
            <TabsContent value="tiers">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rewardTiers.map((tier, index) => (
                  <TierCard 
                    key={tier.name}
                    tier={tier}
                    isCurrentTier={userPoints.tier.name === tier.name}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <PointsHistoryList transactions={pointsHistory} />
            </TabsContent>
          </Tabs>

          <Separator className="my-10" />
          
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{t('howEarnPoints')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-3">{t('orderAndEarn')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('earnPointsDescription')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>{t('earnByOrdering')}</li>
                  <li>{t('earnByReviews')}</li>
                  <li>{t('earnByReferrals')}</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-3">{t('redeemRewards')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('redeemPointsDescription')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>{t('redeemForDiscounts')}</li>
                  <li>{t('redeemForFreeItems')}</li>
                  <li>{t('redeemForExclusives')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RewardsPage;
