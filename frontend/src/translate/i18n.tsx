import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { messages } from './languages'; // Seus recursos de idioma

i18n
  .use(LanguageDetector) // passar o i18n para o detector de idioma
  .use(initReactI18next) // passar o i18n para react-i18next
  .init({
    debug: false,
    fallbackLng: 'pt',
    resources: messages,
    interpolation: {
      escapeValue: false,
    },
  });

export {i18n};
