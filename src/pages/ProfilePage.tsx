
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const ProfilePage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // التحقق من حالة تسجيل الدخول
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-64 w-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </h1>
          
          <ProfileTabs />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
