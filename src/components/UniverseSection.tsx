import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { artistData } from '../data/artist';
import { useAppSettings } from '../context/AppSettingsContext';

gsap.registerPlugin(ScrollTrigger);

export const UniverseSection: React.FC = () => {
  const { language } = useAppSettings();
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const textBlockRef = useRef<HTMLDivElement | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.universe-word-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { y: 24 },
          {
            y: -24,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="univers"
      ref={sectionRef}
      aria-labelledby="univers-heading"
      className="relative py-20 md:py-32 theme-bg border-b theme-border transition-colors duration-250"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* En-tête éditorial numéroté en Poppins */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-12 border-b theme-border font-poppins">
          <h2
            id="univers-heading"
            className="text-xs md:text-sm font-semibold uppercase tracking-widest theme-accent-text"
          >
            {language === 'fr' ? '01. L’Univers artistique' : '01. Artistic Universe'}
          </h2>
          <p className="text-xs theme-muted">
            {language === 'fr'
              ? `Ancrage : ${artistData.anchorageFr} · Registre urbain`
              : `Anchorage: ${artistData.anchorageEn} · Urban register`}
          </p>
        </div>

        {/* Grille éditoriale asymétrique */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Grands mots typographiques (Proposition créative du site) */}
          <div ref={textBlockRef} className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <p className="font-poppins text-xs font-medium theme-muted uppercase tracking-wider mb-3">
                {language === 'fr'
                  ? 'Direction artistique · Proposition éditoriale du site'
                  : 'Art Direction · Editorial site proposal'}
              </p>
              <div className="font-display text-[clamp(2.75rem,6.8vw,6rem)] leading-[0.92] tracking-tight theme-text [text-wrap:balance]">
                <span className="universe-word-reveal block">
                  {language === 'fr' ? 'UNE VOIX.' : 'ONE VOICE.'}
                </span>
                <span className="universe-word-reveal block theme-accent-text">
                  {language === 'fr' ? 'UNE ÉNERGIE.' : 'ONE ENERGY.'}
                </span>
                <span className="universe-word-reveal block">
                  {language === 'fr' ? 'UNE VIBRATION.' : 'ONE VIBRATION.'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t theme-border max-w-2xl space-y-5 font-poppins">
              <p className="text-lg md:text-xl theme-text font-medium leading-relaxed">
                {language === 'fr' ? artistData.shortBioFr : artistData.shortBioEn}
              </p>
              <p className="text-sm md:text-base theme-muted leading-relaxed">
                {language === 'fr'
                  ? 'De l’effervescence d’Obili aux grandes scènes urbaines, l’écriture de Maahlox Le Vibeur privilégie l’impact immédiat : formules frontales, refrains fédérateurs et pulsation taillée pour l’énergie collective.'
                  : 'From the vibrancy of Obili to major urban stages, Maahlox Le Vibeur’s writing favors immediate impact: outspoken phrasing, unifying hooks, and a pulse built for collective energy.'}
              </p>
            </div>

            {/* Repères d'identité sous forme de liste éditoriale sans pilules en Poppins */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t theme-border font-poppins">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider theme-muted">
                  {language === 'fr'
                    ? 'Nom de scène & identité civile'
                    : 'Stage name & civil identity'}
                </dt>
                <dd className="mt-1 text-base font-semibold theme-text">
                  {artistData.stageName} · {artistData.civilName}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider theme-muted">
                  {language === 'fr'
                    ? 'Naissance & ancrage'
                    : 'Birth & anchorage'}
                </dt>
                <dd className="mt-1 text-base font-semibold theme-text">
                  {language === 'fr'
                    ? `${artistData.birthDateFormattedFr} · ${artistData.anchorageFr}`
                    : `${artistData.birthDateFormattedEn} · ${artistData.anchorageEn}`}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium uppercase tracking-wider theme-muted">
                  {language === 'fr'
                    ? 'Registre musical documenté'
                    : 'Documented musical register'}
                </dt>
                <dd className="mt-1 text-sm md:text-base theme-text opacity-90">
                  {(language === 'fr'
                    ? artistData.universeKeywordsFr
                    : artistData.universeKeywordsEn
                  ).join(' · ')}
                </dd>
              </div>
            </dl>
          </div>

          {/* Image verticale autorisée à droite avec déplacement différentiel léger */}
          <div className="lg:col-span-5">
            <div ref={imageWrapRef}>
              <figure className="theme-surface border theme-border overflow-hidden">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#171717]">
                  {!imgError ? (
                    <img
                      src="/assets/aistudio/images__7__25a61c6f.jpg"
                      alt={
                        language === 'fr'
                          ? 'Portrait de Maahlox Le Vibeur portant un blouson blanc à écussons et des lunettes noires'
                          : 'Portrait of Maahlox Le Vibeur wearing a white patched bomber jacket and dark sunglasses'
                      }
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      width={900}
                      height={1200}
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center p-6 text-center">
                      <span className="font-display text-2xl theme-muted">
                        MAAHLOX LE VIBEUR
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="p-4 border-t theme-border flex items-center justify-between gap-4 font-poppins text-xs theme-muted">
                  <span>
                    {language === 'fr'
                      ? 'Portrait studio · Esthétique frontale'
                      : 'Studio portrait · Direct aesthetic'}
                  </span>
                  <span className="font-semibold theme-accent-text">FIG. 02</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
