
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language files
import enCommon from './en/common.json';
import enNavigation from './en/navigation.json';
import enPayment from './en/payment.json';
import enRefund from './en/refund.json';
import arCommon from './ar/common.json';
import arNavigation from './ar/navigation.json';
import arPayment from './ar/payment.json';
import arRefund from './ar/refund.json';

// Configure i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      navigation: enNavigation,
      payment: enPayment,
      refund: enRefund,
    },
    ar: {
      common: arCommon,
      navigation: arNavigation,
      payment: arPayment,
      refund: arRefund,
    }
  },
  lng: localStorage.getItem('st-eats-language') || 'ar',
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
