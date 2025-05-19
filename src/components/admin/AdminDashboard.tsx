import React from 'react';
import { 
  BarChart,
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Utensils
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Import dashboard components
import StatCard from './dashboard/StatCard';
import ChartCard from './dashboard/ChartCard';
import OrderStatusChart from './dashboard/OrderStatusChart';
import RecentOrders from './dashboard/RecentOrders';
import TopRestaurants from './dashboard/TopRestaurants';
import SystemAlerts from './dashboard/SystemAlerts';
import SalesChart from './dashboard/SalesChart';

const AdminDashboard: React.FC = () => {
  // Mock data for recent orders
  const recentOrders = [
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
  const systemAlerts = [
    { 
      type: 'warning' as const, 
      title: 'مشكلة في المخزون', 
      message: 'هناك 5 أطعمة غير متوفرة في المخزون لمطعم "بيتزا الشام". يرجى التحقق.' 
    },
    { 
      type: 'info' as const, 
      title: 'تأخير في التوصيل', 
      message: 'تم الإبلاغ عن تأخير متكرر في منطقة "العليا". يرجى مراجعة الموزعين.' 
    },
    { 
      type: 'success' as const, 
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
      {/* Stats Cards */}
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

      {/* Charts and Tables */}
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

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>آخر الطلبات</CardTitle>
            <a href="#" className="text-sm text-teal-600 dark:text-teal-500 hover:underline">عرض الكل</a>
          </div>
        </CardHeader>
        <CardContent>
          <RecentOrders orders={recentOrders} />
        </CardContent>
      </Card>

      {/* Top Restaurants and System Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="أفضل المطاعم" subtitle="مرتبة حسب عدد الطلبات">
          <TopRestaurants restaurants={topRestaurants} />
        </ChartCard>
        
        <ChartCard title="تنبيهات النظام" subtitle="آخر التنبيهات والإشعارات">
          <SystemAlerts alerts={systemAlerts} />
        </ChartCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
