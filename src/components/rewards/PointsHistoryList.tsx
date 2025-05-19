
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Gift } from "lucide-react";
import { PointTransaction } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface PointsHistoryListProps {
  transactions: PointTransaction[];
}

const PointsHistoryList: React.FC<PointsHistoryListProps> = ({ transactions }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("pointsHistoryTitle")}</CardTitle>
        <CardDescription>{t("pointsHistoryDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
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
                {transaction.type === 'earned' ? '+' : ''}{transaction.points} {t("pointsUnit")}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PointsHistoryList;
