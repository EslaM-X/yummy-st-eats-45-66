import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Lock, Users, User, Database, FileText, RefreshCcw, MessageCircle, Share2 } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <Lock className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">{t('privacyPolicy')}</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'en' 
                ? "We are committed to protecting your privacy and personal data." 
                : "نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية."}
            </p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? "1. Information Collection" : "١. جمع المعلومات"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "We collect information you provide when using the ST Eats application, including account information, order details, transaction history, and location data."
                    : "نجمع المعلومات التي تقدمها لنا عند استخدام تطبيق ST Eats، بما في ذلك معلومات الحساب وتفاصيل الطلبات وسجل المعاملات وبيانات الموقع."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? "2. Use of Information" : "٢. استخدام المعلومات"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "We use your information to provide delivery services, process payments, improve user experience, send relevant updates and offers, and comply with legal obligations."
                    : "نستخدم معلوماتك لتقديم خدمات التوصيل، ومعالجة المدفوعات، وتحسين تجربة المستخدم، وإرسال التحديثات والعروض ذات الصلة، والامتثال للالتزامات القانونية."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? "3. Information Sharing" : "٣. مشاركة المعلومات"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "We share your information with restaurants and drivers to facilitate delivery orders. We may also share information with third-party service providers who help us operate the application."
                    : "نشارك معلوماتك مع المطاعم والسائقين لتسهيل طلبات التوصيل. قد نشارك أيضًا المعلومات مع مقدمي الخدمات الخارجيين الذين يساعدوننا في تشغيل التطبيق."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? "4. Data Security" : "٤. أمان البيانات"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "We employ reasonable security measures to protect your information from unauthorized access, alteration, or disclosure. However, no security of data transmitted over the internet can be guaranteed."
                    : "نستخدم تدابير أمنية معقولة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الإفصاح. ومع ذلك، لا يمكن ضمان أمن البيانات المنقولة عبر الإنترنت."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? "5. Your Rights" : "٥. حقوقك"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "You have the right to access, correct, and delete your personal information. You can also opt out of marketing communications at any time."
                    : "لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها وحذفها. يمكنك أيضًا الانسحاب من اتصالات التسويق في أي وقت."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <RefreshCcw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? "6. Changes to This Policy" : "٦. التغييرات على هذه السياسة"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "We may update this privacy policy from time to time. We will notify you of any significant changes."
                    : "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات مهمة."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? "7. Contact Us" : "٧. اتصل بنا"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "If you have any questions about your privacy or how we use your information, please contact us through the support section in the application."
                    : "إذا كان لديك أي أسئلة حول خصوصيتك أو كيفية استخدام معلوماتك، فيرجى الاتصال بنا من خلال قسم الدعم في التطبيق."}
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === 'en' 
                  ? "Last updated: May 12, 2024"
                  : "آخر تحديث: 12 مايو 2024"}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
