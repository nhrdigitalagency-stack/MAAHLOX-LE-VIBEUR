import React from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Eye,
  Facebook,
  Globe,
  Moon,
  Radio,
  ShieldCheck,
  Sun,
  Youtube,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { artistData } from '../data/artist';
import { getActivePublicSocials, SocialPlatformId } from '../data/socials';
import { DecorativeAudioVisualizer } from './DecorativeAudioVisualizer';
import { useAppSettings } from '../context/AppSettingsContext';

export const Footer: React.FC = () => {
  const {
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    environmentMode,
    toggleEnvironmentMode,
  } = useAppSettings();

  const activeSocials = getActivePublicSocials();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSocialIcon = (platform: SocialPlatformId) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'facebook':
        return <Facebook className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'soundcloud':
      default:
        return <Radio className="w-3.5 h-3.5" aria-hidden="true" />;
    }
  };

  return (
    <footer
      aria-label={language === 'fr' ? 'Pied de page' : 'Footer'}
      className="theme-bg pt-16 pb-12 border-t theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Bandeau visualiseur audio décoratif d'ambiance studio dans le pied de page */}
        <div className="mb-12">
          <DecorativeAudioVisualizer variant="footer-strip" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b theme-border">
          {/* Colonne 1 : Wordmark typographique */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#top"
              className="inline-block font-display text-4xl md:text-5xl tracking-wider theme-text hover:text-[#FF5A1F] transition-colors duration-150"
            >
              MAAHLOX
            </a>
            <p className="text-sm theme-muted max-w-sm leading-relaxed">
              {language === 'fr'
                ? `${artistData.stageName} (${artistData.civilName}) — ${artistData.activityFr}, associé au ${artistData.anchorageFr}.`
                : `${artistData.stageName} (${artistData.civilName}) — ${artistData.activityEn}, associated with ${artistData.anchorageEn}.`}
            </p>
            <p className="text-xs font-semibold theme-accent-text">
              {language === 'fr'
                ? siteConfig.projectStatus.disclaimerFr
                : siteConfig.projectStatus.disclaimerEn}
            </p>

            {/* Boutons rapides de langue, thème et mode dans le pied de page */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 px-3.5 py-2 border theme-border-strong theme-surface text-xs font-medium theme-text hover:border-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
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
                className="inline-flex items-center gap-2 px-3.5 py-2 border theme-border-strong theme-surface text-xs font-medium theme-text hover:border-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
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

              <button
                type="button"
                onClick={toggleEnvironmentMode}
                className="inline-flex items-center gap-2 px-3.5 py-2 border theme-border-strong theme-surface text-xs font-medium theme-text hover:border-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                {environmentMode === 'preview' ? (
                  <Eye
                    className="w-3.5 h-3.5 theme-accent-text"
                    aria-hidden="true"
                  />
                ) : (
                  <ShieldCheck
                    className="w-3.5 h-3.5 theme-accent-text"
                    aria-hidden="true"
                  />
                )}
                <span>
                  {environmentMode === 'preview'
                    ? language === 'fr'
                      ? 'Mode : Preview (Démo)'
                      : 'Mode: Preview (Demo)'
                    : language === 'fr'
                    ? 'Mode : Production'
                    : 'Mode: Production'}
                </span>
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
                    className="theme-text opacity-85 hover:opacity-100 hover:text-[#FF5A1F] transition-colors duration-150"
                  >
                    {item.label[language]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Réseaux sociaux & présence documentée */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest theme-muted">
              {language === 'fr'
                ? 'Réseaux sociaux & Présence en ligne'
                : 'Social Networks & Online Presence'}
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
                    className="inline-flex items-center gap-2 font-medium theme-text hover:text-[#FF5A1F] transition-colors duration-150"
                  >
                    <span className="theme-accent-text">
                      {renderSocialIcon(social.platform)}
                    </span>
                    <span>
                      {social.platformName} — {social.handleOrChannel}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <p className="text-[11px] opacity-80">
                    {social.editorialDescription[language]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mentions adaptées au statut du projet + bouton retour en haut */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs theme-muted">
          <div className="space-y-1 max-w-3xl">
            <p className="theme-text opacity-90 font-medium">
              {language === 'fr'
                ? `${siteConfig.projectStatus.disclaimerFr} — Document de direction artistique soumis à validation.`
                : `${siteConfig.projectStatus.disclaimerEn} — Art direction proposal subject to validation.`}
            </p>
            <p>
              {language === 'fr'
                ? 'Les œuvres musicales, titres cités et photographies demeurent la propriété exclusive de leurs auteurs, producteurs et ayants droit respectifs. Le wordmark typographique « MAAHLOX » et le slogan « La Vibration en Grand » sont des propositions graphiques du présent concept.'
                : 'Musical works, cited titles, and photographs remain the exclusive property of their respective authors, producers, and rights holders. The “MAAHLOX” typographic wordmark and “The Vibration at Scale” tagline are graphic proposals of this concept.'}
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
            className="inline-flex items-center gap-2 px-4 py-2.5 border theme-border-strong theme-surface text-xs font-medium uppercase tracking-wider theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 self-start sm:self-center shrink-0"
          >
            <span>{language === 'fr' ? 'Haut de page' : 'Back to top'}</span>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
