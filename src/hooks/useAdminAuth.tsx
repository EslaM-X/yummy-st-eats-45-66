
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
    navigate('/');
  };

  return { isAuthenticated, handleLogout };
};
