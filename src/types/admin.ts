export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

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
  items: OrderItem[];
  status: 'جديد' | 'قيد التحضير' | 'قيد التوصيل' | 'مكتمل' | 'ملغي';
  paymentMethod: 'بطاقة' | 'نقداً عند الاستلام' | 'محفظة إلكترونية';
  total: number;
  orderDate: string;
  deliveryTime: string | null;
}

export interface VirtualCard {
  id: string;
  user_id: string;
  card_number: string;
  holder_name: string;
  expiry_date: string;
  cvv: string;
  balance: number;
  is_active: boolean;
  created_at: string;
  card_type: 'virtual' | 'physical';
  is_default: boolean;
  last_used?: string;
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
