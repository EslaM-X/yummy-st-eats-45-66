import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Shield, Users, ShoppingBag, Truck, RefreshCcw, MessageCircle } from 'lucide-react';

const TermsConditionsPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
              <FileText className="h-8 w-8 text-purple-600 dark:text-purple-300" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">{t('termsConditions')}</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'en' 
                ? "Please read these terms carefully before using our services." 
                : "يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا."}
            </p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  {language === 'en' ? "1. Terms and Conditions" : "١. الشروط والأحكام"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "These terms and conditions govern your use of the ST Eats food application. By using the application, you agree to comply with these terms. Please read them carefully."
                    : "هذه الشروط والأحكام تحكم استخدامك لتطبيق ST Eats للطعام. باستخدام التطبيق، فإنك توافق على الالتزام بهذه الشروط. يرجى قراءتها بعناية."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  {language === 'en' ? "2. Use of Service" : "٢. استخدام الخدمة"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "You must be over 18 years of age to use our services. You are responsible for maintaining the confidentiality of your account information and password."
                    : "يجب أن تكون فوق 18 عامًا لاستخدام خدماتنا. أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <ShoppingBag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  {language === 'en' ? "3. Food Orders" : "٣. طلبات الطعام"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "When you place an order through our application, you enter into a contract with the restaurant in question, not with ST Eats. We act as an intermediary to facilitate transactions."
                    : "عند تقديم طلب من خلال تطبيقنا، فإنك تبرم عقدًا مع المطعم المعني وليس مع ST Eats. نحن نعمل كوسيط لتسهيل المعاملات."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  {language === 'en' ? "4. Delivery and Payments" : "٤. التوصيل والمدفوعات"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "Estimated delivery times may vary depending on factors such as traffic and weather. We accept payments through ST digital currency. All prices include applicable taxes."
                    : "قد تختلف أوقات التسليم المقدرة حسب عوامل مثل حركة المرور والطقس. نحن نقبل المدفوعات من خلال عملة ST الرقمية. جميع الأسعار تشمل الضرائب المطبقة."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <RefreshCcw className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  {language === 'en' ? "5. Cancellation Policy" : "٥. سياسة الإلغاء"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "You may cancel your order and receive a full refund before the restaurant begins preparing your food. Once preparation has started, cancellation and refund may not be possible."
                    : "يمكنك إلغاء طلبك واسترداد المبلغ بالكامل قبل بدء المطعم في تحضير طعامك. بمجرد بدء التحضير، قد لا يكون الإلغاء والاسترداد ممكنًا."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  {language === 'en' ? "6. Changes to Terms" : "٦. تغييرات الشروط"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or application notifications."
                    : "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بالتغييرات المهمة عبر البريد الإلكتروني أو إشعارات التطبيق."}
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                  <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  {language === 'en' ? "7. Contact" : "٧. الاتصال"}
                </h2>
                <p className="mb-4">
                  {language === 'en' 
                    ? "If you have any questions about these terms, please contact us through the support section in the application."
                    : "إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا من خلال قسم الدعم في التطبيق."}
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === 'en' 
                  ? "Last updated: May 10, 2024"
                  : "آخر تحديث: 10 مايو 2024"}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditionsPage;
