
import React from 'react';

interface DeliveryInfoProps {
  address: string;
  customer_name?: string;
  customer_phone?: string;
  notes?: string;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ 
  address, 
  customer_name, 
  customer_phone, 
  notes 
}) => {
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
        بيانات التوصيل
      </h4>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <p className="text-gray-700 dark:text-gray-300">
          عنوان التوصيل: {address}
        </p>
        {customer_name && (
          <p className="text-gray-700 dark:text-gray-300">
            اسم المستلم: {customer_name}
          </p>
        )}
        {customer_phone && (
          <p className="text-gray-700 dark:text-gray-300">
            رقم الهاتف: {customer_phone}
          </p>
        )}
        {notes && (
          <p className="text-gray-700 dark:text-gray-300">
            ملاحظات: {notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeliveryInfo;
