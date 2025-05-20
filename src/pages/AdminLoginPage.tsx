
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isRTL } = useLanguage();
  const { theme } = useTheme();

  // Check if there's a saved username
  useEffect(() => {
    const savedUsername = localStorage.getItem('adminUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
    
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/admin');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication check (in a real app, this would be handled securely on the backend)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        // Set admin authentication in localStorage
        localStorage.setItem('adminAuthenticated', 'true');
        
        // Save username if remember me is checked
        if (rememberMe) {
          localStorage.setItem('adminUsername', username);
        } else {
          localStorage.removeItem('adminUsername');
        }

        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة الإدارة",
          variant: "default",
        });
        navigate('/admin');
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "اسم المستخدم أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg animate-fade-in border-t-4 border-teal-500 dark:border-teal-400">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-3xl font-bold text-white">ST</span>
            </div>
            <CardTitle className="text-2xl font-bold">تسجيل دخول الأدمن</CardTitle>
            <CardDescription className="text-base">يرجى تسجيل الدخول للوصول إلى لوحة الإدارة</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <label htmlFor="username" className="text-sm font-medium block mb-2">
                    اسم المستخدم
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 transform -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      required
                      className={`w-full pr-10 rtl:pr-4 rtl:pl-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium block mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute top-1/2 transform -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`w-full pr-10 rtl:pr-4 rtl:pl-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 h-4 w-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="remember-me">تذكرني</label>
                </div>
                <a href="#" className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300">
                  نسيت كلمة المرور؟
                </a>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 transition-colors" 
                disabled={isLoading}
              >
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                هل تحتاج إلى مساعدة؟ <a href="#" className="text-teal-600 hover:underline dark:text-teal-400">تواصل مع الدعم الفني</a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
