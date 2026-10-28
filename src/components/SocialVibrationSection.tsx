import React, { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Cloud,
  Facebook,
  Info,
  Instagram,
  Music2,
  Radio,
  Youtube,
} from 'lucide-react';
import {
  getActivePublicSocials,
  getPendingVerificationSocials,
  SocialPlatformId,
} from '../data/socials';
import { SocialBrandLogo } from './SocialBrandLogo';
import { useAppSettings } from '../context/AppSettingsContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * Composant d'icône Lucide accessible remplaçant les étiquettes textuelles
 * pour Facebook, YouTube, SoundCloud et Instagram, stylisé en #FF5A1F
 * avec aria-label explicite.
 */
export const AccessibleLucideSocialIcon: React.FC<{
  platform: SocialPlatformId;
  ariaLabel: string;
  sizeClass?: string;
}> = ({ platform, ariaLabel, sizeClass = 'w-6 h-6' }) => {
  const iconClass = `${sizeClass} text-[#FF5A1F] shrink-0 transition-transform duration-200 group-hover:scale-110`;

  switch (platform) {
    case 'facebook':
      return (
        <Facebook
          className={iconClass}
          role="img"
          aria-label={ariaLabel}
          strokeWidth={2}
        />
      );
    case 'youtube':
      return (
        <Youtube
          className={iconClass}
          role="img"
          aria-label={ariaLabel}
          strokeWidth={2}
        />
      );
    case 'soundcloud':
      return (
        <Cloud
          className={iconClass}
          role="img"
          aria-label={ariaLabel}
          strokeWidth={2}
        />
      );
    case 'instagram':
      return (
        <Instagram
          className={iconClass}
          role="img"
          aria-label={ariaLabel}
          strokeWidth={2}
        />
      );
    case 'spotify':
      return (
        <Music2
          className={iconClass}
          role="img"
          aria-label={ariaLabel}
          strokeWidth={2}
        />
      );
    default:
      return (
        <Radio
          className={iconClass}
          role="img"
          aria-label={ariaLabel}
          strokeWidth={2}
        />
      );
  }
};

