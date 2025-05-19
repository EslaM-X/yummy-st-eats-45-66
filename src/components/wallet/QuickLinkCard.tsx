
import React from 'react';
import { Card } from "@/components/ui/card";
import { ChevronRight } from 'lucide-react';

interface QuickLinkCardProps {
  icon: string;
  title: string;
  description: string;
  path: string;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ icon, title, description, path }) => {
  return (
    <a 
      href={path}
      className="block group"
    >
      <Card className="h-full border-0 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{icon}</span>
            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
            </div>
          </div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </Card>
    </a>
  );
};

export default QuickLinkCard;
