
export interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  restaurant: {
    name: string;
    address: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: 'جديد' | 'قيد التحضير' | 'قيد التوصيل' | 'مكتمل' | 'ملغي';
  paymentMethod: 'بطاقة' | 'نقداً عند الاستلام' | 'محفظة إلكترونية';
  total: number;
  orderDate: string;
  deliveryTime: string | null;
}

export interface AdminSettings {
  general: {
    appName: string;
    adminEmail: string;
    supportPhone: string;
    maxDistance: number;
    defaultLanguage: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    orderUpdates: boolean;
    marketingEmails: boolean;
  };
  payment: {
    acceptCreditCards: boolean;
    acceptCashOnDelivery: boolean;
    acceptWallet: boolean;
    commissionRate: number;
    vatRate: number;
  };
  security: {
    twoFactorAuth: boolean;
    requireStrongPasswords: boolean;
    sessionTimeout: number;
  };
}
