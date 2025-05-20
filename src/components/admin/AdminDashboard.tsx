import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from './dashboard/StatCard';
import OrderStatusChart from './dashboard/OrderStatusChart';
import SalesChart from './dashboard/SalesChart';
import TopRestaurants from './dashboard/TopRestaurants';
import SystemAlerts from './dashboard/SystemAlerts';
import RecentOrders from './dashboard/RecentOrders';
import TransactionStats from './dashboard/TransactionStats';
import { Users, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';

// تعريف نوع Alert
type Alert = {
  type: "error" | "success" | "warning" | "info";
  title: string;
  message: string;
};

const AdminDashboard: React.FC = () => {
  // Sample data for charts
  const [salesData, setSalesData] = useState([
    { day: 'الأحد', amount: 1200 },
    { day: 'الإثنين', amount: 1800 },
    { day: 'الثلاثاء', amount: 1400 },
    { day: 'الأربعاء', amount: 2200 },
    { day: 'الخميس', amount: 1600 },
    { day: 'الجمعة', amount: 2400 },
    { day: 'السبت', amount: 3000 },
  ]);

  const [topRestaurants, setTopRestaurants] = useState([
    { name: "مطعم الشرق", orders: 142, rating: 4.8 },
    { name: "برجر كينج", orders: 115, rating: 4.5 },
    { name: "بيتزا هت", orders: 98, rating: 4.3 },
    { name: "مندي الرياض", orders: 87, rating: 4.7 },
    { name: "شاورما المدينة", orders: 76, rating: 4.2 }
  ]);

  const [systemAlerts, setSystemAlerts] = useState<Alert[]>([
    { type: "warning", title: 'تحديث النظام', message: 'سيتم إجراء صيانة للموقع غداً الساعة 2 صباحاً' },
    { type: "error", title: 'خطأ في API', message: 'واجهة برمجة المدفوعات غير متاحة حالياً' },
    { type: "info", title: 'طلبات جديدة', message: 'لديك 15 طلب جديد بحاجة للمراجعة' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
      </div>
      
      {/* الإحصائيات العامة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="المستخدمين"
          value="2,451"
          trend="نمو بنسبة 12% مقارنة بالشهر الماضي"
          icon={<Users className="h-5 w-5" />}
          iconBgColor="bg-blue-100 dark:bg-blue-900/30"
          iconTextColor="text-blue-700 dark:text-blue-400"
        />
        <StatCard
          title="الطلبات"
          value="845"
          trend="انخفاض بنسبة 3.5% عن الشهر الماضي"
          icon={<ShoppingBag className="h-5 w-5" />}
          iconBgColor="bg-amber-100 dark:bg-amber-900/30"
          iconTextColor="text-amber-700 dark:text-amber-400"
        />
        <StatCard
          title="المبيعات"
          value="13,249 ريال"
          trend="نمو بنسبة 8.3% مقارنة بالشهر الماضي"
          icon={<TrendingUp className="h-5 w-5" />}
          iconBgColor="bg-green-100 dark:bg-green-900/30"
          iconTextColor="text-green-700 dark:text-green-400"
        />
        <StatCard
          title="التنبيهات"
          value="5"
          trend="تنبيهات نشطة تحتاج للمراجعة"
          icon={<AlertCircle className="h-5 w-5" />}
          iconBgColor="bg-red-100 dark:bg-red-900/30"
          iconTextColor="text-red-700 dark:text-red-400"
        />
      </div>
      
      {/* إحصائيات المعاملات */}
      <TransactionStats />

      {/* المحتوى الرئيسي */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="transactions">المعاملات</TabsTrigger>
          <TabsTrigger value="analytics">الإحصائيات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>حالة الطلبات</CardTitle>
                <CardDescription>
                  توزيع الطلبات حسب الحالة لآخر 30 يوم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrderStatusChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>تحليل المبيعات</CardTitle>
                <CardDescription>
                  إجماليات المبيعات اليومية لآخر أسبوع
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart data={salesData} maxValue={3000} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>أفضل المطاعم</CardTitle>
                <CardDescription>
                  المطاعم الأكثر مبيعاً في الشهر الحالي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopRestaurants restaurants={topRestaurants} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>تنبيهات النظام</CardTitle>
                <CardDescription>
                  آخر التنبيهات والتحذيرات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SystemAlerts alerts={systemAlerts} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>معاملات البطاقات الافتراضية</CardTitle>
              <CardDescription>
                قائمة بآخر المعاملات المالية على النظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentOrders />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>تحليلات متقدمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
                <p className="text-muted-foreground">قريباً - تحليلات متقدمة للمعاملات والمبيعات</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>التقارير الدورية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
                <p className="text-muted-foreground">قريباً - إمكانية إنشاء وتصدير تقارير متنوعة</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