export const SocialVibrationSection: React.FC = () => {
  const { language, environmentMode } = useAppSettings();
  const sectionRef = useRef<HTMLElement | null>(null);

  const activeSocials = useMemo(() => getActivePublicSocials(), []);
  const pendingSocials = useMemo(
    () => getPendingVerificationSocials(environmentMode),
    [environmentMode]
  );

  // Section 5 : Animation d'apparition progressive en cascade (16 à 24 px, 450 à 650 ms, stagger 60 à 90 ms)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.social-vibration-card',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.075,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reseaux"
      ref={sectionRef}
      aria-labelledby="social-vibration-heading"
      className="relative py-20 md:py-28 theme-bg border-b theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* En-tête éditorial monumental + barre d'icônes Lucide accessibles en #FF5A1F */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 mb-12 border-b theme-border">
          <div className="max-w-2xl">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest theme-accent-text mb-2">
              {language === 'fr'
                ? 'Présence numérique & Archives en ligne'
                : 'Digital Presence & Online Archives'}
            </p>
            <h2
              id="social-vibration-heading"
              className="font-display text-4xl sm:text-6xl md:text-7xl theme-text tracking-tight [text-wrap:balance]"
            >
              {language === 'fr'
                ? 'REJOINS LA VIBRATION'
                : 'JOIN THE VIBRATION'}
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
            {/* Barre d'accès rapide par icônes Lucide stylisées en #FF5A1F avec aria-labels */}
            <div
              className="flex flex-wrap items-center gap-3"
              role="group"
              aria-label={
                language === 'fr'
                  ? 'Raccourcis vers les plateformes sociales'
                  : 'Social platform shortcuts'
              }
            >
              {activeSocials.map((social) => (
                <a
                  key={`quick-icon-${social.id}`}
                  href={social.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.platformName} — ${social.handleOrChannel}`}
                  title={`${social.platformName} (${social.handleOrChannel})`}
                  className="group inline-flex items-center justify-center w-11 h-11 theme-surface border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 text-[#FF5A1F] hover:border-[#FF5A1F] hover:bg-[#FF5A1F]/20 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#FF5A1F]"
                >
                  <AccessibleLucideSocialIcon
                    platform={social.platform}
                    ariaLabel={social.platformName}
                    sizeClass="w-5 h-5"
                  />
                </a>
              ))}
            </div>

            <p className="text-sm md:text-base theme-muted leading-relaxed md:text-right">
              {language === 'fr'
                ? 'Accès direct aux canaux en ligne documentés. Aucun faux flux social ni compteur d’abonnés non synchronisé n’est affiché.'
                : 'Direct access to documented online channels. No simulated social feeds or unsynchronized follower counts are displayed.'}
            </p>
          </div>
        </div>

        {/* Cartes sociales asymétriques : étiquettes de plateformes remplacées par les icônes Lucide en #FF5A1F avec aria-labels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {activeSocials.map((social, idx) => (
            <a
              key={social.id}
              href={social.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.platformName} : ${social.label[language]} — ${
                social.statusBadge[language]
              } (${
                language === 'fr'
                  ? 's’ouvre dans un nouvel onglet'
                  : 'opens in a new tab'
              })`}
              className={`social-vibration-card ${social.cardSpanClass} relative overflow-hidden group block p-6 md:p-8 theme-surface border theme-border hover:border-[#FF5A1F] transition-all duration-250 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#FF5A1F]`}
            >
              {/* Filigrane décoratif du logo en accent orange subtil */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 -bottom-5 text-[#FF5A1F] opacity-[0.06] group-hover:opacity-[0.14] transition-all duration-300 group-hover:scale-105"
              >
                <SocialBrandLogo
                  platform={social.platform}
                  className="w-36 h-36"
                />
              </div>

              <div className="relative z-10 flex items-start justify-between gap-4 mb-8">
                <div className="inline-flex items-center gap-4">
                  {/* Boîtier d'icône Lucide stylisé en #FF5A1F avec aria-label */}
                  <span className="inline-flex items-center justify-center w-14 h-14 theme-bg border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 text-[#FF5A1F] group-hover:border-[#FF5A1F] group-hover:bg-[#FF5A1F]/20 transition-colors duration-200 shrink-0 shadow-md">
                    <AccessibleLucideSocialIcon
                      platform={social.platform}
                      ariaLabel={social.platformName}
                      sizeClass="w-7 h-7"
                    />
                  </span>

                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest theme-muted">
                      <span>0{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <AccessibleLucideSocialIcon
                        platform={social.platform}
                        ariaLabel={social.platformName}
                        sizeClass="w-4 h-4"
                      />
                      <span className="sr-only">{social.platformName}</span>
                    </div>
                    <span className="block text-xs theme-accent-text font-medium mt-1">
                      {social.statusBadge[language]}
                    </span>
                  </div>
                </div>

                {/* Bouton icône d'ouverture externe en #FF5A1F */}
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-10 h-10 theme-bg border theme-border text-[#FF5A1F] group-hover:border-[#FF5A1F] transition-colors duration-200"
                >
                  <ArrowUpRight className="w-5 h-5 text-[#FF5A1F] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-3">
                  <AccessibleLucideSocialIcon
                    platform={social.platform}
                    ariaLabel={social.platformName}
                    sizeClass="w-6 h-6"
                  />
                  <h3 className="font-display text-3xl md:text-4xl theme-text group-hover:text-[#FF5A1F] transition-colors duration-200 tracking-wide">
                    {social.handleOrChannel}
                  </h3>
                </div>
                <p className="text-sm theme-muted leading-relaxed max-w-2xl">
                  {social.editorialDescription[language]}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t theme-border flex flex-wrap items-center justify-between gap-2 text-xs theme-muted">
                <span className="inline-flex items-center gap-2 font-semibold theme-text">
                  <SocialBrandLogo
                    platform={social.platform}
                    className="w-4 h-4 text-[#FF5A1F]"
                  />
                  <span>{social.handleOrChannel}</span>
                </span>
                <span className="truncate max-w-[280px] sm:max-w-md opacity-80 group-hover:text-[#FF5A1F] transition-colors duration-150">
                  {social.url}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* En mode preview uniquement : transparence sur Instagram candidat (icône Lucide Instagram en #FF5A1F avec aria-label) et TikTok non confirmé */}
        {environmentMode === 'preview' && pendingSocials.length > 0 && (
          <div className="mt-8 p-5 md:p-6 theme-surface border theme-border space-y-4">
            <div className="flex items-start gap-3">
              <Info
                className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div className="space-y-1 text-xs">
                <p className="font-semibold theme-text uppercase tracking-wider">
                  {language === 'fr'
                    ? 'Note de configuration (visible uniquement en mode Preview) — Plateformes en attente de validation'
                    : 'Configuration Note (visible in Preview mode only) — Platforms awaiting validation'}
                </p>
                <p className="theme-muted leading-relaxed">
                  {language === 'fr'
                    ? 'Conformément à la charte de fiabilité, ces plateformes restent désactivées en production tant que l’équipe du projet n’a pas validé l’URL unique officielle :'
                    : 'In accordance with reliability rules, these platforms remain disabled in production until the project team validates the single official URL:'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {pendingSocials.map((item) => (
                <div
                  key={item.id}
                  className="p-4 theme-bg border theme-border text-xs space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2.5 font-semibold theme-text">
                      {item.platform === 'instagram' ? (
                        <span
                          className="inline-flex items-center justify-center w-9 h-9 border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 text-[#FF5A1F]"
                          aria-label="Instagram"
                          title="Instagram"
                        >
                          <AccessibleLucideSocialIcon
                            platform="instagram"
                            ariaLabel="Instagram"
                            sizeClass="w-5 h-5"
                          />
                        </span>
                      ) : (
                        <span>{item.platformName}</span>
                      )}
                      <span className="text-xs theme-muted">
                        {item.handleOrChannel}
                      </span>
                    </span>
                    <span className="theme-accent-text font-medium">
                      {item.statusBadge[language]}
                    </span>
                  </div>
                  <p className="theme-muted leading-relaxed">
                    {item.editorialDescription[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
