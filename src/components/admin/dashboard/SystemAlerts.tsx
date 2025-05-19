
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Alert {
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
}

interface SystemAlertsProps {
  alerts: Alert[];
}

const SystemAlerts: React.FC<SystemAlertsProps> = ({ alerts }) => {
  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      default:
        return 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-400';
    }
  };

  const getIconColor = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-500';
      case 'info':
        return 'text-blue-600 dark:text-blue-500';
      case 'success':
        return 'text-green-600 dark:text-green-500';
      case 'error':
        return 'text-red-600 dark:text-red-500';
      default:
        return 'text-gray-600 dark:text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <div key={index} className={`flex items-start gap-3 p-3 ${getAlertStyles(alert.type)} rounded-lg`}>
          <AlertTriangle className={`h-5 w-5 ${getIconColor(alert.type)} mt-0.5`} />
          <div>
            <h5 className="font-medium">{alert.title}</h5>
            <p className="text-xs">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemAlerts;
