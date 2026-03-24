// import {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   type ReactNode,
// } from "react";
// import {
//   translations,
//   languageNames,
//   type Language,
// } from "./translations/translations";

// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: (key: string) => string;
//   languageNames: Record<Language, string>;
// }

// const LanguageContext = createContext<LanguageContextType | null>(null);

// export function LanguageProvider({ children }: { children: ReactNode }) {
//   const [language, setLanguageState] = useState<Language>(() => {
//     const saved = localStorage.getItem("app-language");
//     return (saved as Language) || "en";
//   });

//   const setLanguage = useCallback((lang: Language) => {
//     setLanguageState(lang);
//     localStorage.setItem("app-language", lang);
//   }, []);

//   const t = useCallback(
//     (key: string) =>
//       translations[language]?.[key] ?? translations.en[key] ?? key,
//     [language],
//   );

//   return (
//     <LanguageContext.Provider
//       value={{ language, setLanguage, t, languageNames }}
//     >
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export function useLanguage() {
//   const ctx = useContext(LanguageContext);
//   if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
//   return ctx;
// }
// // export default i18n;

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import {
  translations,
  languageNames,
  type Language,
} from "./translations/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageNames: Record<Language, string>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("app-language");
    return (saved as Language) || "en";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  }, []);

  const t = useCallback(
    (key: string) =>
      translations[language]?.[key] ?? translations.en[key] ?? key,
    [language],
  );

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, languageNames }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}