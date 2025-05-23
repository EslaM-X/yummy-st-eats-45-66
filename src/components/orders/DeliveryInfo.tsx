
import React from 'react';
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, User, Phone, FileText } from 'lucide-react';

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
  const { language } = useLanguage();
  
  const labels = {
    title: language === 'en' ? 'Delivery Information' : 'بيانات التوصيل',
    address: language === 'en' ? 'Delivery Address' : 'عنوان التوصيل',
    name: language === 'en' ? 'Recipient Name' : 'اسم المستلم',
    phone: language === 'en' ? 'Phone Number' : 'رقم الهاتف',
    notes: language === 'en' ? 'Notes' : 'ملاحظات'
  };
  
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
        {labels.title}
      </h4>
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="text-gray-500 dark:text-gray-400 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {labels.address}
              </p>
              <p className="text-gray-800 dark:text-white">{address || '-'}</p>
            </div>
          </div>
          
          {customer_name && (
            <div className="flex items-start gap-3">
              <User className="text-gray-500 dark:text-gray-400 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {labels.name}
                </p>
                <p className="text-gray-800 dark:text-white">{customer_name}</p>
              </div>
            </div>
          )}
          
          {customer_phone && (
            <div className="flex items-start gap-3">
              <Phone className="text-gray-500 dark:text-gray-400 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {labels.phone}
                </p>
                <p className="text-gray-800 dark:text-white">{customer_phone}</p>
              </div>
            </div>
          )}
          
          {notes && (
            <div className="flex items-start gap-3">
              <FileText className="text-gray-500 dark:text-gray-400 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {labels.notes}
                </p>
                <p className="text-gray-800 dark:text-white">{notes}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DeliveryInfo;
