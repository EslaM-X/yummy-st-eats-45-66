
import React from 'react';
import { Input } from "@/components/ui/input";
import { CreditCard } from 'lucide-react';

// Utility function for card number formatting
const formatCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '');
  
  // Format into chunks of 4
  const chunks = [];
  for (let i = 0; i < digitsOnly.length; i += 4) {
    chunks.push(digitsOnly.slice(i, i + 4));
  }
  
  return chunks.join(' ');
};

interface CardNumberInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
}

const CardNumberInput: React.FC<CardNumberInputProps> = ({ 
  value,
  onChange,
  onBlur,
  name,
  disabled
}) => {
  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(event.target.value);
    
    // Create a new synthetic event with the formatted value
    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value: formattedValue
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(newEvent);
  };

  return (
    <div className="relative">
      <Input 
        placeholder="1234 5678 9012 3456" 
        value={value}
        onChange={handleCardNumberChange}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        maxLength={19}
        className="pl-10 h-10"
        inputMode="numeric"
        autoComplete="cc-number"
      />
      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default CardNumberInput;
