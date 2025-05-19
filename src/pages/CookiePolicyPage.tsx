import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cookie, Info, Settings, Globe, Tag, RefreshCcw, FileText, MessageCircle } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 mb-4">
              <Cookie className="h-8 w-8 text-amber-600 dark:text-amber-300" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">{t('cookiePolicy')}</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'en' 
                ? "Information about how we use cookies and similar technologies on our platform." 
                : "معلومات حول كيفية استخدامنا لملفات تعريف الارتباط والتقنيات المشابهة على منصتنا."}
            </p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  {language === 'en' ? "1. What Are Cookies?" : "١. ما هي ملفات تعريف الارتباط؟"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "Cookies are small text files that are placed on your device when you visit our site. They are widely used to make websites work or work more efficiently, as well as to provide information to the site owners."
                    : "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك عند زيارة موقعنا. وهي تستخدم على نطاق واسع لتشغيل المواقع أو جعلها تعمل بشكل أكثر كفاءة، وكذلك لتزويد معلومات لأصحاب الموقع."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  {language === 'en' ? "2. How We Use Cookies" : "٢. كيف نستخدم ملفات تعريف الارتباط"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "We use cookies to remember your preferences, improve user experience, measure the effectiveness of content and advertisements, provide social media features, and personalize content and ads."
                    : "نستخدم ملفات تعريف الارتباط لتذكر تفضيلاتك، وتحسين تجربة المستخدم، وقياس فعالية المحتوى والإعلانات، وتقديم ميزات وسائل التواصل الاجتماعي، وتخصيص المحتوى والإعلانات."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Tag className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  {language === 'en' ? "3. Types of Cookies We Use" : "٣. أنواع ملفات تعريف الارتباط التي نستخدمها"}
                </h2>
                <ul className="list-disc space-y-3 pl-5 mb-4">
                  <li>
                    <strong>
                      {language === 'en' ? "Necessary Cookies:" : "ملفات تعريف الارتباط الضرورية:"}
                    </strong> 
                    {language === 'en' 
                      ? " These are essential for our website and application to function and cannot be switched off."
                      : " هذه ضرورية لعمل موقعنا وتطبيقنا ولا يمكن إيقاف تشغيلها."}
                  </li>
                  <li>
                    <strong>
                      {language === 'en' ? "Analytical Cookies:" : "ملفات تعريف الارتباط التحليلية:"}
                    </strong> 
                    {language === 'en' 
                      ? " Help us understand how visitors use our site, allowing us to improve the service."
                      : " تساعدنا على فهم كيفية استخدام الزوار لموقعنا، مما يسمح لنا بتحسين الخدمة."}
                  </li>
                  <li>
                    <strong>
                      {language === 'en' ? "Functional Cookies:" : "ملفات تعريف الارتباط الوظيفية:"}
                    </strong> 
                    {language === 'en' 
                      ? " Allow us to remember your preferences and choices."
                      : " تتيح لنا تذكر تفضيلاتك وخياراتك."}
                  </li>
                  <li>
                    <strong>
                      {language === 'en' ? "Advertising Cookies:" : "ملفات تعريف الارتباط الخاصة بالإعلانات:"}
                    </strong> 
                    {language === 'en' 
                      ? " Used to deliver advertisements more relevant to you and your interests."
                      : " تستخدم لتقديم إعلانات ذات صلة بك وباهتماماتك."}
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Settings className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  {language === 'en' ? "4. Managing Cookies" : "٤. إدارة ملفات تعريف الارتباط"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "You can manage cookie preferences through your browser settings, which allow you to refuse some or all cookies. However, please note that blocking all cookies may affect your user experience and performance."
                    : "يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات متصفحك، والتي تسمح لك برفض بعض أو كل ملفات تعريف الارتباط. ومع ذلك، يرجى ملاحظة أن حظر جميع ملفات تعريف الارتباط قد يؤثر على تجربة المستخدم والأداء."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  {language === 'en' ? "5. Third-Party Cookies" : "٥. ملفات تعريف الارتباط الخاصة بالجهات الخارجية"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "Our website and application may contain cookies from third-party websites, such as analytics services and social media platforms. We do not control these cookies, so please refer to the privacy policies of these third parties."
                    : "قد يحتوي موقعنا وتطبيقنا على ملفات تعريف ارتباط من مواقع الجهات الخارجية، مثل خدمات التحليلات ومنصات وسائل التواصل الاجتماعي. لا نتحكم في هذه الملفات، لذا يرجى الرجوع إلى سياسات الخصوصية الخاصة بهذه الجهات الخارجية."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <RefreshCcw className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  {language === 'en' ? "6. Changes to This Policy" : "٦. التغييرات على هذه السياسة"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "We may update this cookie policy from time to time. We will notify you of any significant changes."
                    : "قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر. سنخطرك بأي تغييرات مهمة."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <MessageCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  {language === 'en' ? "7. Contact Us" : "٧. اتصل بنا"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "If you have any questions about how we use cookies, please contact us through the support section in the application."
                    : "إذا كانت لديك أي أسئلة حول كيفية استخدامنا لملفات تعريف الارتباط، يرجى الاتصال بنا من خلال قسم الدعم في التطبيق."}
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'en' 
                    ? "Last updated: May 15, 2024"
                    : "آخر تحديث: 15 مايو 2024"}
                </p>
                <button className="mt-4 sm:mt-0 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors">
                  {language === 'en' ? "Cookie Settings" : "إعدادات ملفات تعريف الارتباط"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
