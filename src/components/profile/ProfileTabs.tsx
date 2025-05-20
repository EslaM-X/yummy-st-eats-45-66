
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import ProfileInfoForm from './ProfileInfoForm';
import TransactionsTab from './TransactionsTab';

const ProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const { language } = useLanguage();

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="profile">
          {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
        </TabsTrigger>
        <TabsTrigger value="transactions">
          {language === 'ar' ? 'المعاملات' : 'Transactions'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'معلومات الملف الشخصي' : 'Profile Information'}</CardTitle>
            <CardDescription>
              {language === 'ar' 
                ? 'تحديث معلومات ملفك الشخصي وتفضيلاتك'
                : 'Update your profile information and preferences'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileInfoForm />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="transactions">
        <TransactionsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
