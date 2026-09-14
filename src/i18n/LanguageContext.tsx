'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Locale, TRANSLATIONS, TranslationDictionary } from './translations';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tech_wheel_locale') as Locale | null;
        if (saved === 'vi' || saved === 'en') {
          return saved;
        }
      } catch {
        // Ignore
      }
    }
    return 'vi';
  });

  // Sync document.documentElement.lang when locale changes
  useEffect(() => {
    try {
      document.documentElement.lang = locale;
    } catch {
      // Ignore
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('tech_wheel_locale', newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === 'vi' ? 'en' : 'vi';
      try {
        localStorage.setItem('tech_wheel_locale', next);
        document.documentElement.lang = next;
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const value: LanguageContextValue = {
    locale,
    setLocale,
    toggleLocale,
    t: TRANSLATIONS[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
