import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { artistData } from '../data/artist';
import { useAppSettings } from '../context/AppSettingsContext';

gsap.registerPlugin(ScrollTrigger);

export const BiographySection: React.FC = () => {
  const { language } = useAppSettings();
  const [activeChapterId, setActiveChapterId] = useState<string>(
    artistData.chapters[0]?.id || 'yaounde-obili'
  );
  const [showFullNarrative, setShowFullNarrative] = useState<boolean>(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const synthesisRef = useRef<HTMLDivElement | null>(null);
  const stickyVisualRef = useRef<HTMLDivElement | null>(null);
  const chapterRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (synthesisRef.current) {
        gsap.fromTo(
          synthesisRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: synthesisRef.current,
              start: 'top 84%',
            },
          }
        );
      }

      if (stickyVisualRef.current) {
        gsap.fromTo(
          stickyVisualRef.current,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stickyVisualRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      const chapterElements =
        gsap.utils.toArray<HTMLElement>('.bio-chapter-card');
      chapterElements.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const elements = Object.values(chapterRefs.current).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const chapterId = visible[0].target.getAttribute('data-chapter-id');
          if (chapterId) {
            setActiveChapterId(chapterId);
          }
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.15, 0.4, 0.7],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeChapter =
    artistData.chapters.find((ch) => ch.id === activeChapterId) ||
    artistData.chapters[0];

  const scrollToChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    const targetEl = chapterRefs.current[chapterId];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const longParagraphs =
    language === 'fr'
      ? artistData.longBioParagraphsFr
      : artistData.longBioParagraphsEn;

  return (
    <section
      id="biographie"
      ref={sectionRef}
      aria-labelledby="biographie-heading"
      className="relative py-20 md:py-32 theme-surface border-b theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* En-tête de section */}
        <div
          ref={headerRef}
          className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-12 border-b theme-border"
        >
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest theme-accent-text mb-2">
              {language === 'fr'
                ? '02. Biographie & Chronologie documentée'
                : '02. Biography & Documented Timeline'}
            </p>
            <h2
              id="biographie-heading"
              className="font-display text-4xl md:text-6xl theme-text tracking-tight [text-wrap:balance]"
            >
              {language === 'fr'
                ? 'PARCOURS D’OBILI AUX SCÈNES URBAINES'
                : 'JOURNEY FROM OBILI TO URBAN STAGES'}
            </h2>
          </div>
          <p className="text-xs theme-muted font-medium">
            {language === 'fr'
              ? 'Jean-Jules Kenfack · Né le 16 janvier 1990 à Yaoundé'
              : 'Jean-Jules Kenfack · Born January 16, 1990 in Yaoundé'}
          </p>
        </div>

        {/* Texte biographique intégral */}
        <div
          ref={synthesisRef}
          className="mb-16 p-6 md:p-10 theme-bg border theme-border shadow-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b theme-border">
            <div>
              <h3 className="text-lg font-semibold theme-text">
                {language === 'fr'
                  ? 'Synthèse biographique vérifiée'
                  : 'Verified Biographical Synthesis'}
              </h3>
              <p className="text-xs theme-muted mt-0.5">
                {language === 'fr'
                  ? 'Repères publics et parcours musical documenté'
                  : 'Public milestones and documented musical trajectory'}
              </p>
            </div>
            <div className="flex items-center gap-2 theme-surface p-1 border theme-border">
              <button
                type="button"
                onClick={() => setShowFullNarrative(true)}
                className={`px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  showFullNarrative
                    ? 'theme-accent-bg font-semibold'
                    : 'theme-muted hover:theme-text'
                }`}
              >
                {language === 'fr' ? 'Version complète' : 'Full version'}
              </button>
              <button
                type="button"
                onClick={() => setShowFullNarrative(false)}
                className={`px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  !showFullNarrative
                    ? 'theme-accent-bg font-semibold'
                    : 'theme-muted hover:theme-text'
                }`}
              >
                {language === 'fr' ? 'Version courte' : 'Short version'}
              </button>
            </div>
          </div>

          {showFullNarrative ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-base theme-text opacity-90 leading-relaxed">
              <div className="space-y-4">
                <p>{longParagraphs[0]}</p>
                <p>{longParagraphs[1]}</p>
              </div>
              <div className="space-y-4">
                <p>{longParagraphs[2]}</p>
                <p>{longParagraphs[3]}</p>
              </div>
            </div>
          ) : (
            <p className="text-base md:text-lg theme-text opacity-90 leading-relaxed max-w-4xl">
              {language === 'fr'
                ? artistData.shortBioFr
                : artistData.shortBioEn}
            </p>
          )}
        </div>

        {/* Architecture Desktop & Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Colonne gauche (Sticky uniquement sur grand écran lg+) */}
          <div
            ref={stickyVisualRef}
            className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28 space-y-6"
          >
            <figure className="theme-bg border theme-border overflow-hidden shadow-xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#080808]">
                <img
                  key={activeChapter.imagePath}
                  src={activeChapter.imagePath}
                  alt={
                    language === 'fr'
                      ? activeChapter.imageAltFr
                      : activeChapter.imageAltEn
                  }
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  width={1080}
                  height={810}
                  className="h-full w-full object-cover object-center transition-opacity duration-300"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between gap-2">
                  <span className="font-display text-3xl text-[#F5F1E8]">
                    {activeChapter.number}. {activeChapter.title[language]}
                  </span>
                  <span className="text-xs font-medium text-[#DFFF00]">
                    {language === 'fr'
                      ? activeChapter.periodFr
                      : activeChapter.periodEn}
                  </span>
                </div>
              </div>
              <figcaption className="p-4 border-t theme-border flex items-center justify-between text-xs theme-muted">
                <span>
                  {language === 'fr'
                    ? activeChapter.imageCaptionFr
                    : activeChapter.imageCaptionEn}
                </span>
                <span className="font-semibold">
                  {language === 'fr' ? 'CHAPITRE' : 'CHAPTER'}{' '}
                  {activeChapter.number} / 05
                </span>
              </figcaption>
            </figure>

            {/* Sommaire interactif des 5 chapitres */}
            <nav
              aria-label={
                language === 'fr'
                  ? 'Chapitres de la biographie'
                  : 'Biography chapters'
              }
              className="theme-bg border theme-border p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wider theme-muted mb-3">
                {language === 'fr'
                  ? 'Navigation par chapitre'
                  : 'Chapter navigation'}
              </p>
              <ul className="space-y-1">
                {artistData.chapters.map((chapter) => {
                  const isActive = chapter.id === activeChapterId;
                  return (
                    <li key={chapter.id}>
                      <button
                        type="button"
                        onClick={() => scrollToChapter(chapter.id)}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors duration-150 ${
                          isActive
                            ? 'theme-accent-bg font-semibold'
                            : 'theme-muted hover:theme-text hover:theme-surface'
                        }`}
                      >
                        <span className="truncate">
                          {chapter.number}. {chapter.title[language]}
                        </span>
                        <span className="ml-2 shrink-0">
                          {language === 'fr'
                            ? chapter.periodFr
                            : chapter.periodEn}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Colonne droite : Les 5 chapitres chronologiques documentés */}
          <div className="lg:col-span-7 space-y-8">
            {artistData.chapters.map((chapter) => {
              const isCurrent = chapter.id === activeChapterId;
              const facts =
                language === 'fr'
                  ? chapter.documentedFactsFr
                  : chapter.documentedFactsEn;
              return (
                <article
                  key={chapter.id}
                  ref={(el) => {
                    chapterRefs.current[chapter.id] = el;
                  }}
                  data-chapter-id={chapter.id}
                  className={`bio-chapter-card p-6 md:p-8 theme-bg border transition-colors duration-200 ${
                    isCurrent ? 'border-[#FF5A1F]' : 'theme-border'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 mb-4 border-b theme-border">
                    <span className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
                      {language === 'fr' ? 'Chapitre' : 'Chapter'}{' '}
                      {chapter.number} ·{' '}
                      {language === 'fr' ? chapter.periodFr : chapter.periodEn}
                    </span>
                    <span className="text-xs theme-muted">
                      {language === 'fr'
                        ? 'Repère vérifié'
                        : 'Verified milestone'}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl theme-text tracking-wide mb-2">
                    {chapter.number}. {chapter.title[language]}
                  </h3>
                  <p className="text-sm font-medium theme-muted mb-5">
                    {chapter.subtitle[language]}
                  </p>

                  {/* Image visible sur mobile/tablette dans le flux naturel */}
                  <figure className="lg:hidden mb-5 border theme-border overflow-hidden theme-surface">
                    <img
                      src={chapter.imagePath}
                      alt={
                        language === 'fr'
                          ? chapter.imageAltFr
                          : chapter.imageAltEn
                      }
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      width={800}
                      height={600}
                      className="w-full aspect-[16/10] object-cover object-center"
                    />
                    <figcaption className="px-3 py-2 text-xs theme-muted border-t theme-border">
                      {language === 'fr'
                        ? chapter.imageCaptionFr
                        : chapter.imageCaptionEn}
                    </figcaption>
                  </figure>

                  <p className="text-base theme-text opacity-90 leading-relaxed mb-6">
                    {chapter.body[language]}
                  </p>

                  {/* Points documentés */}
                  <div className="pt-4 border-t theme-border">
                    <p className="text-xs font-semibold uppercase tracking-wider theme-muted mb-2.5">
                      {language === 'fr'
                        ? 'Éléments documentés :'
                        : 'Documented facts:'}
                    </p>
                    <ul className="space-y-1.5 text-xs md:text-sm theme-text opacity-85">
                      {facts.map((fact, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="theme-accent-text font-semibold shrink-0">
                            —
                          </span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
