import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Disc, Info, VolumeX, X } from 'lucide-react';
import {
  optionalAudioConfig,
  ReleaseProject,
  releasesData,
} from '../data/releases';
import { artistData } from '../data/artist';
import { DecorativeAudioVisualizer } from './DecorativeAudioVisualizer';
import { useAppSettings } from '../context/AppSettingsContext';

gsap.registerPlugin(ScrollTrigger);

export const DiscographySection: React.FC = () => {
  const { language } = useAppSettings();
  const [selectedProject, setSelectedProject] = useState<ReleaseProject | null>(
    null
  );
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const repertoireRef = useRef<HTMLDivElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

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

      if (cardsGridRef.current) {
        gsap.fromTo(
          '.release-project-card',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      if (repertoireRef.current) {
        gsap.fromTo(
          '.repertoire-track-item',
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: repertoireRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openProjectDetails = (
    project: ReleaseProject,
    triggerEl: HTMLButtonElement
  ) => {
    lastTriggerRef.current = triggerEl;
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 20);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeProjectDetails();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      id="musique"
      ref={sectionRef}
      aria-labelledby="discographie-heading"
      className="relative py-20 md:py-32 theme-bg border-b theme-border transition-colors duration-250 font-poppins"
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
                ? '03. Discographie & Répertoire'
                : '03. Discography & Repertoire'}
            </p>
            <h2
              id="discographie-heading"
              className="font-display text-4xl md:text-6xl theme-text tracking-tight"
            >
              {language === 'fr' ? 'LES PROJETS' : 'PROJECTS'}
            </h2>
          </div>
          <p className="text-xs theme-muted font-medium">
            {language === 'fr'
              ? '4 projets documentés (2013 – 2024) · Sélection non exhaustive'
              : '4 documented projects (2013 – 2024) · Non-exhaustive selection'}
          </p>
        </div>

        {/* Grille des 4 projets */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {releasesData.map((project) => (
            <article
              key={project.id}
              className="release-project-card group theme-surface border theme-border hover:border-[#FF5A1F] transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Composition typographique temporaire (toujours sombre pour l'effet pochette vinyle/affiche) */}
                <div className="relative aspect-square w-full bg-[#080808] text-[#F5F1E8] border-b theme-border p-6 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-medium text-[#A8A29A]">
                    <span>{project.typographicPosterCode.indexNumber}</span>
                    <span
                      style={{
                        color: project.typographicPosterCode.accentColor,
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  <div className="my-auto py-4">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-[#A8A29A] mb-2">
                      MAAHLOX LE VIBEUR
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl text-[#F5F1E8] leading-[0.95] tracking-wide group-hover:text-[#FF5A1F] transition-colors duration-150 [text-wrap:balance]">
                      {project.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[#F5F1E8]/12 flex items-center justify-between text-[11px] text-[#A8A29A]">
                    <span>
                      {language === 'fr'
                        ? 'Composition typographique temporaire'
                        : 'Temporary typographic artwork'}
                    </span>
                    <span>{project.typographicPosterCode.shortCode}</span>
                  </div>
                </div>

                {/* Corps de carte */}
                <div className="p-6">
                  <p className="text-xs font-semibold theme-accent-text mb-2">
                    {language === 'fr'
                      ? project.releaseDateNoteFr
                      : project.releaseDateNoteEn}
                  </p>
                  <p className="text-sm theme-text opacity-85 leading-relaxed mb-4">
                    {language === 'fr'
                      ? project.roleInTimelineFr
                      : project.roleInTimelineEn}
                  </p>
                </div>
              </div>

              {/* Actions de carte */}
              <div className="px-6 pb-6 pt-3 border-t theme-border flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => openProjectDetails(project, e.currentTarget)}
                  aria-haspopup="dialog"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider theme-text hover:text-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Info
                    className="w-4 h-4 theme-accent-text"
                    aria-hidden="true"
                  />
                  <span>
                    {language === 'fr' ? 'Fiche détaillée' : 'Project details'}
                  </span>
                </button>

                {project.verifiedListenLinks[0] && (
                  <a
                    href={project.verifiedListenLinks[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${
                      language === 'fr'
                        ? project.verifiedListenLinks[0].labelFr
                        : project.verifiedListenLinks[0].labelEn
                    } — ${project.title}`}
                    className="inline-flex items-center gap-1 text-xs font-medium theme-muted hover:theme-text transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <span>Deezer</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Visualiseur audio décoratif (Canvas) */}
        <div className="mb-16">
          <DecorativeAudioVisualizer variant="studio-panel" />
        </div>

        {/* Sélection de titres documentés */}
        <div
          ref={repertoireRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t theme-border"
        >
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display text-3xl md:text-4xl theme-text">
              {language === 'fr'
                ? 'SÉLECTION DE TITRES DOCUMENTÉS'
                : 'DOCUMENTED TRACK SELECTION'}
            </h3>
            <p className="text-sm theme-muted leading-relaxed">
              {language === 'fr'
                ? 'Titres mis en avant dans les présentations de son parcours entre le début des années 2010 et ses projets récents. Cette sélection n’est pas exhaustive.'
                : 'Tracks highlighted across presentations of his career from the early 2010s to recent releases. This list is non-exhaustive.'}
            </p>

            {!optionalAudioConfig.isEnabled && (
              <div className="p-4 theme-surface border theme-border text-xs theme-muted space-y-1.5">
                <div className="flex items-center gap-2 theme-text font-semibold">
                  <VolumeX
                    className="w-4 h-4 theme-accent-text shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    {language === 'fr'
                      ? 'Lecteur audio direct en attente d’extraits autorisés'
                      : 'Direct audio player awaiting authorized excerpts'}
                  </span>
                </div>
                <p className="leading-relaxed">
                  {language === 'fr'
                    ? 'Conformément à la charte du projet, aucun lecteur simulé n’est affiché tant que les fichiers maîtres autorisés par les ayants droit ne sont pas fournis.'
                    : 'In accordance with project guidelines, no simulated player is shown until master audio files authorized by rights holders are provided.'}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y theme-border border-t border-b">
              {artistData.repertoireSelection.map((track, index) => {
                const note =
                  language === 'fr' ? track.noteFr : track.noteEn;
                const yearCtx =
                  language === 'fr'
                    ? track.yearContextFr
                    : track.yearContextEn;
                return (
                  <li
                    key={track.title}
                    className="repertoire-track-item py-3.5 px-2 flex flex-wrap items-center justify-between gap-4 hover:theme-surface transition-colors duration-150"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-semibold theme-accent-text w-6">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base font-medium theme-text">
                        {track.title}
                      </span>
                      {note && (
                        <span className="text-xs theme-muted">· {note}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      {yearCtx && (
                        <span className="text-xs theme-muted">{yearCtx}</span>
                      )}
                      <a
                        href={`https://www.deezer.com/fr/search/${encodeURIComponent(
                          `Maahlox Le Vibeur ${track.title}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium theme-muted hover:text-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
                      >
                        <span>
                          {language === 'fr'
                            ? 'Rechercher sur Deezer'
                            : 'Search on Deezer'}
                        </span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Panneau modal accessible de détails d'un projet */}
      {selectedProject && (
        <div
          style={{ backgroundColor: 'var(--modal-backdrop)' }}
          className="fixed inset-0 z-[80] backdrop-blur-xs flex items-center justify-center p-4 md:p-6 font-poppins"
          onClick={closeProjectDetails}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl theme-surface border theme-border-strong p-6 md:p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b theme-border">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
                  {selectedProject.typographicPosterCode.indexNumber} ·{' '}
                  {language === 'fr'
                    ? selectedProject.releaseDateNoteFr
                    : selectedProject.releaseDateNoteEn}
                </p>
                <h3
                  id="modal-project-title"
                  className="font-display text-3xl md:text-5xl theme-text mt-1"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                ref={modalCloseBtnRef}
                type="button"
                onClick={closeProjectDetails}
                aria-label={
                  language === 'fr'
                    ? 'Fermer la fiche du projet'
                    : 'Close project details'
                }
                className="inline-flex items-center justify-center w-10 h-10 border theme-border-strong theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-6 text-sm md:text-base theme-text opacity-90">
              <p className="leading-relaxed">
                {language === 'fr'
                  ? selectedProject.descriptionFr
                  : selectedProject.descriptionEn}
              </p>

              <div className="p-4 theme-bg border theme-border space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider theme-muted">
                  {language === 'fr'
                    ? 'Informations documentées :'
                    : 'Documented information:'}
                </p>
                <ul className="space-y-1.5 text-xs md:text-sm">
                  {(language === 'fr'
                    ? selectedProject.documentedDetailsFr
                    : selectedProject.documentedDetailsEn
                  ).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="theme-accent-text font-semibold">—</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProject.documentedTracksFr.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider theme-muted mb-2">
                    {language === 'fr'
                      ? 'Titres associés à cette période dans les sources :'
                      : 'Tracks associated with this period in sources:'}
                  </p>
                  <p className="text-sm theme-text">
                    {(language === 'fr'
                      ? selectedProject.documentedTracksFr
                      : selectedProject.documentedTracksEn
                    ).join(' · ')}
                  </p>
                </div>
              )}

              <div className="text-xs theme-muted flex items-center gap-2 pt-2">
                <Disc
                  className="w-4 h-4 theme-accent-text shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {language === 'fr'
                    ? 'Note éditoriale : La liste complète des pistes, la durée exacte, le label et la pochette officielle seront affichés après transmission par l’équipe de l’artiste.'
                    : 'Editorial note: Complete tracklist, exact runtime, label, and official cover art will be displayed once provided by the artist’s team.'}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t theme-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {selectedProject.verifiedListenLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 theme-accent-bg font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 whitespace-nowrap shrink-0"
                  >
                    <span>
                      {language === 'fr' ? link.labelFr : link.labelEn}
                    </span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={closeProjectDetails}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider theme-muted hover:theme-text border theme-border-strong transition-colors duration-150"
              >
                {language === 'fr' ? 'Fermer (Échap)' : 'Close (Esc)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
