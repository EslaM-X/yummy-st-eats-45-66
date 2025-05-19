
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  ShoppingBag, 
  Settings, 
  Bell, 
  Search, 
  LogOut, 
  Moon, 
  Sun 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminRestaurants from '@/components/admin/AdminRestaurants';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: "قسم جديد",
      description: `تم الانتقال إلى ${getTabTitle(value)}`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    toast({
      title: "تغيير المظهر",
      description: theme === 'dark' ? "تم تغيير المظهر إلى الوضع النهاري" : "تم تغيير المظهر إلى الوضع الليلي",
    });
  };

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'لوحة التحكم';
      case 'users': return 'المستخدمين';
      case 'restaurants': return 'المطاعم';
      case 'orders': return 'الطلبات';
      case 'settings': return 'الإعدادات';
      default: return '';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AdminSidebar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'mr-16' : 'mr-64'} rtl:mr-0 rtl:ml-64`}>
          {/* Top Bar */}
          <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white font-cairo">
                {getTabTitle(activeTab)}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث..."
                  className="py-2 pl-10 pr-4 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white text-sm w-[200px] md:w-[300px]"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative" onClick={() => toast({ title: "إشعارات", description: "لا توجد إشعارات جديدة" })}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
              </Button>
              
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 ml-4">
                <div className="text-right">
                  <p className="text-sm font-medium dark:text-white">مدير النظام</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@steats.com</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                  م
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
              <TabsList className="hidden">
                <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
                <TabsTrigger value="users">المستخدمين</TabsTrigger>
                <TabsTrigger value="restaurants">المطاعم</TabsTrigger>
                <TabsTrigger value="orders">الطلبات</TabsTrigger>
                <TabsTrigger value="settings">الإعدادات</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-4 animate-fade-in">
                <AdminDashboard />
              </TabsContent>
              
              <TabsContent value="users" className="space-y-4 animate-fade-in">
                <AdminUsers />
              </TabsContent>
              
              <TabsContent value="restaurants" className="space-y-4 animate-fade-in">
                <AdminRestaurants />
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-4 animate-fade-in">
                <AdminOrders />
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4 animate-fade-in">
                <AdminSettings />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
