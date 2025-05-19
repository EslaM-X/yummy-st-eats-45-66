
import React from 'react';
import { 
  BarChart,
  PieChart,
  LineChart,
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Utensils, 
  AlertTriangle 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const AdminDashboard: React.FC = () => {
  // Mock data
  const recentOrders = [
    { id: 'ORD-7243', customer: 'أحمد محمد', amount: 145, status: 'مكتمل', time: 'منذ 10 دقائق' },
    { id: 'ORD-7244', customer: 'نورة سعد', amount: 67, status: 'قيد التوصيل', time: 'منذ 27 دقيقة' },
    { id: 'ORD-7245', customer: 'عبدالله خالد', amount: 89, status: 'قيد التحضير', time: 'منذ 35 دقيقة' },
    { id: 'ORD-7246', customer: 'سارة علي', amount: 120, status: 'مكتمل', time: 'منذ 45 دقيقة' },
    { id: 'ORD-7247', customer: 'محمد عمر', amount: 240, status: 'ملغي', time: 'منذ ساعة' },
  ];

  const topRestaurants = [
    { name: 'مطعم البيت السوري', orders: 142, rating: 4.8 },
    { name: 'بيتزا الشام', orders: 128, rating: 4.6 },
    { name: 'برجر فاكتوري', orders: 98, rating: 4.5 },
    { name: 'شاورما على كيفك', orders: 87, rating: 4.4 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'قيد التوصيل': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'قيد التحضير': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'ملغي': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">إجمالي الطلبات</p>
                <h3 className="text-2xl font-bold mt-1">1,249</h3>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" /> +12.5% هذا الشهر
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center dark:bg-yellow-900">
                <ShoppingBag className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">العملاء</p>
                <h3 className="text-2xl font-bold mt-1">842</h3>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" /> +8.1% هذا الشهر
                </p>
              </div>
              <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center dark:bg-teal-900">
                <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">المطاعم</p>
                <h3 className="text-2xl font-bold mt-1">156</h3>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" /> +3.2% هذا الشهر
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center dark:bg-purple-900">
                <Utensils className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">الإيرادات</p>
                <h3 className="text-2xl font-bold mt-1">25,430 ST</h3>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" /> +18.3% هذا الشهر
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900">
                <BarChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Sales Chart Card */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle>المبيعات اليومية</CardTitle>
            <CardDescription>آخر 7 أيام</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex justify-center items-center">
            <div className="w-full h-full flex items-center justify-center">
              {/* Placeholder for chart */}
              <div className="relative w-full h-60">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-500/20 to-teal-500/5 h-40 rounded-md"></div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-40 px-4">
                  {[35, 55, 25, 60, 28, 80, 45].map((height, i) => (
                    <div key={i} className="relative">
                      <div 
                        className="bg-teal-500 hover:bg-teal-600 w-8 rounded-t-md transition-all duration-200 cursor-pointer" 
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                        {['س', 'أ', 'ن', 'ث', 'خ', 'ج', 'ش'][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute -right-4 top-0 bottom-0 flex flex-col justify-between py-2">
                  {[0, 500, 1000, 1500, 2000].reverse().map((value, i) => (
                    <span key={i} className="text-xs text-gray-500">{value}</span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Stats Card */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>توزيع الطلبات</CardTitle>
            <CardDescription>حسب الحالة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              {/* Placeholder for pie chart */}
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full border-8 border-r-teal-500 border-yellow-500 border-b-blue-500 border-l-red-400 transform rotate-45"></div>
                <div className="absolute inset-8 bg-white dark:bg-gray-800 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-teal-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">مكتمل</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">58%</span>
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">قيد التحضير</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">24%</span>
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-blue-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">قيد التوصيل</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">13%</span>
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '13%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-red-400 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">ملغي</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">5%</span>
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>آخر الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase border-b dark:border-gray-700">
                  <th className="px-4 py-3 text-right rtl:text-left">رقم الطلب</th>
                  <th className="px-4 py-3 text-right rtl:text-left">العميل</th>
                  <th className="px-4 py-3 text-right rtl:text-left">المبلغ</th>
                  <th className="px-4 py-3 text-right rtl:text-left">الحالة</th>
                  <th className="px-4 py-3 text-right rtl:text-left">الوقت</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 text-sm">{order.id}</td>
                    <td className="px-4 py-3 text-sm">{order.customer}</td>
                    <td className="px-4 py-3 text-sm">{order.amount} ST</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Restaurants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أفضل المطاعم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {topRestaurants.map((restaurant, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold mr-3 rtl:mr-0 rtl:ml-3">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{restaurant.name}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          {restaurant.rating} ★
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {restaurant.orders} طلب
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Progress value={restaurant.orders / 1.5} className="w-24 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>تنبيهات النظام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                <div>
                  <h5 className="font-medium text-yellow-800 dark:text-yellow-400">مشكلة في المخزون</h5>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    هناك 5 أطعمة غير متوفرة في المخزون لمطعم "بيتزا الشام". يرجى التحقق.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-0.5" />
                <div>
                  <h5 className="font-medium text-blue-800 dark:text-blue-400">تأخير في التوصيل</h5>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    تم الإبلاغ عن تأخير متكرر في منطقة "العليا". يرجى مراجعة الموزعين.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                <AlertTriangle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                <div>
                  <h5 className="font-medium text-green-800 dark:text-green-400">تحديث النظام</h5>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    هناك تحديث جديد متاح للنظام. يرجى تثبيته في غضون 48 ساعة.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
