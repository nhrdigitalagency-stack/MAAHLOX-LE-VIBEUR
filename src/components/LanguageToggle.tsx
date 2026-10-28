import React from 'react';
import { Globe } from 'lucide-react';
import { useAppSettings } from '../context/AppSettingsContext';

interface LanguageToggleProps {
  variant?: 'bubble' | 'toolbar';
  className?: string;
}

/**
 * Composant de bascule de langue (Français / Anglais) connecté à AppSettingsProvider.
 * Synchronise l'état global `language` ('fr' | 'en') et l'attribut `lang` du document.
 */
export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'bubble',
  className = '',
}) => {
  const { language, setLanguage } = useAppSettings();

  if (variant === 'toolbar') {
    return (
      <div
        role="group"
        aria-label={
          language === 'fr'
            ? 'Sélecteur de langue Français ou Anglais'
            : 'French or English language switcher'
        }
        className={`inline-flex items-center theme-surface border theme-border-strong p-0.5 font-poppins text-xs shadow-xs ${className}`}
      >
        <span className="px-2 theme-muted inline-flex items-center">
          <Globe className="w-3.5 h-3.5 theme-accent-text" aria-hidden="true" />
        </span>
        <button
          type="button"
          onClick={() => setLanguage('fr')}
          aria-pressed={language === 'fr'}
          aria-label={
            language === 'fr'
              ? 'Français (langue active)'
              : 'Passer le site en Français'
          }
          className={`px-2.5 py-1 font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
            language === 'fr'
              ? 'theme-accent-bg'
              : 'theme-muted hover:theme-text'
          }`}
        >
          FR
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          aria-pressed={language === 'en'}
          aria-label={
            language === 'en'
              ? 'English (active language)'
              : 'Switch site language to English'
          }
          className={`px-2.5 py-1 font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
            language === 'en'
              ? 'theme-accent-bg'
              : 'theme-muted hover:theme-text'
          }`}
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={
        language === 'fr'
          ? 'Basculer la langue (Français / Anglais)'
          : 'Switch language (French / English)'
      }
      className={`inline-flex items-center rounded-full theme-surface border theme-border-strong p-0.5 font-poppins text-[11px] font-semibold min-h-[36px] shrink-0 ${className}`}
    >
      <Globe
        className="w-3.5 h-3.5 theme-accent-text ml-2 mr-1 hidden sm:inline-block shrink-0"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => setLanguage('fr')}
        aria-pressed={language === 'fr'}
        aria-label={
          language === 'fr'
            ? 'Français sélectionné'
            : 'Afficher le site en français'
        }
        className={`px-2.5 py-1 rounded-full transition-all duration-150 whitespace-nowrap ${
          language === 'fr'
            ? 'theme-accent-bg shadow-xs'
            : 'theme-muted hover:theme-text'
        }`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label={
          language === 'en'
            ? 'English selected'
            : 'Switch site content to English'
        }
        className={`px-2.5 py-1 rounded-full transition-all duration-150 whitespace-nowrap ${
          language === 'en'
            ? 'theme-accent-bg shadow-xs'
            : 'theme-muted hover:theme-text'
        }`}
      >
        EN
      </button>
    </div>
  );
};
