import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, DEFAULT_LANG } from './i18n';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('mm_lang') || DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  });

  const switchLang = (code) => {
    setLang(code);
    try { localStorage.setItem('mm_lang', code); } catch {}
  };

  const t = translations[lang] || translations[DEFAULT_LANG];

  return (
    <LangContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
};