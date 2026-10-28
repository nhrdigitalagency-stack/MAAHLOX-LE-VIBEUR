import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Menu,
  Moon,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { getActivePublicSocials } from '../data/socials';
import { useAppSettings } from '../context/AppSettingsContext';
import { useCart } from '../context/CartContext';
import { LanguageToggle } from './LanguageToggle';
import { SocialBrandLogo } from './SocialBrandLogo';

export const Header: React.FC = () => {
  const {
    language,
    theme,
    toggleTheme,
    featureFlags,
    environmentMode,
    toggleEnvironmentMode,
  } = useAppSettings();
  const { totalQuantity, openCart } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('univers');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement | null>(null);
  const mobileDialogRef = useRef<HTMLDivElement | null>(null);

  // Filtrer les éléments de navigation selon les feature flags actifs
  const enabledNavItems = useMemo(() => {
    return siteConfig.navigation.filter((item) => {
      if (!item.featureFlag) return true;
      return Boolean(featureFlags[item.featureFlag]);
    });
  }, [featureFlags]);

  const primaryNavLinks = useMemo(
    () => enabledNavItems.filter((item) => item.id !== 'booking'),
    [enabledNavItems]
  );

  const bookingNav = useMemo(
    () => enabledNavItems.find((item) => item.id === 'booking'),
    [enabledNavItems]
  );

  const activeSocials = useMemo(() => getActivePublicSocials(), []);

  // Détection du défilement pour compacter subtilement la capsule sans saut de mise en page
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Suivi de la section active pour l'indicateur capsule interne (250–350 ms)
  useEffect(() => {
    const sectionIds = enabledNavItems.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-22% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabledNavItems]);

  // Accessibilité du menu mobile : verrouillage du scroll, focus trap, touche Échap
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      firstMenuLinkRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && mobileDialogRef.current) {
        const focusableElements =
          mobileDialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          );
        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenuAndRestoreFocus = () => {
    setIsMobileMenuOpen(false);
    window.setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 20);
  };

  return (
    <>
      {/* Lien d'évitement clavier */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#FF5A1F] focus:text-[#080808] focus:px-4 focus:py-2.5 focus:rounded-full focus:font-poppins focus:font-semibold focus:text-sm"
      >
        {language === 'fr'
          ? 'Aller au contenu principal'
          : 'Skip to main content'}
      </a>

      {/* Section 4 : HEADER BUBBLE PREMIUM (Capsule flottante centrée adaptative Dark/Light) */}
      <header className="fixed top-4 md:top-5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none flex justify-center">
        <div
          style={{ backgroundColor: 'var(--header-scrim)' }}
          className={`pointer-events-auto w-full max-w-[1220px] rounded-full theme-text border theme-border-strong shadow-[0_12px_36px_rgba(0,0,0,0.42)] backdrop-blur-md flex items-center justify-between gap-2 lg:gap-4 transition-all duration-300 ease-out ${
            isScrolled
              ? 'px-3.5 py-1.5 md:px-5 md:py-2 scale-[0.985]'
              : 'px-4 py-2 md:px-6 md:py-2.5 scale-100'
          }`}
        >
          {/* Zone 1 : Wordmark MAAHLOX à gauche */}
          <a
            href="#top"
            aria-label={
              language === 'fr'
                ? 'MAAHLOX — Retour en haut de page'
                : 'MAAHLOX — Back to top'
            }
            className="font-display text-xl sm:text-2xl tracking-wider theme-text hover:text-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0 pl-1"
          >
            MAAHLOX
          </a>

          {/* Zone 2 : Navigation desktop avec capsule interne active (passage en mode compact sous xl) */}
          <nav
            aria-label={
              language === 'fr' ? 'Navigation principale' : 'Primary navigation'
            }
            className="hidden xl:flex items-center gap-0.5 theme-surface border theme-border rounded-full p-1 font-poppins text-xs font-medium"
          >
            {primaryNavLinks.map((item) => {
              const isActive = activeSectionId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSectionId(item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'theme-accent-bg font-semibold shadow-xs'
                      : 'theme-text opacity-80 hover:opacity-100 hover:bg-[#FF5A1F]/10'
                  }`}
                >
                  {item.label[language]}
                </a>
              );
            })}
          </nav>

          {/* Zone 3 : Bascule FR/EN + Bascule Thème Clair/Sombre + Booking + Panier + Menu compact */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Sélecteur de langue FR / EN intégré dans le Header Bubble */}
            <LanguageToggle variant="bubble" />

            {/* Bouton de bascule de thème Sombre / Clair intégré dans le Header Bubble */}
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
              title={
                theme === 'dark'
                  ? language === 'fr'
                    ? 'Passer au thème clair'
                    : 'Switch to light mode'
                  : language === 'fr'
                  ? 'Passer au thème sombre'
                  : 'Switch to dark mode'
              }
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full theme-surface border theme-border-strong theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 font-poppins text-xs font-semibold min-h-[36px] shrink-0"
            >
              {theme === 'dark' ? (
                <>
                  <Sun
                    className="w-3.5 h-3.5 theme-accent-text shrink-0"
                    aria-hidden="true"
                  />
                  <span className="hidden md:inline text-[11px]">
                    {language === 'fr' ? 'Clair' : 'Light'}
                  </span>
                </>
              ) : (
                <>
                  <Moon
                    className="w-3.5 h-3.5 theme-accent-text shrink-0"
                    aria-hidden="true"
                  />
                  <span className="hidden md:inline text-[11px]">
                    {language === 'fr' ? 'Sombre' : 'Dark'}
                  </span>
                </>
              )}
            </button>

            {bookingNav && (
              <a
                href={bookingNav.href}
                onClick={() => setActiveSectionId(bookingNav.id)}
                className="hidden md:inline-flex items-center justify-center px-3.5 py-2 rounded-full font-poppins text-xs font-semibold uppercase tracking-wider theme-accent-bg hover:opacity-90 transition-opacity duration-150 whitespace-nowrap shrink-0 min-h-[36px]"
              >
                {bookingNav.label[language]}
              </a>
            )}

            {featureFlags.enableShop && (
              <button
                type="button"
                onClick={openCart}
                aria-label={
                  language === 'fr'
                    ? `Ouvrir le panier (${totalQuantity} article${
                        totalQuantity > 1 ? 's' : ''
                      })`
                    : `Open cart (${totalQuantity} item${
                        totalQuantity !== 1 ? 's' : ''
                      })`
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full theme-surface border theme-border-strong theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 font-poppins text-xs font-semibold whitespace-nowrap shrink-0 min-h-[36px]"
              >
                <ShoppingBag
                  className="w-3.5 h-3.5 theme-accent-text"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline text-[11px]">
                  {language === 'fr' ? 'Panier' : 'Bag'}
                </span>
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full theme-accent-bg text-[11px] font-bold tabular-nums">
                  {totalQuantity}
                </span>
              </button>
            )}

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-fullscreen-menu"
              aria-label={
                language === 'fr'
                  ? 'Ouvrir le menu de navigation'
                  : 'Open navigation menu'
              }
              className="xl:hidden inline-flex items-center justify-center w-9 h-9 rounded-full theme-text border theme-border-strong theme-surface hover:border-[#FF5A1F] transition-colors duration-150 shrink-0"
            >
              <Menu className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu overlay accessible sur mobile / tablette (< xl) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-fullscreen-menu"
          ref={mobileDialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={language === 'fr' ? 'Menu principal' : 'Main menu'}
          className="fixed inset-0 z-[70] theme-bg flex flex-col justify-between p-6 overflow-y-auto xl:hidden animate-fadeIn"
        >
          {/* En-tête du menu overlay */}
          <div className="flex items-center justify-between border-b theme-border pb-4">
            <span className="font-display text-2xl tracking-wider theme-text">
              MAAHLOX
            </span>
            <div className="flex items-center gap-2">
              {featureFlags.enableShop && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full theme-surface border theme-border-strong font-poppins text-xs font-semibold theme-text"
                >
                  <ShoppingBag
                    className="w-4 h-4 theme-accent-text"
                    aria-hidden="true"
                  />
                  <span>
                    {language === 'fr' ? 'Panier' : 'Bag'} ({totalQuantity})
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={closeMobileMenuAndRestoreFocus}
                aria-label={
                  language === 'fr'
                    ? 'Fermer le menu de navigation'
                    : 'Close navigation menu'
                }
                className="inline-flex items-center justify-center w-11 h-11 rounded-full theme-text border theme-border-strong hover:border-[#FF5A1F] transition-colors duration-150"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Liens principaux avec entrée décalée légère */}
          <nav
            aria-label={
              language === 'fr' ? 'Navigation mobile' : 'Mobile navigation'
            }
            className="my-auto py-6"
          >
            <ul className="space-y-3">
              {enabledNavItems.map((item, index) => (
                <li
                  key={item.id}
                  style={{ animationDelay: `${index * 45}ms` }}
                  className="border-b theme-border pb-2.5"
                >
                  <a
                    ref={index === 0 ? firstMenuLinkRef : undefined}
                    href={item.href}
                    onClick={() => {
                      setActiveSectionId(item.id);
                      closeMobileMenuAndRestoreFocus();
                    }}
                    className="flex items-baseline justify-between font-display text-3xl sm:text-4xl tracking-wide theme-text hover:text-[#FF5A1F] transition-colors duration-150"
                  >
                    <span>{item.label[language]}</span>
                    <span className="font-poppins text-xs font-medium theme-muted tabular-nums">
                      0{index + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Section 3 : Liens réseaux sociaux documentés dans le menu mobile */}
            {activeSocials.length > 0 && (
              <div className="mt-6 pt-5 border-t theme-border">
                <p className="font-poppins text-xs font-semibold uppercase tracking-wider theme-muted mb-3">
                  {language === 'fr'
                    ? 'Réseaux & Chaînes documentés'
                    : 'Documented Channels & Socials'}
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {activeSocials.map((social) => (
                    <a
                      key={social.id}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label[language]} (${
                        language === 'fr' ? 'nouvel onglet' : 'opens in new tab'
                      })`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 theme-surface border theme-border-strong font-poppins text-xs font-medium theme-text hover:border-[#FF5A1F] transition-colors duration-150"
                    >
                      <SocialBrandLogo
                        platform={social.platform}
                        className="w-4 h-4 theme-accent-text"
                      />
                      <span>{social.platformName}</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 theme-accent-text"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Contrôles Langue, Thème et Mode Preview/Production */}
            <div className="mt-6 pt-5 border-t theme-border flex flex-wrap items-center gap-2.5">
              <LanguageToggle variant="toolbar" />

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3.5 py-2 border theme-border-strong theme-surface font-poppins text-xs font-semibold uppercase tracking-wider theme-text hover:border-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-[#FF5A1F]" aria-hidden="true" />
                    <span>
                      {language === 'fr' ? 'Mode Clair' : 'Light Mode'}
                    </span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#FF5A1F]" aria-hidden="true" />
                    <span>
                      {language === 'fr' ? 'Mode Sombre' : 'Dark Mode'}
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={toggleEnvironmentMode}
                className="inline-flex items-center gap-2 px-3.5 py-2 border theme-border-strong theme-surface font-poppins text-xs font-semibold uppercase tracking-wider theme-text hover:border-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>
                  {environmentMode === 'preview'
                    ? language === 'fr'
                      ? 'Mode : Preview (Maquettes)'
                      : 'Mode: Preview (Mockups)'
                    : language === 'fr'
                    ? 'Mode : Production'
                    : 'Mode: Production'}
                </span>
              </button>
            </div>
          </nav>

          {/* Pied de menu mobile */}
          <div className="border-t theme-border pt-4 flex flex-wrap items-center justify-between gap-2 font-poppins text-xs theme-muted">
            <span>
              {language === 'fr'
                ? 'Artiste camerounais · Yaoundé'
                : 'Cameroonian artist · Yaoundé'}
            </span>
            <span>
              {language === 'fr'
                ? siteConfig.projectStatus.disclaimerFr
                : siteConfig.projectStatus.disclaimerEn}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
