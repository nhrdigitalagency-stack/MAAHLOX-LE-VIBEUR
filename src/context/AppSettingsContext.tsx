import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  FeatureFlags,
   siteConfig,
  SiteEnvironmentMode,
} from '../data/siteConfig';

export type Language = 'fr' | 'en';
export type ThemeMode = 'dark' | 'light';

interface AppSettingsContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  environmentMode: SiteEnvironmentMode;
  setEnvironmentMode: (mode: SiteEnvironmentMode) => void;
  toggleEnvironmentMode: () => void;
  featureFlags: FeatureFlags;
}

const AppSettingsContext = createContext<AppSettingsContextValue | undefined>(
  undefined
);

const STORAGE_LANG_KEY = 'maahlox_portfolio_lang';
const STORAGE_THEME_KEY = 'maahlox_portfolio_theme';
const STORAGE_ENV_MODE_KEY = 'maahlox_portfolio_env_mode';

export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'fr' || saved === 'en') return saved;
    } catch {
      // Ignore storage errors
    }
    return 'fr';
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // Ignore storage errors
    }
    return 'dark';
  });

  const [environmentMode, setEnvironmentModeState] =
    useState<SiteEnvironmentMode>(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_ENV_MODE_KEY);
        if (saved === 'preview' || saved === 'production') return saved;
      } catch {
        // Ignore storage errors
      }
      return siteConfig.defaultEnvironmentMode;
    });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_LANG_KEY, language);
    } catch {
      // Ignore
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(STORAGE_THEME_KEY, theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-env-mode', environmentMode);
    try {
      window.localStorage.setItem(STORAGE_ENV_MODE_KEY, environmentMode);
    } catch {
      // Ignore
    }
  }, [environmentMode]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleLanguage = () =>
    setLanguageState((prev) => (prev === 'fr' ? 'en' : 'fr'));

  const setTheme = (nextTheme: ThemeMode) => setThemeState(nextTheme);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const setEnvironmentMode = (mode: SiteEnvironmentMode) =>
    setEnvironmentModeState(mode);
  const toggleEnvironmentMode = () =>
    setEnvironmentModeState((prev) =>
      prev === 'preview' ? 'production' : 'preview'
    );

  return (
    <AppSettingsContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        environmentMode,
        setEnvironmentMode,
        toggleEnvironmentMode,
        featureFlags: siteConfig.featureFlags,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = (): AppSettingsContextValue => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error(
      'useAppSettings must be used within an AppSettingsProvider'
    );
  }
  return context;
};
