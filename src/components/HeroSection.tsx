import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Play } from 'lucide-react';
import { StageVibrationCanvas } from './StageVibrationCanvas';
import { useAppSettings } from '../context/AppSettingsContext';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const { language } = useAppSettings();
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const titleMaskRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const secondaryRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [imageError, setImageError] = useState(false);

  // Ouverture cinématographique + parallaxe fluide au défilement
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        portraitRef.current,
        {
          opacity: 0,
          y: 22,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
        }
      )
        .fromTo(
          '.hero-title-reveal',
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.42'
        )
        .fromTo(
          secondaryRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.25'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.22'
        );

      // Parallaxe douce de l'image de fond au scroll
      if (imgRef.current && heroRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.03, yPercent: 0 },
          {
            scale: 1.1,
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
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
      className="relative min-h-[100svh] w-full bg-[#080808] text-[#F5F1E8] overflow-hidden flex flex-col justify-between pt-28 pb-10 md:pt-32 md:pb-12 border-b theme-border transition-colors duration-250"
    >
      {/* ARRIÈRE-PLAN PLEIN ÉCRAN : Image scénique haute visibilité + overlay CSS dégradé */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {!imageError && (
          <img
            ref={imgRef}
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
            className="h-full w-full object-cover object-[58%_18%] opacity-95 brightness-[1.06] contrast-[1.08] saturate-[1.08] transition-opacity duration-300 will-change-transform"
          />
        )}

        {/* Overlay unique à dégradé CSS complexe et profond utilisant --hero-scrim-start, --hero-scrim-mid, --hero-scrim-end */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full transition-colors duration-300"
          style={{
            background: [
              'linear-gradient(100deg, var(--hero-scrim-start) 0%, var(--hero-scrim-start) 22%, var(--hero-scrim-mid) 52%, var(--hero-scrim-end) 82%, rgba(8, 8, 8, 0.12) 100%)',
              'linear-gradient(180deg, var(--hero-scrim-top) 0%, rgba(8, 8, 8, 0.05) 28%, rgba(8, 8, 8, 0.08) 74%, var(--hero-scrim-bottom) 100%)',
              'radial-gradient(circle at 70% 34%, rgba(255, 90, 31, 0.16) 0%, transparent 58%)',
            ].join(', '),
          }}
        />

        <StageVibrationCanvas />
      </div>

      {/* Contenu principal en grille éditoriale */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Colonne gauche : Titre monumental MAAHLOX */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
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

            <div className="mt-8 lg:mt-10 max-w-xl">
              <div ref={secondaryRef}>
                <p className="font-poppins text-base md:text-lg text-[#F5F1E8] font-normal leading-relaxed mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {language === 'fr'
                    ? 'Jean-Jules Kenfack — rappeur et chanteur camerounais associé au quartier Obili à Yaoundé. Un univers urbain direct, festif et frontal, né au début des années 2010.'
                    : 'Jean-Jules Kenfack — Cameroonian rapper and singer closely associated with the Obili district in Yaoundé. A direct, festive, and outspoken urban sound forged in the early 2010s.'}
                </p>
              </div>

              <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
                <a
                  href="#univers"
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-[#FF5A1F] text-[#080808] font-poppins font-semibold text-sm uppercase tracking-wider hover:bg-[#F5F1E8] hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(255,90,31,0.4)] transition-all duration-250 whitespace-nowrap shrink-0 shadow-lg"
                >
                  <span>
                    {language === 'fr'
                      ? 'Explorer l’univers'
                      : 'Explore the universe'}
                  </span>
                  <ArrowDownRight
                    className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1 group-hover:translate-y-1"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="#videos"
                  className="group inline-flex items-center gap-3 px-7 py-4 border border-[#F5F1E8]/35 bg-[#080808]/65 backdrop-blur-sm text-[#F5F1E8] font-poppins font-semibold text-sm uppercase tracking-wider hover:border-[#FF5A1F] hover:text-[#FF5A1F] hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.5)] transition-all duration-250 whitespace-nowrap shrink-0"
                >
                  <Play
                    className="w-4 h-4 fill-current transition-transform duration-250 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span>
                    {language === 'fr' ? 'Voir les clips' : 'Watch music videos'}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite : Légende scénique avec animation au survol */}
          <div
            ref={portraitRef}
            className="lg:col-span-5 flex flex-col justify-end lg:items-end"
          >
            <div className="group w-full max-w-md bg-[#080808]/75 backdrop-blur-md border border-[#F5F1E8]/20 hover:border-[#FF5A1F] p-5 shadow-2xl space-y-2 transition-all duration-300 hover:-translate-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-poppins font-semibold text-[11px] uppercase tracking-widest text-[#DFFF00] group-hover:text-[#FF5A1F] transition-colors duration-200">
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

      {/* Barre éditoriale de bas de Hero */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 pt-8 mt-8 border-t border-[#F5F1E8]/20 flex flex-wrap items-center justify-between gap-4 font-poppins text-xs text-[#F5F1E8]/85">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#FF5A1F] font-semibold uppercase tracking-widest">
            MAAHLOX LE VIBEUR
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {language === 'fr'
              ? 'LA VIBRATION EN GRAND — YAOUNDÉ, CAMEROUN'
              : 'THE VIBRATION AT SCALE — YAOUNDÉ, CAMEROON'}
          </span>
        </div>

        <a
          href="#univers"
          aria-label={
            language === 'fr'
              ? 'Défiler vers la section L’Univers'
              : 'Scroll to Universe section'
          }
          className="group inline-flex items-center gap-2 font-poppins font-medium uppercase tracking-widest text-[#F5F1E8] hover:text-[#FF5A1F] transition-colors duration-150"
        >
          <span>{language === 'fr' ? 'Défiler' : 'Scroll'}</span>
          <span
            aria-hidden="true"
            className="text-[#FF5A1F] transition-transform duration-200 group-hover:translate-y-1"
          >
            ↓
          </span>
        </a>
      </div>
    </section>
  );
};
