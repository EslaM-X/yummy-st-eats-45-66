import React from 'react';
import { Coins } from 'lucide-react'; // Using an available icon

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/b1796902-3206-4112-a199-07b14b0b76de.png" 
              alt="ST Coin Logo" 
              className="h-10 w-10 mr-3"
            />
            <h1 className="text-3xl font-bold text-yellow-500">
              ST<span className="text-teal-500 ml-1">🍕 Eat</span>
            </h1>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium">
              الرئيسية
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium">
              المطاعم
            </a>
            <a href="#" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium">
              سجل الآن
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
