
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import VirtualCard from './VirtualCard';
import TransactionForm from './TransactionForm';

interface CardSectionProps {
  virtualCard: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    balance: number;
    status: 'active' | 'frozen' | 'disabled';
  };
}

const CardSection: React.FC<CardSectionProps> = ({ virtualCard }) => {
  const { toast } = useToast();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="order-2 lg:order-1">
        <TransactionForm 
          defaultCardNumber={virtualCard.cardNumber}
          defaultCvv={virtualCard.cvv}
          onSuccess={() => toast({
            title: "تم تحديث البيانات",
            description: "تم تحديث بيانات المحفظة والبطاقة بنجاح",
          })}
        />
      </div>
      <div className="order-1 lg:order-2">
        <VirtualCard 
          cardNumber={virtualCard.cardNumber}
          expiryDate={virtualCard.expiryDate}
          cvv={virtualCard.cvv}
          balance={virtualCard.balance}
          status={virtualCard.status}
        />
        
        <Card className="mt-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">حماية البطاقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400 mr-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                تشفير كامل لبيانات البطاقة
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400 mr-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                مراقبة نشاط البطاقة على مدار الساعة
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400 mr-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                إمكانية تجميد البطاقة فوراً عند الحاجة
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800/30">
              <button 
                className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md font-medium text-sm"
                onClick={() => toast({
                  title: virtualCard.status === 'active' ? "تم تجميد البطاقة" : "تم تنشيط البطاقة",
                  description: virtualCard.status === 'active' ? "تم تجميد بطاقتك الافتراضية بنجاح" : "تم تنشيط بطاقتك الافتراضية بنجاح",
                })}
              >
                {virtualCard.status === 'active' ? 'تجميد البطاقة' : 'تنشيط البطاقة'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardSection;
