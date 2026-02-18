'use client';

import { useState, useCallback } from 'react';

import en from '@/src/locales/en.json';
import es from '@/src/locales/es.json';

type Locale = 'en' | 'es';

/**
 * Hook for dynamic internationalization.
 */
export const useTranslations = () => {
  const [locale, setLocale] = useState<Locale>('en');

  const switchLanguage = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-locale', newLocale);
    }
  }, []);

  const translations = { en, es };
  const t = translations[locale];

  return { t, locale, switchLanguage };
};
