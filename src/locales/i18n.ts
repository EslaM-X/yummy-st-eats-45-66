
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language files
import enCommon from './en/common.json';
import enNavigation from './en/navigation.json';
import enWallet from './en/wallet.json';
import arCommon from './ar/common.json';
import arNavigation from './ar/navigation.json';
import arWallet from './ar/wallet.json';

// Configure i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      navigation: enNavigation,
      wallet: enWallet,
    },
    ar: {
      common: arCommon,
      navigation: arNavigation,
      wallet: arWallet,
    }
  },
  lng: localStorage.getItem('st-eats-language') || 'ar',
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
