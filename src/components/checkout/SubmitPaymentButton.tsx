
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface SubmitPaymentButtonProps {
  loading: boolean;
  amount: number;
}

const SubmitPaymentButton: React.FC<SubmitPaymentButtonProps> = ({ loading, amount }) => {
  const { t } = useLanguage();
  
  return (
    <Button 
      type="submit" 
      className="w-full h-14 text-lg font-medium relative overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {t('processing')}
        </div>
      ) : (
        <>
          <span className="relative z-10">{`${t('completePayment')} - ${amount} ST`}</span>
          <span className="absolute inset-0 bg-white/20 transform translate-y-full transition-transform hover:translate-y-0 duration-300 ease-in-out"></span>
        </>
      )}
    </Button>
  );
};

export default SubmitPaymentButton;
