import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { GalleryCategory, galleryData, GalleryMediaItem } from '../data/gallery';
import { useAppSettings } from '../context/AppSettingsContext';

type FilterOption = 'all' | GalleryCategory;

export const GallerySection: React.FC = () => {
  const { language } = useAppSettings();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);

  const allFilterOptions: {
    id: FilterOption;
    labelFr: string;
    labelEn: string;
    count: number;
  }[] = [
    {
      id: 'all',
      labelFr: 'Tous les médias',
      labelEn: 'All media',
      count: galleryData.length,
    },
    {
      id: 'scene',
      labelFr: 'Scène',
      labelEn: 'Stage',
      count: galleryData.filter((item) => item.category === 'scene').length,
    },
    {
      id: 'portraits',
      labelFr: 'Portraits',
      labelEn: 'Portraits',
      count: galleryData.filter((item) => item.category === 'portraits').length,
    },
    {
      id: 'studio',
      labelFr: 'Sessions créatives',
      labelEn: 'Creative sessions',
      count: galleryData.filter((item) => item.category === 'studio').length,
    },
  ];
  const filterButtons = allFilterOptions.filter((f) => f.count > 0);

  const filteredItems: GalleryMediaItem[] =
    activeFilter === 'all'
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number, triggerEl: HTMLButtonElement) => {
    lastTriggerRef.current = triggerEl;
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 20);
  };

  const goPrev = () => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  const goNext = () => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'Tab' && lightboxRef.current) {
        const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled])'
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
  }, [lightboxIndex, filteredItems.length]);

  const currentLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="galerie"
      aria-labelledby="galerie-heading"
      className="relative py-20 md:py-32 theme-bg border-b theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* En-tête de section + filtres fonctionnels */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 mb-12 border-b theme-border">
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest theme-accent-text mb-2">
              {language === 'fr'
                ? '05. Galerie photographique'
                : '05. Photography Gallery'}
            </p>
            <h2
              id="galerie-heading"
              className="font-display text-4xl md:text-6xl theme-text tracking-tight"
            >
              {language === 'fr' ? 'ARCHIVES VISUELLES' : 'VISUAL ARCHIVES'}
            </h2>
          </div>

          {/* Barre de filtres interactifs */}
          <div
            role="group"
            aria-label={
              language === 'fr'
                ? 'Filtrer la galerie par catégorie'
                : 'Filter gallery by category'
            }
            className="flex flex-wrap items-center gap-1.5 theme-surface p-1.5 border theme-border"
          >
            {filterButtons.map((btn) => {
              const isSelected = activeFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    setActiveFilter(btn.id);
                    setLightboxIndex(null);
                  }}
                  aria-pressed={isSelected}
                  className={`px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'theme-accent-bg font-semibold'
                      : 'theme-muted hover:theme-text'
                  }`}
                >
                  <span>{language === 'fr' ? btn.labelFr : btn.labelEn}</span>
                  <span className="ml-1.5 opacity-80">({btn.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grille éditoriale asymétrique */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {filteredItems.map((item, idx) => (
            <figure
              key={item.id}
              className={`${item.gridSpanClass} group theme-surface border theme-border overflow-hidden`}
            >
              <button
                type="button"
                onClick={(e) => openLightbox(idx, e.currentTarget)}
                aria-label={
                  language === 'fr'
                    ? `Agrandir la photographie : ${item.titleFr}`
                    : `Enlarge photograph: ${item.titleEn}`
                }
                className="relative block w-full text-left overflow-hidden focus-visible:outline-none"
              >
                <div
                  className={`relative w-full ${item.aspectRatioClass} bg-[#080808] overflow-hidden`}
                >
                  <img
                    src={item.src}
                    alt={language === 'fr' ? item.altFr : item.altEn}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#080808]/85 border border-[#F5F1E8]/20 text-[11px] font-medium text-[#F5F1E8] group-hover:border-[#FF5A1F] group-hover:text-[#FF5A1F] transition-colors duration-150">
                    <Maximize2 className="w-3 h-3" aria-hidden="true" />
                    <span>{language === 'fr' ? 'AGRANDIR' : 'ENLARGE'}</span>
                  </span>
                </div>
              </button>

              <figcaption className="p-4 border-t theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-semibold theme-text">
                    {language === 'fr' ? item.titleFr : item.titleEn}
                  </span>
                  <span className="mx-2 theme-accent-text" aria-hidden="true">
                    ·
                  </span>
                  <span className="theme-muted">
                    {language === 'fr'
                      ? item.categoryLabelFr
                      : item.categoryLabelEn}
                  </span>
                </div>
                <span className="text-[11px] font-medium theme-muted">
                  0{idx + 1} / 0{filteredItems.length}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox accessible plein écran */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={
            language === 'fr'
              ? `Visionneuse photo : ${currentLightboxItem.titleFr}`
              : `Photo viewer: ${currentLightboxItem.titleEn}`
          }
          className="fixed inset-0 z-[90] bg-[#080808]/95 text-[#F5F1E8] backdrop-blur-sm flex flex-col justify-between p-4 md:p-8 font-poppins"
          onClick={closeLightbox}
        >
          {/* Barre supérieure */}
          <div
            className="flex items-center justify-between border-b border-[#F5F1E8]/15 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-medium text-[#A8A29A]">
              <span className="text-[#FF5A1F] font-semibold">
                {language === 'fr'
                  ? `PHOTO ${lightboxIndex + 1} SUR ${filteredItems.length}`
                  : `PHOTO ${lightboxIndex + 1} OF ${filteredItems.length}`}
              </span>
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <span>
                {language === 'fr'
                  ? currentLightboxItem.categoryLabelFr
                  : currentLightboxItem.categoryLabelEn}
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label={
                language === 'fr'
                  ? 'Fermer la visionneuse photo (Échap)'
                  : 'Close photo viewer (Esc)'
              }
              className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#F5F1E8]/25 text-xs font-medium uppercase text-[#F5F1E8] hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150"
            >
              <span>{language === 'fr' ? 'Fermer' : 'Close'}</span>
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Zone centrale d'image */}
          <div
            className="relative my-auto py-4 flex items-center justify-center max-h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems.length > 1 && (
              <button
                type="button"
                onClick={goPrev}
                aria-label={
                  language === 'fr'
                    ? 'Photographie précédente'
                    : 'Previous photograph'
                }
                className="absolute left-0 md:left-4 z-10 inline-flex items-center justify-center w-11 h-11 bg-[#171717]/90 border border-[#F5F1E8]/25 text-[#F5F1E8] hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
            )}

            <img
              src={currentLightboxItem.src}
              alt={
                language === 'fr'
                  ? currentLightboxItem.altFr
                  : currentLightboxItem.altEn
              }
              width={currentLightboxItem.width}
              height={currentLightboxItem.height}
              referrerPolicy="no-referrer"
              className="max-h-[66vh] w-auto max-w-full object-contain border border-[#F5F1E8]/15"
            />

            {filteredItems.length > 1 && (
              <button
                type="button"
                onClick={goNext}
                aria-label={
                  language === 'fr'
                    ? 'Photographie suivante'
                    : 'Next photograph'
                }
                className="absolute right-0 md:right-4 z-10 inline-flex items-center justify-center w-11 h-11 bg-[#171717]/90 border border-[#F5F1E8]/25 text-[#F5F1E8] hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Légende et crédits en bas de Lightbox */}
          <div
            className="border-t border-[#F5F1E8]/15 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <p className="font-semibold text-sm text-[#F5F1E8]">
                {language === 'fr'
                  ? currentLightboxItem.titleFr
                  : currentLightboxItem.titleEn}
              </p>
              <p className="text-[#A8A29A]">
                {language === 'fr'
                  ? currentLightboxItem.captionFr
                  : currentLightboxItem.captionEn}
              </p>
            </div>
            <div className="text-[11px] text-[#A8A29A] md:text-right">
              <p>
                {language === 'fr'
                  ? currentLightboxItem.creditFr
                  : currentLightboxItem.creditEn}
              </p>
              <p className="text-[#F5F1E8]/60">
                {language === 'fr'
                  ? 'Navigation clavier : ← / → pour parcourir, Échap pour fermer'
                  : 'Keyboard navigation: ← / → to browse, Esc to close'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
