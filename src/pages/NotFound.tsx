
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-red-500 dark:text-red-400 mb-6">404</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">الصفحة غير موجودة</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          المسار <span className="font-mono bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">{location.pathname}</span> غير متوفر
        </p>
        <Link 
          to="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
