
// تعريفات الأنواع المستخدمة في واجهة الإدارة

// نوع الطلب
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

// نوع عنصر الطلب
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

// نوع المستخدم
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'نشط' | 'محظور' | 'معلق';
  role: 'مستخدم' | 'مدير مطعم' | 'مشرف';
  orders: number;
  joinDate: string;
}

// نوع المطعم
export interface Restaurant {
  id: string;
  name: string;
  type: string;
  address: string;
  status: 'مفتوح' | 'مغلق' | 'معلق';
  rating: number;
  orders: number;
  joiningDate: string;
  imageUrl: string;
}

// نوع التنبيه
export interface Alert {
  type: "error" | "success" | "warning" | "info";
  title: string;
  message: string;
}

// إضافة نوع البطاقة الافتراضية
export interface VirtualCard {
  id: string;
  user_id: string;
  card_number: string;
  holder_name: string;
  expiry_date: string;
  cvv: string;
  balance: number;
  is_active: boolean;
  card_type: string;
  is_default?: boolean;
  created_at: string;
  last_used?: string;
}

// إضافة نوع إعدادات لوحة الإدارة
export interface AdminSettings {
  general: {
    appName: string;
    adminEmail: string;
    supportPhone: string;
    maxDistance: number;
    defaultLanguage: 'ar' | 'en';
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
