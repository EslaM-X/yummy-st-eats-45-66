
import React from 'react';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Utensils
} from 'lucide-react';

// Import dashboard components
import StatCard from './dashboard/StatCard';
import ChartCard from './dashboard/ChartCard';
import OrderStatusChart from './dashboard/OrderStatusChart';
import RecentOrders from './dashboard/RecentOrders';
import TopRestaurants from './dashboard/TopRestaurants';
import SystemAlerts from './dashboard/SystemAlerts';
import SalesChart from './dashboard/SalesChart';

// تعريف الأنواع المسموح بها للتنبيهات وحالات الطلبات
type AlertType = 'warning' | 'info' | 'success' | 'error';
type OrderStatus = 'مكتمل' | 'قيد التحضير' | 'قيد التوصيل' | 'ملغي';

// تعريف نوع البيانات للطلب
interface Order {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  time: string;
}

// تعريف نوع البيانات للتنبيه
interface Alert {
  type: AlertType;
  title: string;
  message: string;
}

const AdminDashboard: React.FC = () => {
  // Mock data for recent orders
  const recentOrders: Order[] = [
    { id: 'ORD-7243', customer: 'أحمد محمد', amount: 145, status: 'مكتمل', time: 'منذ 10 دقائق' },
    { id: 'ORD-7244', customer: 'نورة سعد', amount: 67, status: 'قيد التوصيل', time: 'منذ 27 دقيقة' },
    { id: 'ORD-7245', customer: 'عبدالله خالد', amount: 89, status: 'قيد التحضير', time: 'منذ 35 دقيقة' },
    { id: 'ORD-7246', customer: 'سارة علي', amount: 120, status: 'مكتمل', time: 'منذ 45 دقيقة' },
    { id: 'ORD-7247', customer: 'محمد عمر', amount: 240, status: 'ملغي', time: 'منذ ساعة' },
  ];

  // Mock data for top restaurants
  const topRestaurants = [
    { name: 'مطعم البيت السوري', orders: 142, rating: 4.8 },
    { name: 'بيتزا الشام', orders: 128, rating: 4.6 },
    { name: 'برجر فاكتوري', orders: 98, rating: 4.5 },
    { name: 'شاورما على كيفك', orders: 87, rating: 4.4 },
  ];

  // Mock data for system alerts
  const systemAlerts: Alert[] = [
    { 
      type: 'warning', 
      title: 'مشكلة في المخزون', 
      message: 'هناك 5 أطعمة غير متوفرة في المخزون لمطعم "بيتزا الشام". يرجى التحقق.' 
    },
    { 
      type: 'info', 
      title: 'تأخير في التوصيل', 
      message: 'تم الإبلاغ عن تأخير متكرر في منطقة "العليا". يرجى مراجعة الموزعين.' 
    },
    { 
      type: 'success', 
      title: 'تحديث النظام', 
      message: 'هناك تحديث جديد متاح للنظام. يرجى تثبيته في غضون 48 ساعة.' 
    },
  ];

  // Mock data for sales chart
  const salesData = [
    { day: 'س', amount: 1200 },
    { day: 'أ', amount: 1800 },
    { day: 'ن', amount: 800 },
    { day: 'ث', amount: 1600 },
    { day: 'خ', amount: 950 },
    { day: 'ج', amount: 2000 },
    { day: 'ش', amount: 1400 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <StatsSection />

      {/* Charts Section */}
      <ChartsSection salesData={salesData} />

      {/* Recent Orders Section */}
      <OrdersSection orders={recentOrders} />

      {/* Restaurants and Alerts Section */}
      <BottomSection 
        restaurants={topRestaurants}
        alerts={systemAlerts}
      />
    </div>
  );
};

// Stats Section Component
const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="إجمالي الطلبات"
        value="1,249"
        trend="↑ 12.5% هذا الشهر"
        icon={ShoppingBag}
        iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
        iconTextColor="text-yellow-600 dark:text-yellow-400"
      />
      <StatCard
        title="العملاء"
        value="842"
        trend="↑ 8.1% هذا الشهر"
        icon={Users}
        iconBgColor="bg-teal-100 dark:bg-teal-900/30"
        iconTextColor="text-teal-600 dark:text-teal-400"
      />
      <StatCard
        title="المطاعم"
        value="156"
        trend="↑ 3.2% هذا الشهر"
        icon={Utensils}
        iconBgColor="bg-purple-100 dark:bg-purple-900/30"
        iconTextColor="text-purple-600 dark:text-purple-400"
      />
      <StatCard
        title="الإيرادات"
        value="25,430 ST"
        trend="↑ 18.3% هذا الشهر"
        icon={BarChart}
        iconBgColor="bg-blue-100 dark:bg-blue-900/30"
        iconTextColor="text-blue-600 dark:text-blue-400"
      />
    </div>
  );
};

// Charts Section Component
interface ChartsSectionProps {
  salesData: { day: string; amount: number }[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ salesData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
      {/* Sales Chart Card */}
      <ChartCard 
        title="المبيعات اليومية" 
        subtitle="آخر 7 أيام"
        className="col-span-1 lg:col-span-4"
      >
        <SalesChart data={salesData} maxValue={2000} />
      </ChartCard>

      {/* Order Stats Card */}
      <ChartCard 
        title="توزيع الطلبات" 
        subtitle="حسب الحالة"
        className="col-span-1 lg:col-span-3"
      >
        <OrderStatusChart />
      </ChartCard>
    </div>
  );
};

// Orders Section Component
interface OrdersSectionProps {
  orders: Order[];
}

const OrdersSection: React.FC<OrdersSectionProps> = ({ orders }) => {
  return (
    <ChartCard 
      title="آخر الطلبات" 
      subtitle="أحدث المعاملات"
      className=""
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm text-gray-500 dark:text-gray-400">
          عرض {orders.length} من أصل {orders.length + 35} طلب
        </h3>
        <a href="#" className="text-sm text-teal-600 dark:text-teal-500 hover:underline">عرض الكل</a>
      </div>
      <RecentOrders orders={orders} />
    </ChartCard>
  );
};

// Bottom Section Component
interface BottomSectionProps {
  restaurants: { name: string; orders: number; rating: number }[];
  alerts: Alert[];
}

const BottomSection: React.FC<BottomSectionProps> = ({ restaurants, alerts }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="أفضل المطاعم" subtitle="مرتبة حسب عدد الطلبات">
        <TopRestaurants restaurants={restaurants} />
      </ChartCard>
      
      <ChartCard title="تنبيهات النظام" subtitle="آخر التنبيهات والإشعارات">
        <SystemAlerts alerts={alerts} />
      </ChartCard>
    </div>
  );
};

export default AdminDashboard;
