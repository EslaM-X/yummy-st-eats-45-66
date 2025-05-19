
import React, { createContext, useState, useEffect, useContext } from 'react';
import arTranslationsFromFile from '@/locales/ar.json';
import enTranslationsFromFile from '@/locales/en.json';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Use the imported translations from JSON files
const allAppTranslations: Record<Language, Record<string, string>> = {
  ar: arTranslationsFromFile,
  en: enTranslationsFromFile,
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
    
    // Access translations from the combined object using the current language
    const langTranslations = allAppTranslations[language];
    const translation = langTranslations?.[key];
    
    // Return translation if found, otherwise return key as fallback
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
