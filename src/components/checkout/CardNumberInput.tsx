
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreditCard } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCardNumber } from '@/services/card/cardValidation';

// Card number validation schema and type definition
const cardSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: 'Card number must be at least 16 digits' })
    .max(19, { message: 'Card number must not exceed 19 digits' }),
  cvv: z.string()
    .min(3, { message: 'CVV must be at least 3 digits' })
    .max(4, { message: 'CVV must not exceed 4 digits' }),
});

type CardFormValues = z.infer<typeof cardSchema>;

interface CardNumberInputProps {
  form: UseFormReturn<CardFormValues>;
}

const CardNumberInput: React.FC<CardNumberInputProps> = ({ form }) => {
  const { t } = useLanguage();

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(event.target.value);
    form.setValue('cardNumber', formattedValue);
  };

  return (
    <FormField
      control={form.control}
      name="cardNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-medium text-primary">{t('cardNumber')}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input 
                placeholder="1234 5678 9012 3456" 
                {...field}
                onChange={handleCardNumberChange}
                maxLength={19}
                className="pl-10 bg-white dark:bg-gray-950 border-2 h-12 transition-all duration-200 focus-visible:ring-primary/30"
                inputMode="numeric"
                autoComplete="cc-number"
              />
            </FormControl>
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CardNumberInput;
