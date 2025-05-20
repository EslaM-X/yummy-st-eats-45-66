
import React, { ReactElement } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: ReactElement;
  iconBgColor: string;
  iconTextColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon,
  iconBgColor,
  iconTextColor
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-1 text-gray-800 dark:text-white">{value}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center">
            {trend}
          </p>
        </div>
        <div className={`h-14 w-14 ${iconBgColor} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
