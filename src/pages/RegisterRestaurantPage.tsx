
import React, { useState } from 'react';
import BusinessTypeSelection from '@/components/restaurant/BusinessTypeSelection';
import RestaurantRegistrationForm from '@/components/restaurant/RestaurantRegistrationForm';
import RestaurantRegistrationLayout from '@/components/restaurant/RestaurantRegistrationLayout';

const RegisterRestaurantPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <BusinessTypeSelection 
            selectedType={selectedType} 
            setSelectedType={setSelectedType} 
            onNext={handleNext} 
          />
        );
      case 2:
        return (
          <RestaurantRegistrationForm 
            selectedType={selectedType as string} 
            onBack={handleBack} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <RestaurantRegistrationLayout currentStep={step} totalSteps={2}>
      {getStepContent()}
    </RestaurantRegistrationLayout>
  );
};

export default RegisterRestaurantPage;
