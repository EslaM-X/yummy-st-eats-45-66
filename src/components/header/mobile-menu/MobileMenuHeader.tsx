
import React from 'react';
import { Menu } from "lucide-react";

const MobileMenuHeader: React.FC = () => {
  return (
    <div className="w-full pb-1 mb-1 border-b border-yellow-100 dark:border-gray-800 flex items-center justify-center">
      <span className="text-lg font-extrabold tracking-widest text-yellow-600 dark:text-yellow-300 flex items-center gap-2 animate-fade-in">
        <Menu className="h-5 w-5 inline-block" />
        <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse inline-block"></span>
      </span>
    </div>
  );
};

export default MobileMenuHeader;
