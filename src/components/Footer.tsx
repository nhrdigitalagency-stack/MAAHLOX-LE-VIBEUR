import React from 'react';
import { ArrowUp, ArrowUpRight, Globe, Moon, Sun } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { artistData } from '../data/artist';
import { getActivePublicSocials, SocialPlatformId } from '../data/socials';
import { SocialBrandLogo } from './SocialBrandLogo';
import { useAppSettings } from '../context/AppSettingsContext';

export const Footer: React.FC = () => {
  const { language, toggleLanguage, theme, toggleTheme } = useAppSettings();

  const activeSocials = getActivePublicSocials();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSocialIcon = (platform: SocialPlatformId) => (
    <SocialBrandLogo platform={platform} className="w-4 h-4" />
  );

  return (
    <footer
      aria-label={language === 'fr' ? 'Pied de page' : 'Footer'}
      className="theme-bg pt-16 pb-12 border-t theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b theme-border">
          {/* Colonne 1 : Wordmark typographique */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#top"
              className="inline-block font-display text-4xl md:text-5xl tracking-wider theme-text hover:text-[#FF5A1F] hover:translate-x-1 transition-all duration-200"
            >
              MAAHLOX
            </a>
            <p className="text-sm theme-muted max-w-sm leading-relaxed">
              {language === 'fr'
                ? `${artistData.stageName} (${artistData.civilName}) — ${artistData.activityFr}, associé au ${artistData.anchorageFr}.`
                : `${artistData.stageName} (${artistData.civilName}) — ${artistData.activityEn}, associated with ${artistData.anchorageEn}.`}
            </p>
            <p className="text-xs font-semibold theme-accent-text uppercase tracking-wider">
              {language === 'fr'
                ? siteConfig.projectStatus.disclaimerFr
                : siteConfig.projectStatus.disclaimerEn}
            </p>

            {/* Boutons rapides de langue et thème dans le pied de page */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 px-3.5 py-2 border theme-border-strong theme-surface text-xs font-medium theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
              >
                <Globe
                  className="w-3.5 h-3.5 theme-accent-text"
                  aria-hidden="true"
                />
                <span>
                  {language === 'fr' ? 'English (EN)' : 'Français (FR)'}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3.5 py-2 border theme-border-strong theme-surface text-xs font-medium theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun
                      className="w-3.5 h-3.5 theme-accent-text"
                      aria-hidden="true"
                    />
                    <span>
                      {language === 'fr' ? 'Thème Clair' : 'Light Theme'}
                    </span>
                  </>
                ) : (
                  <>
                    <Moon
                      className="w-3.5 h-3.5 theme-accent-text"
                      aria-hidden="true"
                    />
                    <span>
                      {language === 'fr' ? 'Thème Sombre' : 'Dark Theme'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Colonne 2 : Navigation secondaire */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest theme-muted">
              {language === 'fr' ? 'Navigation' : 'Navigation'}
            </h2>
            <ul className="space-y-2 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="inline-block theme-text opacity-85 hover:opacity-100 hover:text-[#FF5A1F] hover:translate-x-1 transition-all duration-150"
                  >
                    {item.label[language]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Réseaux sociaux & présence en ligne */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest theme-muted">
              {language === 'fr'
                ? 'Réseaux sociaux & Plateformes'
                : 'Social Networks & Platforms'}
            </h2>
            <ul className="space-y-3 text-xs theme-muted">
              {activeSocials.map((social) => (
                <li key={social.id} className="space-y-1">
                  <a
                    href={social.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label[language]} (${
                      language === 'fr' ? 'nouvel onglet' : 'new tab'
                    })`}
                    className="group inline-flex items-center gap-2 font-medium theme-text hover:text-[#FF5A1F] transition-colors duration-150"
                  >
                    <span className="text-[#FF5A1F] transition-transform duration-200 group-hover:scale-110">
                      {renderSocialIcon(social.platform)}
                    </span>
                    <span>
                      {social.platformName} — {social.handleOrChannel}
                    </span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pied de page bas + bouton retour en haut */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs theme-muted">
          <div className="space-y-1 max-w-3xl">
            <p className="theme-text opacity-90 font-medium">
              © {new Date().getFullYear()} MAAHLOX LE VIBEUR —{' '}
              {language === 'fr'
                ? 'La Vibration en Grand · Yaoundé, Cameroun.'
                : 'The Vibration at Scale · Yaoundé, Cameroon.'}
            </p>
            <p>
              {language === 'fr'
                ? 'Les œuvres musicales, titres et photographies demeurent la propriété de leurs auteurs, producteurs et ayants droit respectifs.'
                : 'Musical works, tracks, and photographs remain the property of their respective authors, producers, and rights holders.'}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={
              language === 'fr'
                ? 'Retourner en haut de la page'
                : 'Scroll back to top'
            }
            className="group inline-flex items-center gap-2 px-4 py-2.5 border theme-border-strong theme-surface text-xs font-medium uppercase tracking-wider theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] hover:-translate-y-0.5 transition-all duration-200 self-start sm:self-center shrink-0"
          >
            <span>{language === 'fr' ? 'Haut de page' : 'Back to top'}</span>
            <ArrowUp
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
