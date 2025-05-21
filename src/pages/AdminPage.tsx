
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminContent from '@/components/admin/AdminContent';
import AdminFooter from '@/components/admin/AdminFooter';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // التحقق من صلاحية المستخدم الحالي
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        setLoading(true);
        
        // التحقق من وجود جلسة
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // إذا لم يكن المستخدم مسجل الدخول، توجيهه إلى صفحة تسجيل دخول المدير
          toast({
            title: "غير مصرح",
            description: "يجب تسجيل الدخول للوصول إلى لوحة الإدارة",
            variant: "destructive",
          });
          navigate('/admin-login');
          return;
        }
        
        // التحقق من صلاحية المستخدم (هل هو مدير؟)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          toast({
            title: "خطأ في التحقق من الصلاحيات",
            description: "حدث خطأ أثناء التحقق من صلاحياتك. يرجى المحاولة مرة أخرى.",
            variant: "destructive",
          });
          navigate('/admin-login');
          return;
        }
        
        if (!profile || profile.user_type !== 'admin') {
          // إذا لم يكن المستخدم مديرًا، توجيهه إلى الصفحة الرئيسية
          toast({
            title: "وصول مرفوض",
            description: "لا تملك الصلاحية للوصول إلى لوحة الإدارة",
            variant: "destructive",
          });
          navigate('/');
          return;
        }
        
        // المستخدم مدير، السماح بالوصول
        setIsAdmin(true);
      } catch (error) {
        console.error('Authentication error:', error);
        toast({
          title: "خطأ في المصادقة",
          description: "حدث خطأ أثناء التحقق من هويتك. يرجى تسجيل الدخول مرة أخرى.",
          variant: "destructive",
        });
        navigate('/admin-login');
      } finally {
        setLoading(false);
      }
    };
    
    checkUserAuth();
  }, [navigate, toast]);

  // التحقق من حجم الشاشة عند التحميل وعند تغييرها
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // طي الشريط الجانبي تلقائيًا على الشاشات الصغيرة
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };
    
    // فحص مبدئي
    checkScreenSize();
    
    // إضافة مستمع للحدث
    window.addEventListener('resize', checkScreenSize);
    
    // التنظيف
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [sidebarCollapsed]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // على الهواتف المحمولة، عرض إشعار
    if (isMobile) {
      toast({
        title: "قسم جديد",
        description: `تم الانتقال إلى ${getTabTitle(value)}`,
      });
    }
    
    // طي الشريط الجانبي تلقائيًا على الهواتف المحمولة عند تغيير التبويبات
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // عدم عرض أي محتوى حتى الانتقال إلى صفحة تسجيل الدخول
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
        <AdminLayout
          activeTab={activeTab}
          onTabChange={handleTabChange}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
        >
          <div className="flex flex-col min-h-screen">
            <AdminHeader 
              activeTab={activeTab}
              handleLogout={handleLogout}
            />
            
            <div className="flex-grow">
              <AdminContent 
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            
            <AdminFooter />
          </div>
        </AdminLayout>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
