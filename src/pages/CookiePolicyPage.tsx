
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const CookiePolicyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">{t('cookiePolicy')}</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-4">1. ما هي ملفات تعريف الارتباط؟</h2>
            <p className="mb-4">
              ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك عند زيارة موقعنا. وهي تستخدم على نطاق واسع لتشغيل المواقع أو جعلها تعمل بشكل أكثر كفاءة، وكذلك لتزويد معلومات لأصحاب الموقع.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">2. كيف نستخدم ملفات تعريف الارتباط</h2>
            <p className="mb-4">
              نستخدم ملفات تعريف الارتباط لتذكر تفضيلاتك، وتحسين تجربة المستخدم، وقياس فعالية المحتوى والإعلانات، وتقديم ميزات وسائل التواصل الاجتماعي، وتخصيص المحتوى والإعلانات.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. أنواع ملفات تعريف الارتباط التي نستخدمها</h2>
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2">
                <strong>ملفات تعريف الارتباط الضرورية:</strong> هذه ضرورية لعمل موقعنا وتطبيقنا ولا يمكن إيقاف تشغيلها.
              </li>
              <li className="mb-2">
                <strong>ملفات تعريف الارتباط التحليلية:</strong> تساعدنا على فهم كيفية استخدام الزوار لموقعنا، مما يسمح لنا بتحسين الخدمة.
              </li>
              <li className="mb-2">
                <strong>ملفات تعريف الارتباط الوظيفية:</strong> تتيح لنا تذكر تفضيلاتك وخياراتك.
              </li>
              <li className="mb-2">
                <strong>ملفات تعريف الارتباط الخاصة بالإعلانات:</strong> تستخدم لتقديم إعلانات ذات صلة بك وباهتماماتك.
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">4. إدارة ملفات تعريف الارتباط</h2>
            <p className="mb-4">
              يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات متصفحك، والتي تسمح لك برفض بعض أو كل ملفات تعريف الارتباط. ومع ذلك، يرجى ملاحظة أن حظر جميع ملفات تعريف الارتباط قد يؤثر على تجربة المستخدم والأداء.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">5. ملفات تعريف الارتباط الخاصة بالجهات الخارجية</h2>
            <p className="mb-4">
              قد يحتوي موقعنا وتطبيقنا على ملفات تعريف ارتباط من مواقع الجهات الخارجية، مثل خدمات التحليلات ومنصات وسائل التواصل الاجتماعي. لا نتحكم في هذه الملفات، لذا يرجى الرجوع إلى سياسات الخصوصية الخاصة بهذه الجهات الخارجية.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">6. التغييرات على هذه السياسة</h2>
            <p className="mb-4">
              قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر. سنخطرك بأي تغييرات مهمة.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">7. اتصل بنا</h2>
            <p className="mb-4">
              إذا كانت لديك أي أسئلة حول كيفية استخدامنا لملفات تعريف الارتباط، يرجى الاتصال بنا من خلال قسم الدعم في التطبيق.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
