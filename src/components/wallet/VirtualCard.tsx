
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Copy, Eye, EyeOff, Check, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VirtualCardProps {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  status: 'active' | 'frozen' | 'disabled';
}

const VirtualCard: React.FC<VirtualCardProps> = ({
  cardNumber,
  expiryDate,
  cvv,
  balance,
  status
}) => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const maskedCardNumber = showCardDetails 
    ? cardNumber.match(/.{1,4}/g)?.join(' ') 
    : '•••• •••• •••• ' + cardNumber.slice(-4);

  const maskedCVV = showCardDetails ? cvv : '•••';

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "تم النسخ",
      description: `تم نسخ ${type} إلى الحافظة`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = () => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'frozen': return 'bg-blue-500';
      case 'disabled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 'active': return 'نشطة';
      case 'frozen': return 'مجمدة';
      case 'disabled': return 'معطلة';
      default: return 'غير معروف';
    }
  };

  return (
    <Card className="w-full overflow-hidden border-0 shadow-lg">
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
          <span className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold">بطاقة ST الافتراضية</CardTitle>
              <CardDescription className="text-gray-200">
                بطاقة افتراضية للدفع عبر الإنترنت
              </CardDescription>
            </div>
            <div className="flex">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={() => setShowCardDetails(!showCardDetails)}
              >
                {showCardDetails ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-4">
            <div>
              <div className="flex flex-col">
                <span className="text-xs mb-1 text-gray-200">رقم البطاقة</span>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono tracking-wider">{maskedCardNumber}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20 h-8 w-8"
                    onClick={() => copyToClipboard(cardNumber, 'رقم البطاقة')}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-xs text-gray-200">تاريخ الانتهاء</span>
                <p className="font-mono">{expiryDate}</p>
              </div>
              <div>
                <span className="text-xs text-gray-200">CVV</span>
                <p className="font-mono">{maskedCVV}</p>
              </div>
              <div>
                <span className="text-xs text-gray-200">الرصيد</span>
                <p className="font-bold">{balance} ST</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-black/20 flex justify-between items-center py-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <CreditCard className="h-5 w-5 text-gray-200" />
            <span className="text-sm text-gray-200">VISA</span>
          </div>
          <a 
            href="https://salla-shop.com/salla-developer/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs flex items-center text-gray-200 hover:text-white transition-colors"
          >
            <span className="ml-1 rtl:mr-1 rtl:ml-0">مطور Salla</span>
            <ExternalLink size={12} />
          </a>
        </CardFooter>
      </div>
    </Card>
  );
};

export default VirtualCard;
