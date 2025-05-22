
import React from 'react';

const ProductsLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
          <div className="w-full h-52 bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-2/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="flex justify-between mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsLoading;
