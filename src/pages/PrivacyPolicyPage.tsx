
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">{t('privacyPolicy')}</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-4">1. جمع المعلومات</h2>
            <p className="mb-4">
              نجمع المعلومات التي تقدمها لنا عند استخدام تطبيق ST Eats، بما في ذلك معلومات الحساب وتفاصيل الطلبات وسجل المعاملات وبيانات الموقع.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">2. استخدام المعلومات</h2>
            <p className="mb-4">
              نستخدم معلوماتك لتقديم خدمات التوصيل، ومعالجة المدفوعات، وتحسين تجربة المستخدم، وإرسال التحديثات والعروض ذات الصلة، والامتثال للالتزامات القانونية.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. مشاركة المعلومات</h2>
            <p className="mb-4">
              نشارك معلوماتك مع المطاعم والسائقين لتسهيل طلبات التوصيل. قد نشارك أيضًا المعلومات مع مقدمي الخدمات الخارجيين الذين يساعدوننا في تشغيل التطبيق.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">4. أمان البيانات</h2>
            <p className="mb-4">
              نستخدم تدابير أمنية معقولة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الإفصاح. ومع ذلك، لا يمكن ضمان أمن البيانات المنقولة عبر الإنترنت.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">5. حقوقك</h2>
            <p className="mb-4">
              لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها وحذفها. يمكنك أيضًا الانسحاب من اتصالات التسويق في أي وقت.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">6. التغييرات على هذه السياسة</h2>
            <p className="mb-4">
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات مهمة.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">7. اتصل بنا</h2>
            <p className="mb-4">
              إذا كان لديك أي أسئلة حول خصوصيتك أو كيفية استخدام معلوماتك، فيرجى الاتصال بنا من خلال قسم الدعم في التطبيق.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
