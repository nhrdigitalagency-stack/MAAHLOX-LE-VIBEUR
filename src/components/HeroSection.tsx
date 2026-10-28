import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, Eye, Moon, Play, Sun } from 'lucide-react';
import { StageVibrationCanvas } from './StageVibrationCanvas';
import { useAppSettings } from '../context/AppSettingsContext';
import { LanguageToggle } from './LanguageToggle';

export const HeroSection: React.FC = () => {
  const {
    language,
    theme,
    toggleTheme,
    environmentMode,
    toggleEnvironmentMode,
  } = useAppSettings();
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleMaskRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const secondaryRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [imageError, setImageError] = useState(false);

  // Section 12.A : Ouverture cinématographique (durée totale ~1,35 s, non bloquante, respectant prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Cadre scénique révélé avec douceur
      tl.fromTo(
        portraitRef.current,
        {
          opacity: 0,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }
      )
        // 2. Mot MAAHLOX puis LE VIBEUR révélés ligne par ligne
        .fromTo(
          '.hero-title-reveal',
          { yPercent: 102, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.09 },
          '-=0.40'
        )
        // 3. Sous-titre ensuite
        .fromTo(
          secondaryRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.42 },
          '-=0.25'
        )
        // 4. Boutons ensuite (durée globale ~1.35s)
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.38 },
          '-=0.22'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      aria-label={
        language === 'fr'
          ? 'Introduction Maahlox Le Vibeur'
          : 'Maahlox Le Vibeur Introduction'
      }
      className="relative min-h-[100svh] w-full bg-[#080808] text-[#F5F1E8] overflow-hidden flex flex-col justify-between pt-24 pb-10 md:pt-28 md:pb-12 border-b theme-border transition-colors duration-250"
    >
      {/* ARRIÈRE-PLAN PLEIN ÉCRAN : Image scénique haute visibilité + superposition allégée pour voir clairement l'artiste */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {!imageError && (
          <img
            src="/assets/aistudio/Gemini_Generated_Image_xpmhwxxpmhwxxpmh_d9aba250.jpg"
            alt={
              language === 'fr'
                ? 'Maahlox Le Vibeur en performance live sur scène'
                : 'Maahlox Le Vibeur performing live on stage'
            }
            referrerPolicy="no-referrer"
            fetchPriority="high"
            width={1920}
            height={1080}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover object-[56%_18%] opacity-75 contrast-[1.06] saturate-[1.04] transition-opacity duration-300"
          />
        )}

        {/* 1. Scrim directionnel principal à couverture étendue : garantit la lisibilité parfaite du texte à gauche et au centre */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background:
              'linear-gradient(102deg, var(--hero-scrim-start) 0%, rgba(8, 8, 8, 0.88) 36%, var(--hero-scrim-mid) 64%, var(--hero-scrim-end) 100%)',
          }}
        />

        {/* 2. Scrim vertical d'ancrage haut/bas : protège le Header Bubble en haut et la barre éditoriale en bas */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background:
              'linear-gradient(180deg, var(--hero-scrim-top) 0%, rgba(8, 8, 8, 0.38) 35%, rgba(8, 8, 8, 0.48) 68%, var(--hero-scrim-bottom) 100%)',
          }}
        />

        {/* 3. Halo radial sombre de protection typographique sous la colonne éditoriale gauche + lueur scénique ambrée à droite */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 75% at 24% 54%, rgba(8, 8, 8, 0.72) 0%, transparent 75%), radial-gradient(circle at 72% 32%, rgba(255, 90, 31, 0.14) 0%, transparent 62%)',
          }}
        />

        {/* Effet signature 2 : Vibration lumineuse discrète sans flashes */}
        <StageVibrationCanvas />
        <div className="film-grain absolute inset-0" aria-hidden="true" />
      </div>

      {/* Barre d'outils d'expérience (Langue FR/EN, Thème Sombre/Clair & Mode Preview/Production) */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 pb-4 mb-4 border-b border-[#F5F1E8]/20 flex flex-wrap items-center justify-between gap-4">
        <div className="font-poppins text-xs font-medium tracking-widest uppercase text-[#F5F1E8]/90 drop-shadow-xs flex flex-wrap items-center gap-2">
          <span>
            {language === 'fr'
              ? 'Concept Éditorial & Studio Musical'
              : 'Editorial Concept & Music Studio'}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-[#FF5A1F] font-semibold">
            {environmentMode === 'preview'
              ? language === 'fr'
                ? 'Mode Prévisualisation (Maquettes actives)'
                : 'Preview Mode (Mockups enabled)'
              : language === 'fr'
              ? 'Mode Production (Données validées uniquement)'
              : 'Production Mode (Validated data only)'}
          </span>
        </div>

        {/* Sélecteur de mode Preview/Production, Langue FR/EN & Thème Sombre/Clair */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={toggleEnvironmentMode}
            title={
              language === 'fr'
                ? 'Basculer entre le mode Preview (avec maquettes de démonstration identifiées) et le mode Production (masquant toute offre non validée)'
                : 'Switch between Preview mode (with labeled concept mockups) and Production mode (hiding unvalidated offers)'
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 theme-surface border theme-border-strong hover:border-[#FF5A1F] font-poppins text-xs font-medium theme-text transition-colors duration-150 whitespace-nowrap shrink-0 shadow-xs"
          >
            <Eye
              className="w-3.5 h-3.5 theme-accent-text"
              aria-hidden="true"
            />
            <span>
              {environmentMode === 'preview'
                ? language === 'fr'
                  ? 'Mode : Preview'
                  : 'Mode: Preview'
                : language === 'fr'
                ? 'Mode : Production'
                : 'Mode: Production'}
            </span>
          </button>

          <LanguageToggle variant="toolbar" />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? language === 'fr'
                  ? 'Activer le thème clair'
                  : 'Switch to light theme'
                : language === 'fr'
                ? 'Activer le thème sombre'
                : 'Switch to dark theme'
            }
            className="inline-flex items-center gap-2 px-3 py-1.5 theme-surface border theme-border-strong hover:border-[#FF5A1F] font-poppins text-xs font-medium theme-text transition-colors duration-150 whitespace-nowrap shrink-0 shadow-xs"
          >
            {theme === 'dark' ? (
              <>
                <Sun
                  className="w-3.5 h-3.5 theme-accent-text"
                  aria-hidden="true"
                />
                <span>{language === 'fr' ? 'Thème Clair' : 'Light Theme'}</span>
              </>
            ) : (
              <>
                <Moon
                  className="w-3.5 h-3.5 theme-accent-text"
                  aria-hidden="true"
                />
                <span>{language === 'fr' ? 'Thème Sombre' : 'Dark Theme'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Contenu principal en grille éditoriale : laisse respirer l'image d'arrière-plan */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Colonne gauche : Effet signature 1 — Titre monumental MAAHLOX */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              {/* Microtexte éditorial sans pilule en Poppins */}
              <p className="font-poppins text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#F5F1E8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mb-5">
                <span>
                  {language === 'fr'
                    ? 'Artiste camerounais'
                    : 'Cameroonian Artist'}
                </span>
                <span className="mx-2.5 text-[#FF5A1F]" aria-hidden="true">
                  ·
                </span>
                <span>Yaoundé / Obili</span>
              </p>

              {/* H1 monumental avec masque de révélation */}
              <div ref={titleMaskRef} className="overflow-hidden">
                <h1 className="font-display text-[#F5F1E8] tracking-tight leading-[0.88] drop-shadow-[0_6px_24px_rgba(0,0,0,0.75)]">
                  <span className="hero-title-reveal block text-[clamp(4.4rem,11.5vw,9.8rem)]">
                    MAAHLOX
                  </span>
                  <span className="hero-title-reveal block text-[clamp(2.3rem,5.8vw,5rem)] text-[#FF5A1F] mt-1">
                    LE VIBEUR
                  </span>
                </h1>
              </div>
            </div>

            {/* Éléments secondaires : sous-titre puis boutons */}
            <div className="mt-8 lg:mt-10 max-w-xl">
              <div ref={secondaryRef}>
                <p className="font-poppins text-base md:text-lg text-[#F5F1E8] font-normal leading-relaxed mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {language === 'fr'
                    ? 'Jean-Jules Kenfack — rappeur et chanteur camerounais associé au quartier Obili à Yaoundé. Un univers urbain direct, festif et frontal, né au début des années 2010.'
                    : 'Jean-Jules Kenfack — Cameroonian rapper and singer closely associated with the Obili district in Yaoundé. A direct, festive, and outspoken urban sound forged in the early 2010s.'}
                </p>
              </div>

              <div
                ref={ctaRef}
                className="flex flex-wrap items-center gap-4"
              >
                <a
                  href="#univers"
                  className="inline-flex items-center gap-3 px-7 py-4 bg-[#FF5A1F] text-[#080808] font-poppins font-semibold text-sm uppercase tracking-wider hover:bg-[#F5F1E8] transition-colors duration-150 whitespace-nowrap shrink-0 shadow-lg"
                >
                  <span>
                    {language === 'fr'
                      ? 'Explorer l’univers'
                      : 'Explore the universe'}
                  </span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="#clips"
                  className="inline-flex items-center gap-3 px-7 py-4 border border-[#F5F1E8]/35 bg-[#080808]/65 backdrop-blur-sm text-[#F5F1E8] font-poppins font-semibold text-sm uppercase tracking-wider hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>
                    {language === 'fr' ? 'Voir les clips' : 'Watch music videos'}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite : Légende scénique épurée laissant toute la visibilité à la photo d'arrière-plan */}
          <div
            ref={portraitRef}
            className="lg:col-span-5 flex flex-col justify-end lg:items-end"
          >
            <div className="w-full max-w-md bg-[#080808]/70 backdrop-blur-md border border-[#F5F1E8]/20 p-5 shadow-2xl space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="font-poppins font-semibold text-[11px] uppercase tracking-widest text-[#DFFF00]">
                  {language === 'fr' ? 'FIG. 01 / SCÈNE LIVE' : 'FIG. 01 / LIVE STAGE'}
                </span>
                <span className="font-poppins text-[11px] font-medium text-[#A8A29A] uppercase tracking-wider">
                  YAOUNDÉ · OBILI
                </span>
              </div>
              <p className="font-poppins text-xs md:text-sm text-[#F5F1E8]/95 font-medium leading-relaxed">
                {language === 'fr'
                  ? 'Maahlox Le Vibeur sur scène au microphone — énergie scénique directe et présence monumentale.'
                  : 'Maahlox Le Vibeur on stage at the microphone — direct live energy and monumental stage presence.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre éditoriale de bas de Hero + indicateur de défilement discret */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 pt-8 mt-8 border-t border-[#F5F1E8]/20 flex flex-wrap items-center justify-between gap-4 font-poppins text-xs text-[#F5F1E8]/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#F5F1E8] font-medium">
            {language === 'fr' ? 'PROPOSITION CRÉATIVE :' : 'CREATIVE PROPOSAL:'}
          </span>
          <span>
            {language === 'fr'
              ? '« MAAHLOX — LA VIBRATION EN GRAND »'
              : '“MAAHLOX — THE VIBRATION AT SCALE”'}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {language === 'fr'
              ? 'Concept de portfolio non officiel'
              : 'Unofficial portfolio concept'}
          </span>
        </div>

        <a
          href="#univers"
          aria-label={
            language === 'fr'
              ? 'Défiler vers la section L’Univers'
              : 'Scroll to Universe section'
          }
          className="inline-flex items-center gap-2 font-poppins font-medium uppercase tracking-widest text-[#F5F1E8] hover:text-[#FF5A1F] transition-colors duration-150"
        >
          <span>{language === 'fr' ? 'Défiler' : 'Scroll'}</span>
          <span aria-hidden="true" className="text-[#FF5A1F]">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
};
