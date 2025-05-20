
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';

// CVV validation schema and type definition
const cardSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: 'Card number must be at least 16 digits' })
    .max(19, { message: 'Card number must not exceed 19 digits' }),
  cvv: z.string()
    .min(3, { message: 'CVV must be at least 3 digits' })
    .max(4, { message: 'CVV must not exceed 4 digits' }),
});

type CardFormValues = z.infer<typeof cardSchema>;

interface CvvInputProps {
  form: UseFormReturn<CardFormValues>;
}

const CvvInput: React.FC<CvvInputProps> = ({ form }) => {
  const { t } = useLanguage();

  return (
    <FormField
      control={form.control}
      name="cvv"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-medium text-primary">{t('cvvCode')}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input 
                placeholder="123" 
                {...field}
                maxLength={4}
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                className="pl-10 bg-white dark:bg-gray-950 border-2 h-12 transition-all duration-200 focus-visible:ring-primary/30"
              />
            </FormControl>
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CvvInput;
