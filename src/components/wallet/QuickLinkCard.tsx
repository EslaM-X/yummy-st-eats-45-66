
import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

interface QuickLinkCardProps {
  icon: string;
  title: string;
  description: string;
  path: string;
  isExternal?: boolean;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ 
  icon, 
  title, 
  description, 
  path,
  isExternal = false
}) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isExternal) {
      return (
        <a 
          href={path}
          className="block group"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    
    return (
      <a 
        href={path}
        className="block group"
      >
        {children}
      </a>
    );
  };
  
  return (
    <CardWrapper>
      <Card className="h-full border-0 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{icon}</span>
            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
              <ArrowRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
            </div>
          </div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          {isExternal && (
            <div className="mt-2 inline-block text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded">
              رابط خارجي
            </div>
          )}
        </div>
      </Card>
    </CardWrapper>
  );
};

export default QuickLinkCard;
