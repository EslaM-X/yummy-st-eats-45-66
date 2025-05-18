
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between max-w-xs mx-auto">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div 
              className={`h-3 w-3 rounded-full ${
                index + 1 <= currentStep 
                ? 'bg-yellow-500' 
                : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
            {index < totalSteps - 1 && (
              <div 
                className={`h-1 flex-grow ${
                  index + 2 <= currentStep 
                  ? 'bg-yellow-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
