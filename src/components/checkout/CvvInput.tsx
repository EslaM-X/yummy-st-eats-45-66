
import React from 'react';
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// CVV validation schema and type definition
const cardSchema = z.object({
  cardNumber: z.string()
    .min(13, { message: 'رقم البطاقة يجب أن يكون على الأقل 13 رقمًا' })
    .max(19, { message: 'رقم البطاقة يجب ألا يتجاوز 19 رقمًا' }),
  cardholderName: z.string().min(3, 'يرجى إدخال اسم حامل البطاقة الكامل'),
  expiryMonth: z.string().min(1, 'الشهر مطلوب'),
  expiryYear: z.string().min(1, 'السنة مطلوبة'),
  cvv: z.string()
    .min(3, { message: 'رمز CVV يجب أن يتكون من 3-4 أرقام' })
    .max(4, { message: 'رمز CVV يجب ألا يتجاوز 4 أرقام' }),
});

type CardFormValues = z.infer<typeof cardSchema>;

interface CvvInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
}

const CvvInput: React.FC<CvvInputProps> = ({ 
  value,
  onChange,
  onBlur,
  name,
  disabled
}) => {
  return (
    <div className="relative">
      <Input 
        placeholder="123" 
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        maxLength={4}
        type="password"
        inputMode="numeric"
        autoComplete="cc-csc"
        className="pl-10 h-10"
      />
      <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default CvvInput;
