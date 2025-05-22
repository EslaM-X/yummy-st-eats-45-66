
import React from 'react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  category: string;
  colors?: string[];
  className?: string;
  yAxisWidth?: number;
  valueFormatter?: (value: number) => string;
  height?: number;
}

export function BarChart({
  data,
  index,
  categories,
  category,
  colors = ['#0ea5e9'],
  className,
  yAxisWidth = 40,
  valueFormatter = (value: number) => `${value}`,
  height = 300
}: BarChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
          className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-border [&_.recharts-cartesian-grid-vertical_line]:stroke-border"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={category}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            width={yAxisWidth}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const categoryValue = payload[0].payload[category];
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">{category}</span>
                        <span className="text-sm font-bold">{categoryValue}</span>
                      </div>
                      {payload.map((item: any, idx: number) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-sm font-medium text-muted-foreground">
                            {item.name}
                          </span>
                          <span className="text-sm font-bold" style={{ color: item.color }}>
                            {valueFormatter(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '10px', fontSize: '0.75rem' }} 
            formatter={(value: string) => <span className="text-muted-foreground">{value}</span>}
          />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

// إزالة التصدير المكرر
