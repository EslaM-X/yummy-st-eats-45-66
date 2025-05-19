
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Image } from 'lucide-react'; // Using an allowed icon

const AdPlaceholder: React.FC<{className?: string}> = ({ className }) => {
  return (
    <Card className={`border-2 border-dashed border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700 ${className}`}>
      <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[100px] text-center">
        <Image className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-2" />
        <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
          مساحة إعلانية
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          (محتوى إعلاني يظهر هنا)
        </p>
      </CardContent>
    </Card>
  );
};

export default AdPlaceholder;
