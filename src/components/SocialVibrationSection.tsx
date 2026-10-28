import React, { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Info } from 'lucide-react';
import {
  getActivePublicSocials,
  getPendingVerificationSocials,
} from '../data/socials';
import { BRAND_HEX_COLORS, SocialBrandLogo } from './SocialBrandLogo';
import { useAppSettings } from '../context/AppSettingsContext';

gsap.registerPlugin(ScrollTrigger);

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
        {/* En-tête éditorial monumental */}
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

          <p className="text-sm md:text-base theme-muted max-w-md leading-relaxed">
            {language === 'fr'
              ? 'Accès direct aux canaux en ligne documentés avec leurs logos officiels. Aucun faux flux social ni compteur d’abonnés non synchronisé n’est affiché.'
              : 'Direct access to documented online channels with their official logos. No simulated social feeds or unsynchronized follower counts are displayed.'}
          </p>
        </div>

        {/* Cartes sociales asymétriques — chaque carte est une vraie ancre HTML <a> avec le logo du réseau social */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {activeSocials.map((social, idx) => {
            const brandHex = BRAND_HEX_COLORS[social.platform];

            return (
              <a
                key={social.id}
                href={social.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label[language]} — ${
                  social.statusBadge[language]
                } (${
                  language === 'fr'
                    ? 's’ouvre dans un nouvel onglet'
                    : 'opens in a new tab'
                })`}
                className={`social-vibration-card ${social.cardSpanClass} relative overflow-hidden group block p-6 md:p-8 theme-surface border theme-border hover:border-[#FF5A1F] transition-all duration-250 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#FF5A1F]`}
              >
                {/* Filigrane géant du logo officiel en arrière-plan de la carte */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -bottom-6 opacity-[0.045] group-hover:opacity-[0.11] transition-all duration-300 group-hover:scale-105"
                  style={{ color: brandHex }}
                >
                  <SocialBrandLogo
                    platform={social.platform}
                    className="w-40 h-40"
                  />
                </div>

                <div className="relative z-10 flex items-start justify-between gap-4 mb-8">
                  <div className="inline-flex items-center gap-4">
                    {/* Médaillon logo officiel avec accent de la plateforme */}
                    <span className="relative inline-flex items-center justify-center w-14 h-14 theme-bg border theme-border-strong group-hover:border-[#FF5A1F] transition-colors duration-200 shrink-0 shadow-md">
                      <SocialBrandLogo
                        platform={social.platform}
                        useBrandColor
                        className="w-7 h-7 transition-transform duration-200 group-hover:scale-110"
                      />
                    </span>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-widest theme-muted">
                        0{idx + 1} · {social.platformName}
                      </span>
                      <span className="block text-xs theme-accent-text font-medium mt-0.5">
                        {social.statusBadge[language]}
                      </span>
                    </div>
                  </div>

                  {/* Flèche externe discrète avec léger déplacement au survol */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 theme-bg border theme-border text-xs font-medium theme-muted group-hover:text-[#FF5A1F] group-hover:border-[#FF5A1F] transition-colors duration-200">
                    <span className="hidden sm:inline">
                      {language === 'fr' ? 'Ouvrir' : 'Open'}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <div className="relative z-10 space-y-2">
                  <h3 className="font-display text-3xl md:text-4xl theme-text group-hover:text-[#FF5A1F] transition-colors duration-200 tracking-wide">
                    {social.label[language]}
                  </h3>
                  <p className="text-sm theme-muted leading-relaxed max-w-2xl">
                    {social.editorialDescription[language]}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t theme-border flex flex-wrap items-center justify-between gap-2 text-xs theme-muted">
                  <span className="inline-flex items-center gap-2 font-semibold theme-text">
                    <SocialBrandLogo
                      platform={social.platform}
                      useBrandColor
                      className="w-4 h-4"
                    />
                    <span>{social.handleOrChannel}</span>
                  </span>
                  <span className="truncate max-w-[280px] sm:max-w-md opacity-75">
                    {social.url}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* En mode preview uniquement : transparence sur Instagram candidat et TikTok non confirmé (sans afficher l'icône TikTok tant que l'URL n'est pas fournie) */}
        {environmentMode === 'preview' && pendingSocials.length > 0 && (
          <div className="mt-8 p-5 md:p-6 theme-surface border theme-border space-y-4">
            <div className="flex items-start gap-3">
              <Info
                className="w-4 h-4 theme-accent-text shrink-0 mt-0.5"
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
                      {item.platform === 'instagram' && (
                        <span className="inline-flex items-center justify-center w-7 h-7 theme-surface border theme-border">
                          <SocialBrandLogo
                            platform="instagram"
                            useBrandColor
                            className="w-4 h-4"
                          />
                        </span>
                      )}
                      <span>{item.platformName}</span>
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
