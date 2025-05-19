
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsConditionsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">{t('termsConditions')}</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-4">1. {t('termsConditions')}</h2>
            <p className="mb-4">
              هذه الشروط والأحكام تحكم استخدامك لتطبيق ST Eats للطعام. باستخدام التطبيق، فإنك توافق على الالتزام بهذه الشروط. يرجى قراءتها بعناية.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">2. استخدام الخدمة</h2>
            <p className="mb-4">
              يجب أن تكون فوق 18 عامًا لاستخدام خدماتنا. أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. طلبات الطعام</h2>
            <p className="mb-4">
              عند تقديم طلب من خلال تطبيقنا، فإنك تبرم عقدًا مع المطعم المعني وليس مع ST Eats. نحن نعمل كوسيط لتسهيل المعاملات.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">4. التوصيل والمدفوعات</h2>
            <p className="mb-4">
              قد تختلف أوقات التسليم المقدرة حسب عوامل مثل حركة المرور والطقس. نحن نقبل المدفوعات من خلال عملة ST الرقمية. جميع الأسعار تشمل الضرائب المطبقة.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">5. سياسة الإلغاء</h2>
            <p className="mb-4">
              يمكنك إلغاء طلبك واسترداد المبلغ بالكامل قبل بدء المطعم في تحضير طعامك. بمجرد بدء التحضير، قد لا يكون الإلغاء والاسترداد ممكنًا.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">6. تغييرات الشروط</h2>
            <p className="mb-4">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بالتغييرات المهمة عبر البريد الإلكتروني أو إشعارات التطبيق.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">7. الاتصال</h2>
            <p className="mb-4">
              إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا من خلال قسم الدعم في التطبيق.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditionsPage;
