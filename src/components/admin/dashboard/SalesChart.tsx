
import React from 'react';

interface SalesChartProps {
  data: {
    day: string;
    amount: number;
  }[];
  maxValue: number;
}

const SalesChart: React.FC<SalesChartProps> = ({ data, maxValue }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-full h-60">
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-500/20 to-teal-500/5 h-40 rounded-md"></div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-40 px-4">
          {data.map((item, i) => {
            const heightPercentage = (item.amount / maxValue) * 100;
            return (
              <div key={i} className="relative group">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {item.amount} ST
                </div>
                <div 
                  className="bg-teal-500 hover:bg-teal-600 w-10 md:w-12 rounded-t-md transition-all duration-200 cursor-pointer group-hover:filter group-hover:brightness-110" 
                  style={{ height: `${heightPercentage}%` }}
                ></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
        <div className="absolute -right-4 top-0 bottom-0 flex flex-col justify-between py-2">
          {[0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].reverse().map((value, i) => (
            <span key={i} className="text-xs text-gray-500">{Math.round(value)}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
