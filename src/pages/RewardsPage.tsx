
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils } from "lucide-react";
import { UserReward } from '@/types';
import UserPointsCard from '@/components/rewards/UserPointsCard';
import AvailableRewards from '@/components/rewards/AvailableRewards';
import PointsHistoryList from '@/components/rewards/PointsHistoryList';
import TierCard from '@/components/rewards/TierCard';
import EarnPointsCard from '@/components/rewards/EarnPointsCard';
import { mockUserPoints, rewardTiers, availableRewards, getNextTierInfo } from '@/mocks/rewardsData';
import { useLanguage } from '@/contexts/LanguageContext';

const RewardsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('available');
  const navigate = useNavigate();
  const userPoints = mockUserPoints;
  const { t, language } = useLanguage();

  // Get tier information
  const { nextTier, progressPercentage, pointsToNextTier } = getNextTierInfo(userPoints, rewardTiers);

  const handleRedeemReward = (reward: UserReward) => {
    // هنا ستكون المنطق الفعلي لاستبدال المكافأة
    alert(`${t('rewardRedeemedAlert')}: ${reward.name}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block">
              <span className="relative z-10">{t('rewardsHeroTitle')}</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/30 dark:bg-yellow-800/30 -z-0 transform -rotate-1"></span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('rewardsHeroSubtitle')}
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
              <TabsTrigger value="available" className="text-lg py-3">{t('rewardsAvailableTab')}</TabsTrigger>
              <TabsTrigger value="history" className="text-lg py-3">{t('rewardsHistoryTab')}</TabsTrigger>
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
            <h2 className="text-2xl font-bold mb-6 text-center">{t('membershipTiersTitle')}</h2>
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
            <h2 className="text-2xl font-bold mb-6 text-center">{t('howToEarnPointsTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <EarnPointsCard 
                icon="utensils"
                title={t('earnByOrderingTitle')}
                description={t('earnByOrderingDesc')}
              />
              
              <EarnPointsCard 
                icon="star"
                title={t('earnByRatingTitle')}
                description={t('earnByRatingDesc')}
              />
              
              <EarnPointsCard 
                icon="gift"
                title={t('earnByAddingFoodTitle')}
                description={t('earnByAddingFoodDesc')}
              />
              
              <EarnPointsCard 
                icon="award"
                title={t('earnBySpecialMissionsTitle')}
                description={t('earnBySpecialMissionsDesc')}
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
              {t('addFoodCta')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RewardsPage;

