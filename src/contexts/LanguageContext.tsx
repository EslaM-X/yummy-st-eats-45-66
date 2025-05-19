import React, { createContext, useState, useEffect, useContext } from 'react';
import arTranslations from '@/locales/ar.json';
import enTranslations from '@/locales/en.json';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<string, any> = {
  ar: {
    home: 'الرئيسية',
    restaurants: 'المطاعم',
    products: 'المنتجات',
    rewards: 'المكافآت',
    cart: 'السلة',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    language: 'اللغة',
    darkMode: 'الوضع المظلم',
    lightMode: 'الوضع المضيء',
    closeMenu: 'إغلاق القائمة',
    openMenu: 'فتح القائمة',
    searchPlaceholder: 'البحث عن منتجات...',
    filter: 'تصفية',
    categories: 'التصنيفات',
    price: 'السعر',
    rating: 'التقييم',
    all: 'الكل',
    addToCart: 'أضف إلى السلة',
    viewDetails: 'عرض التفاصيل',
    processing: 'جاري المعالجة',
    payNow: 'ادفع الآن',
    addYourFood: 'أضف طعامك',
  },
  en: {
    home: 'Home',
    restaurants: 'Restaurants',
    products: 'Products',
    rewards: 'Rewards',
    cart: 'Cart',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    closeMenu: 'Close Menu',
    openMenu: 'Open Menu',
    searchPlaceholder: 'Search products...',
    filter: 'Filter',
    categories: 'Categories',
    price: 'Price',
    rating: 'Rating',
    all: 'All',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    processing: 'Processing',
    payNow: 'Pay Now',
    addYourFood: 'Add Your Food',
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  setLanguage: () => {},
  t: (key: string) => key,
  isRTL: true,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('st-eats-language');
    return (savedLanguage as Language) || 'ar';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('st-eats-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Add language-specific class for styling
    document.documentElement.classList.remove('lang-ar', 'lang-en');
    document.documentElement.classList.add(`lang-${language}`);
  }, [language, isRTL]);

  const t = (key: string): string => {
    if (!key) return '';
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
