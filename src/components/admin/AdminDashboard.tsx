
import React from 'react';
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

const AdminDashboard: React.FC = () => {
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
          percentageChange={12}
          trend="up"
          description="مستخدم نشط"
          icon={<Users className="h-5 w-5" />}
          color="blue"
        />
        <StatCard
          title="الطلبات"
          value="845"
          percentageChange={-3.5}
          trend="down"
          description="طلب هذا الشهر"
          icon={<ShoppingBag className="h-5 w-5" />}
          color="amber"
        />
        <StatCard
          title="المبيعات"
          value="13,249"
          suffix="ريال"
          percentageChange={8.3}
          trend="up"
          description="إجمالي المبيعات"
          icon={<TrendingUp className="h-5 w-5" />}
          color="green"
        />
        <StatCard
          title="التنبيهات"
          value="5"
          percentageChange={0}
          trend="neutral"
          description="تنبيهات نشطة"
          icon={<AlertCircle className="h-5 w-5" />}
          color="red"
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
                <SalesChart />
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
                <TopRestaurants />
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
                <SystemAlerts />
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
