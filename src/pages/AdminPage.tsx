
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Search, 
  LogOut, 
  Moon, 
  Sun, 
  Menu,
  X,
  AlertCircle
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
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from '@/contexts/LanguageContext';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'تم إضافة مطعم جديد', time: 'منذ 5 دقائق', read: false },
    { id: 2, text: 'طلب جديد بقيمة 120 ST', time: 'منذ 10 دقائق', read: false },
    { id: 3, text: 'تقرير المبيعات الأسبوعي جاهز', time: 'منذ 30 دقيقة', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { isRTL } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check if screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if admin is authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth !== 'true') {
      toast({
        title: "غير مصرح",
        description: "يجب تسجيل الدخول للوصول إلى لوحة الإدارة",
        variant: "destructive",
      });
      navigate('/admin-login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, toast]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: "قسم جديد",
      description: `تم الانتقال إلى ${getTabTitle(value)}`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
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

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "قراءة الإشعارات",
      description: "تم تعيين جميع الإشعارات كمقروءة",
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

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isAuthenticated) {
    return null; // Return null while checking authentication
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <AdminSidebar 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </div>

        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-50 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">قائمة</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? "right" : "left"} className="p-0 w-64 border-r">
            <AdminSidebar 
              activeTab={activeTab}
              onTabChange={handleTabChange}
              collapsed={false}
              setCollapsed={() => {}}
            />
          </SheetContent>
        </Sheet>

        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:mr-16' : 'md:mr-64'} rtl:md:mr-0 rtl:md:ml-64 ${sidebarCollapsed ? 'rtl:md:ml-16' : ''}`}>
          {/* Top Bar */}
          <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white font-cairo truncate">
                {getTabTitle(activeTab)}
              </h1>
              {activeTab === 'dashboard' && (
                <Badge variant="outline" className="hidden md:flex bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300">
                  مباشر
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative md:block hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث..."
                  className="py-2 pl-10 pr-4 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white text-sm md:w-[200px] lg:w-[300px]"
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold">الإشعارات</h3>
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        تعيين الكل كمقروء
                      </Button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          لا توجد إشعارات
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div 
                            key={notif.id}
                            className={`p-3 border-b border-gray-100 dark:border-gray-700 flex items-start gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                              !notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                          >
                            <div className={`mt-1 p-1 rounded-full ${!notif.read ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                              <AlertCircle className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notif.text}</p>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{notif.time}</span>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 rounded-full bg-teal-500" />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                      <Button variant="ghost" size="sm" className="text-teal-600 dark:text-teal-400 text-sm">
                        عرض كل الإشعارات
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden sm:flex">
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden sm:flex">
                <LogOut className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 ml-2 md:ml-4">
                <div className="hidden sm:block text-right rtl:text-left">
                  <p className="text-sm font-medium truncate dark:text-white">مدير النظام</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@steats.com</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold">
                  م
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4 md:p-6">
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

          {/* Footer */}
          <footer className="border-t border-gray-200 dark:border-gray-700 p-4 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} ST Eats. جميع الحقوق محفوظة
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  سياسة الخصوصية
                </a>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  الشروط والأحكام
                </a>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                  المساعدة
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
