
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import BusinessTypeSelection from '@/components/restaurant/BusinessTypeSelection';
import RestaurantRegistrationForm from '@/components/restaurant/RestaurantRegistrationForm';
import ProgressIndicator from '@/components/restaurant/ProgressIndicator';

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-10 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 dark:bg-yellow-800 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-300 dark:bg-teal-800 rounded-full -ml-12 -mb-12 opacity-20"></div>
            
            {/* Progress indicator */}
            <ProgressIndicator currentStep={step} totalSteps={2} />
            
            {getStepContent()}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterRestaurantPage;
