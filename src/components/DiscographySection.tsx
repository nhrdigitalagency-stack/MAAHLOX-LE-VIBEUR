import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  ArrowUpRight,
  Disc,
  Info,
  Search,
  VolumeX,
  X,
} from 'lucide-react';
import {
  ChronologyEraGroup,
  documentedChronologyData,
  optionalAudioConfig,
  ReleaseProject,
  releasesData,
} from '../data/releases';
import { DecorativeAudioVisualizer } from './DecorativeAudioVisualizer';
import { SocialBrandLogo } from './SocialBrandLogo';
import { useAppSettings } from '../context/AppSettingsContext';

gsap.registerPlugin(ScrollTrigger);

export const DiscographySection: React.FC = () => {
  const { language } = useAppSettings();
  const [selectedProject, setSelectedProject] = useState<ReleaseProject | null>(
    null
  );
  const [selectedEraGroup, setSelectedEraGroup] =
    useState<ChronologyEraGroup>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyConfirmedSpotify, setOnlyConfirmedSpotify] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const totalDocumentedTracksCount = useMemo(
    () =>
      documentedChronologyData.reduce(
        (acc, block) => acc + block.tracks.length,
        0
      ),
    []
  );

  const filteredChronologyBlocks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return documentedChronologyData
      .filter((block) =>
        selectedEraGroup === 'all' ? true : block.eraGroup === selectedEraGroup
      )
      .map((block) => {
        const filteredTracks = block.tracks.filter((track) => {
          if (onlyConfirmedSpotify && track.spotifyAction !== 'listen_confirmed') {
            return false;
          }
          if (!q) return true;
          const haystack = [
            track.title,
            track.artistsOrCollabFr || '',
            track.artistsOrCollabEn || '',
            track.dateOrPeriodFr,
            track.dateOrPeriodEn,
            block.periodTitleFr,
          ]
            .join(' ')
            .toLowerCase();
          return haystack.includes(q);
        });

        return {
          ...block,
          tracks: filteredTracks,
        };
      })
      .filter((block) => block.tracks.length > 0);
  }, [selectedEraGroup, searchQuery, onlyConfirmedSpotify]);

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

  const eraFilterButtons: {
    id: ChronologyEraGroup;
    labelFr: string;
    labelEn: string;
  }[] = [
    {
      id: 'all',
      labelFr: `Toute la chronologie (${totalDocumentedTracksCount})`,
      labelEn: `Full chronology (${totalDocumentedTracksCount})`,
    },
    {
      id: '2012-2017',
      labelFr: '2012 – 2017 (Débuts & Ça sort comme ça sort)',
      labelEn: '2012 – 2017 (Early & Ça sort comme ça sort)',
    },
    {
      id: '2018-2021',
      labelFr: '2018 – 2021 (Singles & Prends seulement ta part)',
      labelEn: '2018 – 2021 (Singles & Prends seulement ta part)',
    },
    {
      id: '2022-2023',
      labelFr: '2022 – 2023 (Singles & Collaborations)',
      labelEn: '2022 – 2023 (Singles & Collaborations)',
    },
    {
      id: '2024-2026',
      labelFr: '2024 – 2026 (Izacam Vol. 1 & Sorties récentes)',
      labelEn: '2024 – 2026 (Izacam Vol. 1 & Recent releases)',
    },
  ];

  return (
    <section
      id="musique"
      ref={sectionRef}
      aria-labelledby="discographie-heading"
      className="relative py-20 md:py-32 theme-bg border-b theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* En-tête de section + Lien direct vers le profil Spotify */}
        <div
          ref={headerRef}
          className="flex flex-wrap items-end justify-between gap-6 pb-8 mb-12 border-b theme-border"
        >
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest theme-accent-text mb-2">
              {language === 'fr'
                ? '03. Discographie & Catalogue Chronologique (2012 – 2026)'
                : '03. Discography & Chronological Catalog (2012 – 2026)'}
            </p>
            <h2
              id="discographie-heading"
              className="font-display text-4xl md:text-6xl theme-text tracking-tight"
            >
              {language === 'fr'
                ? 'PROJETS & TOUS LES SONS DOCUMENTÉS'
                : 'PROJECTS & ALL DOCUMENTED TRACKS'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://open.spotify.com/search/Maahlox%20Le%20Vibeur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 theme-accent-bg font-poppins font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 whitespace-nowrap shrink-0"
            >
              <SocialBrandLogo platform="spotify" className="w-4 h-4" />
              <span>
                {language === 'fr'
                  ? 'Profil Spotify : Maahlox Le Vibeur'
                  : 'Spotify Profile: Maahlox Le Vibeur'}
              </span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href="https://www.deezer.com/fr/search/Maahlox%20Le%20Vibeur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 theme-surface border theme-border-strong font-poppins font-semibold text-xs uppercase tracking-wider theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <SocialBrandLogo platform="deezer" className="w-4 h-4" />
              <span>Deezer</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Grille des 4 projets repères */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {releasesData.map((project) => (
            <article
              key={project.id}
              className="release-project-card group theme-surface border theme-border hover:border-[#FF5A1F] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Composition typographique temporaire */}
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
                        ? `${project.documentedTracksFr.length} pistes documentées`
                        : `${project.documentedTracksEn.length} documented tracks`}
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
                    {language === 'fr'
                      ? `Tracklist (${project.documentedTracksFr.length})`
                      : `Tracklist (${project.documentedTracksEn.length})`}
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
                    className="inline-flex items-center gap-1.5 text-xs font-medium theme-muted hover:text-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <SocialBrandLogo platform="spotify" className="w-3.5 h-3.5" />
                    <span>Spotify</span>
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

        {/* CATALOGUE CHRONOLOGIQUE COMPLET (11 PÉRIODES · 2012 – 2026) */}
        <div className="pt-10 border-t theme-border space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
                {language === 'fr'
                  ? 'Répertoire chronologique vérifié (Qobuz, Spotify, Stillac, Audiomack, Shazam, Soundcharts)'
                  : 'Verified chronological repertoire (Qobuz, Spotify, Stillac, Audiomack, Shazam, Soundcharts)'}
              </p>
              <h3 className="font-display text-3xl md:text-5xl theme-text tracking-tight">
                {language === 'fr'
                  ? `CHRONOLOGIE DES SORTIES (${totalDocumentedTracksCount} MORCEAUX RECENSÉS)`
                  : `RELEASE CHRONOLOGY (${totalDocumentedTracksCount} INDEXED TRACKS)`}
              </h3>
              <p className="text-sm theme-muted leading-relaxed">
                {language === 'fr'
                  ? 'Distinction stricte entre les pistes dont la présence directe sur Spotify est confirmée (« Écouter ») et les autres titres documentés (« Rechercher » — sans garantie de disponibilité sur la plateforme).'
                  : 'Strict distinction between tracks with confirmed direct availability on Spotify (“Listen”) and other documented tracks (“Search” — availability on the platform not guaranteed).'}
              </p>
            </div>

            {!optionalAudioConfig.isEnabled && (
              <div className="p-4 theme-surface border theme-border text-xs theme-muted max-w-md space-y-1">
                <div className="flex items-center gap-2 theme-text font-semibold">
                  <VolumeX
                    className="w-4 h-4 theme-accent-text shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    {language === 'fr'
                      ? 'Écoute externe via Spotify / Deezer'
                      : 'External listening via Spotify / Deezer'}
                  </span>
                </div>
                <p className="leading-relaxed">
                  {language === 'fr'
                    ? 'Aucun lecteur audio interne simulé n’est affiché tant que les extraits maîtres autorisés ne sont pas fournis.'
                    : 'No simulated built-in audio player is shown until authorized master audio excerpts are provided.'}
                </p>
              </div>
            )}
          </div>

          {/* Barre de filtres par période + Recherche instantanée + Filtre pistes Spotify confirmées */}
          <div className="p-5 theme-surface border theme-border space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {eraFilterButtons.map((btn) => {
                const active = selectedEraGroup === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => setSelectedEraGroup(btn.id)}
                    aria-pressed={active}
                    className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors duration-150 ${
                      active
                        ? 'theme-accent-bg border-[#FF5A1F]'
                        : 'theme-bg theme-text theme-border hover:border-[#FF5A1F]'
                    }`}
                  >
                    {language === 'fr' ? btn.labelFr : btn.labelEn}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t theme-border">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="w-4 h-4 theme-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'fr'
                      ? 'Rechercher un titre, une année ou une collaboration (ex. Koppo, Black M, Magasco)...'
                      : 'Search a track, year, or collaboration (e.g. Koppo, Black M, Magasco)...'
                  }
                  aria-label={
                    language === 'fr'
                      ? 'Filtrer les morceaux par titre ou artiste associé'
                      : 'Filter tracks by title or featured artist'
                  }
                  className="w-full pl-10 pr-4 py-2.5 theme-bg border theme-border-strong text-xs md:text-sm theme-text placeholder:opacity-55 focus:border-[#FF5A1F]"
                />
              </div>

              <label className="inline-flex items-center gap-2.5 cursor-pointer text-xs font-medium theme-text select-none">
                <input
                  type="checkbox"
                  checked={onlyConfirmedSpotify}
                  onChange={(e) => setOnlyConfirmedSpotify(e.target.checked)}
                  className="w-4 h-4 accent-[#FF5A1F]"
                />
                <span>
                  {language === 'fr'
                    ? 'Afficher uniquement les pistes Spotify directement confirmées (« Écouter »)'
                    : 'Show only directly confirmed Spotify tracks (“Listen”)'}
                </span>
              </label>
            </div>
          </div>

          {/* Liste des 11 blocs chronologiques */}
          {filteredChronologyBlocks.length === 0 ? (
            <div className="p-8 theme-surface border theme-border text-center space-y-3">
              <p className="text-sm font-medium theme-text">
                {language === 'fr'
                  ? 'Aucun morceau ne correspond à votre recherche.'
                  : 'No tracks match your current filter.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedEraGroup('all');
                  setOnlyConfirmedSpotify(false);
                }}
                className="px-4 py-2 theme-accent-bg text-xs font-semibold uppercase tracking-wider"
              >
                {language === 'fr'
                  ? 'Réinitialiser les filtres'
                  : 'Reset filters'}
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredChronologyBlocks.map((block) => (
                <div
                  key={block.id}
                  className="theme-surface border theme-border p-6 md:p-8 space-y-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b theme-border">
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-2.5 py-0.5 theme-accent-bg text-[11px] font-bold uppercase tracking-wider tabular-nums">
                          {language === 'fr'
                            ? `CHAPITRE ${block.eraNumber}`
                            : `CHAPTER ${block.eraNumber}`}
                        </span>
                        <span className="text-xs font-semibold theme-accent-text">
                          {language === 'fr'
                            ? block.subtitleFr
                            : block.subtitleEn}
                        </span>
                      </div>
                      <h4 className="font-display text-2xl sm:text-3xl md:text-4xl theme-text tracking-wide">
                        {language === 'fr'
                          ? block.periodTitleFr
                          : block.periodTitleEn}
                      </h4>
                      <p className="text-xs md:text-sm theme-muted leading-relaxed">
                        {language === 'fr'
                          ? block.editorialContextFr
                          : block.editorialContextEn}
                      </p>
                    </div>

                    {block.projectSpotifyUrl && (
                      <a
                        href={block.projectSpotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 theme-bg border theme-border-strong text-xs font-semibold theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 shrink-0"
                      >
                        <SocialBrandLogo
                          platform="spotify"
                          className="w-4 h-4 text-[#FF5A1F]"
                        />
                        <span>
                          {language === 'fr'
                            ? block.projectSpotifyLabelFr
                            : block.projectSpotifyLabelEn}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  {/* Alerte méthodologique éventuelle (ex. distinction single 2018 / album 2019 pour Prends seulement ta part) */}
                  {block.methodologyAlertFr && (
                    <div className="p-4 theme-bg border border-[#FF5A1F]/50 flex items-start gap-3 text-xs">
                      <AlertCircle
                        className="w-4 h-4 theme-accent-text shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="theme-text leading-relaxed">
                        {language === 'fr'
                          ? block.methodologyAlertFr
                          : block.methodologyAlertEn}
                      </p>
                    </div>
                  )}

                  {/* Tableau / Liste des morceaux de la période */}
                  <ul className="divide-y theme-border border-t border-b">
                    {block.tracks.map((track, idx) => {
                      const collab =
                        language === 'fr'
                          ? track.artistsOrCollabFr
                          : track.artistsOrCollabEn;
                      const dateLabel =
                        language === 'fr'
                          ? track.dateOrPeriodFr
                          : track.dateOrPeriodEn;
                      const sourceNote =
                        language === 'fr'
                          ? track.sourceNoteFr
                          : track.sourceNoteEn;
                      const isConfirmed =
                        track.spotifyAction === 'listen_confirmed';

                      return (
                        <li
                          key={track.id}
                          className="py-3.5 px-2 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:theme-bg transition-colors duration-150"
                        >
                          <div className="flex items-baseline gap-3.5">
                            <span className="text-xs font-semibold theme-accent-text w-7 shrink-0 tabular-nums">
                              {track.trackNumber
                                ? `#${String(track.trackNumber).padStart(2, '0')}`
                                : String(idx + 1).padStart(2, '0')}
                            </span>
                            <div className="space-y-0.5">
                              <div className="flex flex-wrap items-baseline gap-2">
                                <span className="text-sm md:text-base font-semibold theme-text">
                                  {track.title}
                                </span>
                                {collab && (
                                  <span className="text-xs font-medium theme-accent-text">
                                    — {collab}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-[11px] theme-muted">
                                <span>{dateLabel}</span>
                                {sourceNote && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="theme-text opacity-80">
                                      {sourceNote}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                            <a
                              href={track.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 whitespace-nowrap ${
                                isConfirmed
                                  ? 'theme-accent-bg hover:opacity-90'
                                  : 'theme-bg border theme-border-strong theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F]'
                              }`}
                            >
                              <SocialBrandLogo
                                platform="spotify"
                                className="w-3.5 h-3.5"
                              />
                              <span>
                                {isConfirmed
                                  ? language === 'fr'
                                    ? 'Écouter'
                                    : 'Listen'
                                  : language === 'fr'
                                  ? 'Rechercher'
                                  : 'Search'}
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
              ))}
            </div>
          )}
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
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto theme-surface border theme-border-strong p-6 md:p-8 shadow-2xl"
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
                  <p className="text-xs font-semibold uppercase tracking-wider theme-muted mb-2.5">
                    {language === 'fr'
                      ? `Pistes documentées (${selectedProject.documentedTracksFr.length}) :`
                      : `Documented tracks (${selectedProject.documentedTracksEn.length}):`}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm theme-text p-4 theme-bg border theme-border max-h-64 overflow-y-auto">
                    {(language === 'fr'
                      ? selectedProject.documentedTracksFr
                      : selectedProject.documentedTracksEn
                    ).map((trk, idx) => (
                      <li key={idx} className="py-1 border-b theme-border last:border-b-0">
                        {trk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-xs theme-muted flex items-center gap-2 pt-2">
                <Disc
                  className="w-4 h-4 theme-accent-text shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {language === 'fr'
                    ? 'Note éditoriale : Les pochettes officielles haute définition et crédits complets de production seront affichés après transmission par l’équipe de l’artiste.'
                    : 'Editorial note: High-definition official cover art and full production credits will be displayed once provided by the artist’s team.'}
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
                    <SocialBrandLogo
                      platform={
                        link.platform === 'Spotify' ? 'spotify' : 'deezer'
                      }
                      className="w-4 h-4"
                    />
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
