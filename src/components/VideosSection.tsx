import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Film, Play, X } from 'lucide-react';
import { VideoClip, videosData } from '../data/videos';
import { socialsData } from '../data/socials';
import { SocialBrandLogo } from './SocialBrandLogo';
import { useAppSettings } from '../context/AppSettingsContext';

export const VideosSection: React.FC = () => {
  const { language } = useAppSettings();
  const [activeClip, setActiveClip] = useState<VideoClip | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const primaryClip =
    videosData.find((v) => v.isPrimaryHighlight) || videosData[0];
  const secondaryClips = videosData.filter((v) => v.id !== primaryClip.id);
  const youtubeChannel = socialsData.find((s) => s.platform === 'youtube');

  const openClipModal = (clip: VideoClip, triggerEl: HTMLButtonElement) => {
    lastTriggerRef.current = triggerEl;
    setActiveClip(clip);
  };

  const closeClipModal = () => {
    setActiveClip(null);
    window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 20);
  };

  useEffect(() => {
    if (!activeClip) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeClipModal();
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
  }, [activeClip]);

  return (
    <section
      id="videos"
      aria-labelledby="videos-heading"
      className="relative py-20 md:py-32 theme-surface border-b theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* En-tête de section */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-12 border-b theme-border">
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest theme-accent-text mb-2">
              {language === 'fr'
                ? '04. Vidéographie & Clips'
                : '04. Videography & Music Videos'}
            </p>
            <h2
              id="videos-heading"
              className="font-display text-4xl md:text-6xl theme-text tracking-tight"
            >
              {language === 'fr' ? 'SÉLECTION VIDÉO' : 'VIDEO SELECTION'}
            </h2>
          </div>
          <p className="text-xs theme-muted font-medium">
            {language === 'fr'
              ? 'Référence documentée : Playlist « MAAHLOX Le Vibeur – CLIPS OFFICIELS »'
              : 'Documented reference: Playlist “MAAHLOX Le Vibeur – CLIPS OFFICIELS”'}
          </p>
        </div>

        {/* Mise en avant principale : "Ça sort comme ça sort" */}
        <div className="mb-12 theme-bg border theme-border overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-8 relative aspect-[16/9] bg-[#080808] overflow-hidden">
              <img
                src={primaryClip.posterImagePath}
                alt={
                  language === 'fr'
                    ? primaryClip.posterImageAltFr
                    : primaryClip.posterImageAltEn
                }
                loading="lazy"
                referrerPolicy="no-referrer"
                width={1920}
                height={1080}
                className="h-full w-full object-cover object-center opacity-85"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/35 to-transparent"
              />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-[#DFFF00] mb-1">
                    {language === 'fr'
                      ? primaryClip.featuredNoteFr
                      : primaryClip.featuredNoteEn}
                  </p>
                  <h3 className="font-display text-4xl md:text-6xl text-[#F5F1E8]">
                    {primaryClip.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={(e) => openClipModal(primaryClip, e.currentTarget)}
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#FF5A1F] text-[#080808] font-semibold text-xs md:text-sm uppercase tracking-wider hover:bg-[#F5F1E8] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>
                    {language === 'fr'
                      ? 'Ouvrir la fiche vidéo'
                      : 'Open video details'}
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 md:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l theme-border">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
                  {language === 'fr' ? 'CLIP PRINCIPAL' : 'FEATURED VIDEO'}
                </p>
                <h4 className="text-xl font-semibold theme-text">
                  {primaryClip.title}
                </h4>
                <p className="text-sm theme-muted leading-relaxed">
                  {language === 'fr'
                    ? `${primaryClip.contextPeriodFr}. Ce titre figure parmi les morceaux majeurs associés à la reconnaissance publique de Maahlox Le Vibeur entre 2015 et 2017.`
                    : `${primaryClip.contextPeriodEn}. This track stands among the major songs associated with Maahlox Le Vibeur’s wider recognition between 2015 and 2017.`}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t theme-border space-y-3">
                <a
                  href={primaryClip.externalSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between px-4 py-3 border theme-border-strong text-xs font-semibold uppercase tracking-wider theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150"
                >
                  <span>
                    {language === 'fr'
                      ? 'Voir sur YouTube (externe)'
                      : 'Watch on YouTube (external)'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <p className="text-[11px] theme-muted">
                  {language === 'fr'
                    ? 'Chargement différé : aucun lecteur externe n’est exécuté sans action de votre part.'
                    : 'Deferred loading: no external player is loaded without your interaction.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sélection secondaire (4 titres) */}
        <div className="mb-12">
          <h3 className="text-xs font-semibold uppercase tracking-widest theme-muted mb-6">
            {language === 'fr'
              ? 'Sélection complémentaire du répertoire vidéo'
              : 'Additional selections from the video repertoire'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryClips.map((clip, index) => {
              const collab =
                language === 'fr' ? clip.collaborationFr : clip.collaborationEn;
              return (
                <article
                  key={clip.id}
                  className="group theme-bg border theme-border hover:border-[#FF5A1F] transition-all duration-250 md:hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#171717]">
                      <img
                        src={clip.posterImagePath}
                        alt={
                          language === 'fr'
                            ? clip.posterImageAltFr
                            : clip.posterImageAltEn
                        }
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        width={800}
                        height={500}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-transparent to-transparent"
                      />
                      <span className="absolute top-3 left-3 text-[11px] font-medium bg-[#080808]/85 text-[#F5F1E8] px-2 py-0.5 tabular-nums">
                        CLIP 0{index + 2}
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="font-display text-2xl theme-text tracking-wide mb-1">
                        {clip.title}
                      </h4>
                      {collab && (
                        <p className="text-xs font-semibold theme-accent-text mb-2">
                          {collab}
                        </p>
                      )}
                      <p className="text-xs theme-muted leading-relaxed">
                        {language === 'fr'
                          ? clip.featuredNoteFr
                          : clip.featuredNoteEn}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t theme-border flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => openClipModal(clip, e.currentTarget)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider theme-text hover:text-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
                    >
                      <Play
                        className="w-3.5 h-3.5 theme-accent-text fill-current"
                        aria-hidden="true"
                      />
                      <span>
                        {language === 'fr' ? 'Accéder au clip' : 'Open clip'}
                      </span>
                    </button>

                    <a
                      href={clip.externalSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`YouTube — ${clip.title}`}
                      className="inline-flex items-center gap-1 text-xs font-medium theme-muted hover:theme-text transition-colors duration-150 whitespace-nowrap shrink-0"
                    >
                      <span>YouTube</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Section 3 : Carte YouTube associée aux clips */}
        {youtubeChannel && youtubeChannel.url && (
          <div className="p-6 md:p-8 theme-bg border theme-border flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 theme-surface border theme-border-strong flex items-center justify-center shrink-0">
                <SocialBrandLogo
                  platform="youtube"
                  className="w-6 h-6 theme-accent-text"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
                  {language === 'fr'
                    ? 'Chaîne YouTube associée aux clips'
                    : 'YouTube channel associated with music videos'}
                </p>
                <h3 className="font-display text-2xl md:text-3xl theme-text tracking-wide">
                  {youtubeChannel.label[language]}
                </h3>
                <p className="text-xs md:text-sm theme-muted max-w-2xl">
                  {youtubeChannel.editorialDescription[language]}
                </p>
              </div>
            </div>

            <a
              href={youtubeChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${youtubeChannel.label[language]} (${
                language === 'fr' ? 'ouverture externe' : 'opens in new tab'
              })`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 theme-accent-bg font-poppins font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 whitespace-nowrap shrink-0 self-start md:self-center"
            >
              <span>
                {language === 'fr'
                  ? 'Accéder à la chaîne YouTube'
                  : 'Visit YouTube Channel'}
              </span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>

      {/* Modal accessible d'ouverture vidéo */}
      {activeClip && (
        <div
          style={{ backgroundColor: 'var(--modal-backdrop)' }}
          className="fixed inset-0 z-[80] backdrop-blur-xs flex items-center justify-center p-4 md:p-6 font-poppins"
          onClick={closeClipModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl theme-surface border theme-border-strong p-6 md:p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b theme-border">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
                  {language === 'fr'
                    ? activeClip.contextPeriodFr
                    : activeClip.contextPeriodEn}
                </p>
                <h3
                  id="video-modal-title"
                  className="font-display text-3xl md:text-5xl theme-text mt-1"
                >
                  {activeClip.title}
                </h3>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeClipModal}
                aria-label={
                  language === 'fr'
                    ? 'Fermer la fenêtre vidéo'
                    : 'Close video modal'
                }
                className="inline-flex items-center justify-center w-10 h-10 border theme-border-strong theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {activeClip.youtubeVideoId ? (
              <div className="aspect-video w-full bg-[#080808] border theme-border overflow-hidden">
                <iframe
                  title={`Clip : ${activeClip.title}`}
                  src={`https://www.youtube-nocookie.com/embed/${activeClip.youtubeVideoId}?autoplay=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <div className="p-6 md:p-8 theme-bg border theme-border space-y-5">
                <div className="flex items-start gap-3">
                  <Film
                    className="w-5 h-5 theme-accent-text shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-2">
                    <h4 className="text-base font-semibold theme-text">
                      {language === 'fr'
                        ? 'Intégration directe en attente de l’identifiant vidéo exact'
                        : 'Direct embed awaiting exact video ID'}
                    </h4>
                    <p className="text-sm theme-muted leading-relaxed">
                      {language === 'fr'
                        ? `Conformément aux règles de fiabilité du projet, aucun identifiant YouTube n’est inventé et aucun faux lecteur n’est simulé. Vous pouvez ouvrir directement la recherche officielle du clip « ${activeClip.title} » ou la chaîne YouTube associée via les liens ci-dessous.`
                        : `In accordance with project reliability guidelines, no YouTube IDs are invented and no fake video player is simulated. You can open the official search for “${activeClip.title}” or the associated YouTube channel below.`}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={activeClip.externalSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 theme-accent-bg font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 whitespace-nowrap shrink-0"
                  >
                    <span>
                      {language === 'fr'
                        ? 'Ouvrir sur YouTube'
                        : 'Open on YouTube'}
                    </span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>

                  {youtubeChannel?.url && (
                    <a
                      href={youtubeChannel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 border theme-border-strong text-xs font-medium uppercase tracking-wider theme-text hover:border-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
                    >
                      <span>
                        {language === 'fr'
                          ? 'Chaîne MAAHLOX officiel'
                          : 'MAAHLOX officiel Channel'}
                      </span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={closeClipModal}
                    className="px-5 py-3 text-xs font-medium uppercase tracking-wider theme-muted hover:theme-text border theme-border-strong transition-colors duration-150"
                  >
                    {language === 'fr' ? 'Fermer (Échap)' : 'Close (Esc)'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
