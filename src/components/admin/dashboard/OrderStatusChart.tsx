
import React from 'react';
import { PieChart } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface StatusItem {
  name: string;
  percentage: number;
  color: string;
  bgColor: string;
}

const OrderStatusChart: React.FC = () => {
  const statuses: StatusItem[] = [
    { name: 'مكتمل', percentage: 58, color: 'bg-teal-500', bgColor: 'bg-teal-100 dark:bg-teal-900/30' },
    { name: 'قيد التحضير', percentage: 24, color: 'bg-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { name: 'قيد التوصيل', percentage: 13, color: 'bg-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    { name: 'ملغي', percentage: 5, color: 'bg-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' }
  ];

  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="relative h-40 w-40">
          <div className="absolute inset-0 rounded-full border-[16px] border-t-teal-500 border-r-yellow-500 border-b-blue-500 border-l-red-400 transform rotate-45"></div>
          <div className="absolute inset-8 bg-white dark:bg-gray-800 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <PieChart className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {statuses.map((status) => (
          <div key={status.name} className="flex justify-between items-center" title={`${status.name}: ${status.percentage}%`}>
            <div className="flex items-center">
              <div className={`h-3 w-3 ${status.color} rounded-full mr-2 rtl:mr-0 rtl:ml-2`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{status.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">{status.percentage}%</span>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className={status.color} style={{ width: `${status.percentage}%`, height: '100%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderStatusChart;
