
import React from 'react';

const AdminFooter: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 p-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ST Eats. جميع الحقوق محفوظة
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
            سياسة الخصوصية
          </a>
          <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
            الشروط والأحكام
          </a>
          <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
            المساعدة
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
