
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletBalanceProps {
  balance: number;
  handleAddMoney: () => void;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ balance, handleAddMoney }) => {
  const { toast } = useToast();
  
  return (
    <Card className="col-span-1 lg:col-span-1 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,_#ffffff_0%,_transparent_58%)]"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-white">رصيد محفظتك</CardTitle>
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Wallet className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-col items-center justify-center py-8">
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-white mb-1">{balance}</span>
            <span className="text-xl ml-2 text-white/80">ST</span>
          </div>
          <div className="mt-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> تم التحديث: اليوم
            </span>
          </div>
        </CardContent>
        <CardFooter className="relative z-10 flex justify-center gap-4 bg-white/10 backdrop-blur-sm">
          <Button 
            className="flex-1 bg-white hover:bg-white/90 text-amber-600"
            onClick={handleAddMoney}
          >
            شحن الرصيد
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-white text-white hover:bg-white/20"
            onClick={() => toast({
              title: "قريبًا",
              description: "هذه الميزة ستكون متاحة قريبًا",
            })}
          >
            سحب الرصيد
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default WalletBalance;
