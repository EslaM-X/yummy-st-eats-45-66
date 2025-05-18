
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 dark:bg-gray-900 dark:text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <img 
            src="/lovable-uploads/b1796902-3206-4112-a199-07b14b0b76de.png" 
            alt="ST Coin Logo" 
            className="h-12 w-12 mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
            ST<span className="text-teal-400 ml-1">🍕 Eat</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className="font-semibold text-lg text-white dark:text-gray-200 mb-3">روابط سريعة</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow-500 transition-colors duration-200">الرئيسية</Link></li>
              <li><Link to="/restaurants" className="hover:text-yellow-500 transition-colors duration-200">المطاعم</Link></li>
              <li><Link to="/products" className="hover:text-yellow-500 transition-colors duration-200">المنتجات</Link></li>
              <li><Link to="/wallet" className="hover:text-yellow-500 transition-colors duration-200">المحفظة</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-lg text-white dark:text-gray-200 mb-3">قانوني</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">سياسة ملفات الارتباط</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-lg text-white dark:text-gray-200 mb-3">تواصل معنا</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">فيسبوك</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">تويتر</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors duration-200">انستجرام</a></li>
            </ul>
          </div>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ST Eats. جميع الحقوق محفوظة.
        </p>
         <p className="text-xs mt-2">
          تطبيق تجريبي تم إنشاؤه بواسطة Lovable.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
