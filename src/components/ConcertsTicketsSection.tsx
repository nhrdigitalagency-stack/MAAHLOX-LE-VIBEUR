import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Calendar, ExternalLink } from 'lucide-react';
import { getPublishedEvents, LiveEventItem } from '../data/events';
import { formatPriceXAF } from '../data/shipping';
import { useAppSettings } from '../context/AppSettingsContext';

gsap.registerPlugin(ScrollTrigger);

export const ConcertsTicketsSection: React.FC = () => {
  const { language } = useAppSettings();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const publishedEvents = getPublishedEvents();

  const upcomingEvents = publishedEvents.filter(
    (evt) => evt.status !== 'completed'
  );
  const pastEvents = publishedEvents.filter(
    (evt) => evt.status === 'completed'
  );
  const primaryNextEvent: LiveEventItem | undefined = upcomingEvents[0];
  const secondaryUpcomingEvents = upcomingEvents.slice(1);

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

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 84%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatusLabel = (status: LiveEventItem['status']) => {
    const map: Record<
      LiveEventItem['status'],
      { fr: string; en: string; isBuyable: boolean }
    > = {
      announced: { fr: 'Annoncé', en: 'Announced', isBuyable: false },
      on_sale: { fr: 'Vente ouverte', en: 'Tickets on sale', isBuyable: true },
      sold_out: { fr: 'Complet', en: 'Sold out', isBuyable: false },
      postponed: { fr: 'Reporté', en: 'Postponed', isBuyable: false },
      cancelled: { fr: 'Annulé', en: 'Cancelled', isBuyable: false },
      completed: { fr: 'Terminé', en: 'Past event', isBuyable: false },
    };
    return map[status];
  };

  return (
    <section
      id="concerts"
      ref={sectionRef}
      aria-labelledby="concerts-heading"
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
                ? '06. Concerts & Billetterie'
                : '06. Live Shows & Ticketing'}
            </p>
            <h2
              id="concerts-heading"
              className="font-display text-4xl md:text-6xl theme-text tracking-tight"
            >
              {language === 'fr' ? 'CONCERTS & BILLETS' : 'SHOWS & TICKETS'}
            </h2>
          </div>
          <p className="text-xs theme-muted font-medium">
            {language === 'fr'
              ? 'Scènes live · Tournées & Festivals'
              : 'Live Stages · Tours & Festivals'}
          </p>
        </div>

        <div ref={contentRef}>
          {primaryNextEvent ? (
            <div className="space-y-12">
              <article className="group theme-surface border theme-border-strong hover:border-[#FF5A1F] p-6 md:p-10 shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-3 p-6 theme-bg border theme-border flex flex-col justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
                      {language === 'fr'
                        ? 'PROCHAINE DATE'
                        : 'NEXT CONFIRMED DATE'}
                    </span>
                    <div className="my-4">
                      <span className="font-display text-5xl md:text-6xl theme-text block tabular-nums">
                        {primaryNextEvent.dateISO}
                      </span>
                      <span className="text-xs theme-muted block mt-1 tabular-nums">
                        {primaryNextEvent.time24h} ({primaryNextEvent.timezone})
                      </span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider theme-text">
                      {getStatusLabel(primaryNextEvent.status)[language]}
                    </span>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest theme-muted">
                      {primaryNextEvent.city} ·{' '}
                      {language === 'fr'
                        ? primaryNextEvent.countryFr
                        : primaryNextEvent.countryEn}
                    </p>
                    <h3 className="font-display text-3xl md:text-5xl theme-text tracking-wide">
                      {language === 'fr'
                        ? primaryNextEvent.titleFr
                        : primaryNextEvent.titleEn}
                    </h3>
                    <p className="text-base font-medium theme-text">
                      {primaryNextEvent.venue}
                    </p>
                    {(language === 'fr'
                      ? primaryNextEvent.accessRulesFr
                      : primaryNextEvent.accessRulesEn) && (
                      <p className="text-xs theme-muted leading-relaxed">
                        {language === 'fr'
                          ? primaryNextEvent.accessRulesFr
                          : primaryNextEvent.accessRulesEn}
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center gap-3">
                    {getStatusLabel(primaryNextEvent.status).isBuyable &&
                    primaryNextEvent.externalTicketUrl ? (
                      <a
                        href={primaryNextEvent.externalTicketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-7 py-4 theme-accent-bg font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 whitespace-nowrap shrink-0"
                      >
                        <span>
                          {language === 'fr'
                            ? 'Acheter un billet'
                            : 'Buy ticket'}
                        </span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="px-5 py-3 theme-bg border theme-border text-xs font-semibold uppercase tracking-wider theme-muted">
                        {getStatusLabel(primaryNextEvent.status)[language]}
                      </span>
                    )}

                    {primaryNextEvent.ticketCategories.length > 0 && (
                      <p className="text-xs theme-muted tabular-nums">
                        {language === 'fr' ? 'À partir de ' : 'From '}
                        {formatPriceXAF(
                          Math.min(
                            ...primaryNextEvent.ticketCategories.map(
                              (c) => c.price
                            )
                          ),
                          language
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </article>

              {secondaryUpcomingEvents.length > 0 && (
                <div className="divide-y theme-border border-t border-b">
                  {secondaryUpcomingEvents.map((evt) => {
                    const statusInfo = getStatusLabel(evt.status);
                    return (
                      <article
                        key={evt.id}
                        className="py-5 flex flex-wrap items-center justify-between gap-4 hover:pl-3 transition-all duration-200"
                      >
                        <div className="flex flex-wrap items-baseline gap-6">
                          <span className="font-display text-2xl theme-accent-text tabular-nums w-32">
                            {evt.dateISO}
                          </span>
                          <div>
                            <h4 className="text-base font-semibold theme-text">
                              {language === 'fr' ? evt.titleFr : evt.titleEn}
                            </h4>
                            <p className="text-xs theme-muted">
                              {evt.venue} · {evt.city},{' '}
                              {language === 'fr'
                                ? evt.countryFr
                                : evt.countryEn}
                            </p>
                          </div>
                        </div>

                        <div>
                          {statusInfo.isBuyable && evt.externalTicketUrl ? (
                            <a
                              href={evt.externalTicketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 theme-accent-bg text-xs font-semibold uppercase tracking-wider"
                            >
                              <span>
                                {language === 'fr'
                                  ? 'Acheter un billet'
                                  : 'Buy ticket'}
                              </span>
                              <ExternalLink
                                className="w-3.5 h-3.5"
                                aria-hidden="true"
                              />
                            </a>
                          ) : (
                            <span className="text-xs font-medium uppercase tracking-wider theme-muted">
                              {statusInfo[language]}
                            </span>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {pastEvents.length > 0 && (
                <div className="pt-8 border-t theme-border opacity-70">
                  <h3 className="text-xs font-semibold uppercase tracking-widest theme-muted mb-4">
                    {language === 'fr' ? 'Dates passées' : 'Past Dates'}
                  </h3>
                  <div className="divide-y theme-border">
                    {pastEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="py-3 flex flex-wrap items-center justify-between gap-4 text-xs"
                      >
                        <span className="tabular-nums theme-muted">
                          {evt.dateISO}
                        </span>
                        <span className="font-medium theme-text">
                          {language === 'fr' ? evt.titleFr : evt.titleEn} —{' '}
                          {evt.venue} ({evt.city})
                        </span>
                        <span className="uppercase tracking-wider theme-muted">
                          {language === 'fr' ? 'Terminé' : 'Completed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="group p-8 md:p-12 theme-surface border theme-border hover:border-[#FF5A1F] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 theme-bg border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <Calendar
                      className="w-6 h-6 text-[#FF5A1F]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg md:text-2xl font-semibold theme-text">
                      {language === 'fr'
                        ? 'Les prochaines dates de tournée seront annoncées ici.'
                        : 'Upcoming tour dates will be announced here.'}
                    </p>
                    <p className="text-xs md:text-sm theme-muted">
                      {language === 'fr'
                        ? 'Pour toute demande de programmation en festival, salle ou événement spécial, contactez directement l’équipe Booking.'
                        : 'For festival programming, concert venues, or special events, reach out directly to the Booking team.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 px-6 py-3.5 theme-accent-bg text-xs font-semibold uppercase tracking-wider hover:opacity-95 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
                  >
                    <span>
                      {language === 'fr'
                        ? 'Réserver une date (Booking)'
                        : 'Book a show'}
                    </span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
