
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
