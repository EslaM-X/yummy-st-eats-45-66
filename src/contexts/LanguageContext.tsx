
import React, { createContext, useState, useEffect, useContext } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  ar: {
    // الرئيسية
    'home': 'الرئيسية',
    'deliverySlogan': 'أشهى الأطعمة تصلك أينما كنت!',
    'deliveryDescription': 'اكتشف مطاعم متنوعة، اطلب طعامك المفضل، وادفع بسهولة بعملة ST الرقمية.',
    'search': 'ابحث',
    'searchPlaceholder': 'ابحث عن مطعم أو طبق...',
    'restaurantOwner': 'هل أنت صاحب مطعم؟',
    'restaurantOwnerDesc': 'انضم إلى منصتنا ووسع قاعدة عملائك. نقبل المطاعم الكبيرة والمشاريع المنزلية الصغيرة.',
    'registerRestaurant': 'سجل مطعمك الآن',
    
    // القائمة
    'restaurants': 'المطاعم',
    'products': 'المنتجات',
    'rewards': 'المكافآت',
    'wallet': 'المحفظة',
    'cart': 'عربة التسوق',
    'login': 'تسجيل الدخول',
    'addToCart': 'أضف للسلة',
    'added': 'تمت إضافة',
    'toCart': 'إلى سلة التسوق',
    'favorite': 'المفضلة',
    'addedToFavorites': 'تم إضافة',
    'removedFromFavorites': 'تم إزالة',
    'from': 'من',
    'to': 'إلى',
    
    // المنتجات
    'bestSellers': 'الأكثر مبيعاً',
    'allProducts': 'كل المنتجات',
    'loadMore': 'تحميل المزيد',
    'noProducts': 'لا توجد منتجات متطابقة مع بحثك',
    'adjustSearch': 'يرجى تعديل معايير البحث والمحاولة مرة أخرى',
    'showAll': 'عرض كل المنتجات',
    'new': 'جديد',
    'discount': 'خصم',
    'filter': 'فلترة وترتيب',
    
    // لغة
    'language': 'اللغة',
    'english': 'English',
    'arabic': 'العربية',
    
    // الدفع
    'checkout': 'الدفع',
    'payNow': 'ادفع الآن',
    'paymentSuccess': 'تم الدفع بنجاح',
    'paymentFailed': 'فشل الدفع',
    'tryAgain': 'حاول مرة أخرى',
    'total': 'المجموع',
  },
  en: {
    // Home
    'home': 'Home',
    'deliverySlogan': 'Delicious food delivered wherever you are!',
    'deliveryDescription': 'Discover diverse restaurants, order your favorite food, and pay easily with ST digital currency.',
    'search': 'Search',
    'searchPlaceholder': 'Search for restaurant or dish...',
    'restaurantOwner': 'Are you a restaurant owner?',
    'restaurantOwnerDesc': 'Join our platform and expand your customer base. We accept large restaurants and small home projects.',
    'registerRestaurant': 'Register your restaurant now',
    
    // Menu
    'restaurants': 'Restaurants',
    'products': 'Products',
    'rewards': 'Rewards',
    'wallet': 'Wallet',
    'cart': 'Cart',
    'login': 'Login',
    'addToCart': 'Add to cart',
    'added': 'Added',
    'toCart': 'to cart',
    'favorite': 'Favorites',
    'addedToFavorites': 'Added',
    'removedFromFavorites': 'Removed',
    'from': 'from',
    'to': 'to',
    
    // Products
    'bestSellers': 'Best Sellers',
    'allProducts': 'All Products',
    'loadMore': 'Load More',
    'noProducts': 'No products match your search',
    'adjustSearch': 'Please adjust your search criteria and try again',
    'showAll': 'Show all products',
    'new': 'New',
    'discount': 'Discount',
    'filter': 'Filter and sort',
    
    // Language
    'language': 'Language',
    'english': 'English',
    'arabic': 'العربية',
    
    // Payment
    'checkout': 'Checkout',
    'payNow': 'Pay Now',
    'paymentSuccess': 'Payment Successful',
    'paymentFailed': 'Payment Failed',
    'tryAgain': 'Try Again',
    'total': 'Total',
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
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
