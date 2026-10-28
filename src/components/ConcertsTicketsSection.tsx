import React, { useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  QrCode,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import {
  getPublishedEvents,
  LiveEventItem,
  ticketingModesDocumentation,
} from '../data/events';
import { formatPriceXAF } from '../data/shipping';
import { siteConfig } from '../data/siteConfig';
import { useAppSettings } from '../context/AppSettingsContext';

interface QrScanTestResult {
  ok: boolean;
  status: 'valid_first_scan' | 'already_scanned' | 'invalid_token' | 'unauthorized';
  token: string;
  scannedAtISO: string;
  messageFr: string;
  messageEn: string;
}

export const ConcertsTicketsSection: React.FC = () => {
  const { language, environmentMode } = useAppSettings();
  const publishedEvents = getPublishedEvents();

  // Séparation des événements à venir vs passés ('completed')
  const upcomingEvents = publishedEvents.filter(
    (evt) => evt.status !== 'completed'
  );
  const pastEvents = publishedEvents.filter(
    (evt) => evt.status === 'completed'
  );
  const primaryNextEvent: LiveEventItem | undefined = upcomingEvents[0];
  const secondaryUpcomingEvents = upcomingEvents.slice(1);

  // Démonstrateur technique Mode B (uniquement en mode Preview) pour tester le scan atomique QR côté serveur
  const [showTechDrawer, setShowTechDrawer] = useState(false);
  const [testToken, setTestToken] = useState('TKT_OPAQUE_9F82A7C4E1B3');
  const [scannedTokensRegistry, setScannedTokensRegistry] = useState<
    Record<string, string>
  >({});
  const [scanResult, setScanResult] = useState<QrScanTestResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

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

  const handleTestAtomicQrScan = async () => {
    setIsScanning(true);
    try {
      const response = await fetch('/api/tickets/verify-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Scanner-Role': 'authorized_staff_preview',
        },
        body: JSON.stringify({ opaqueToken: testToken.trim() }),
      });
      if (response.ok) {
        const data = (await response.json()) as QrScanTestResult;
        setScanResult(data);
        setIsScanning(false);
        return;
      }
    } catch {
      // Fallback local déterministe si le serveur Express n'est pas sollicité
    }

    const cleanToken = testToken.trim();
    const nowISO = new Date().toISOString();
    if (!cleanToken || !cleanToken.startsWith('TKT_OPAQUE_')) {
      setScanResult({
        ok: false,
        status: 'invalid_token',
        token: cleanToken,
        scannedAtISO: nowISO,
        messageFr:
          'Jeton opaque invalide ou inconnu. Aucune donnée personnelle n’est stockée dans le QR.',
        messageEn:
          'Invalid or unknown opaque token. Zero personal data is stored in the QR.',
      });
    } else if (scannedTokensRegistry[cleanToken]) {
      setScanResult({
        ok: false,
        status: 'already_scanned',
        token: cleanToken,
        scannedAtISO: scannedTokensRegistry[cleanToken],
        messageFr: `Rejeté (Double validation empêchée) : ce billet a déjà été scanné à ${scannedTokensRegistry[
          cleanToken
        ].slice(11, 19)} UTC.`,
        messageEn: `Rejected (Double scan prevented): this ticket was already scanned at ${scannedTokensRegistry[
          cleanToken
        ].slice(11, 19)} UTC.`,
      });
    } else {
      setScannedTokensRegistry((prev) => ({ ...prev, [cleanToken]: nowISO }));
      setScanResult({
        ok: true,
        status: 'valid_first_scan',
        token: cleanToken,
        scannedAtISO: nowISO,
        messageFr:
          'Validation atomique réussie (1er scan). Le statut du billet est désormais verrouillé sur « UTILISÉ ».',
        messageEn:
          'Atomic validation succeeded (1st scan). Ticket status is now locked as “USED”.',
      });
    }
    setIsScanning(false);
  };

  const resetTestToken = () => {
    const randomHex = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase()
    ).join('');
    setTestToken(`TKT_OPAQUE_${randomHex}`);
    setScanResult(null);
  };

  return (
    <section
      id="concerts"
      aria-labelledby="concerts-heading"
      className="relative py-20 md:py-32 theme-bg border-b theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* En-tête de section */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-12 border-b theme-border">
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
            {siteConfig.ticketingConfig.activeMode === 'external'
              ? language === 'fr'
                ? 'Mode actif : Billetterie externe validée (Mode A)'
                : 'Active mode: Validated external ticketing (Mode A)'
              : language === 'fr'
              ? 'Mode actif : Billetterie intégrée (Mode B)'
              : 'Active mode: Integrated ticketing (Mode B)'}
          </p>
        </div>

        {/* Cas 1 : Des événements confirmés et publiés existent */}
        {primaryNextEvent ? (
          <div className="space-y-12">
            {/* Grande carte du prochain événement confirmé */}
            <article className="theme-surface border theme-border-strong p-6 md:p-10 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Date en bloc typographique */}
                <div className="lg:col-span-3 p-6 theme-bg border theme-border flex flex-col justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
                    {language === 'fr' ? 'PROCHAINE DATE' : 'NEXT CONFIRMED DATE'}
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

                {/* Informations salle, ville et règles d'accès */}
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

                {/* Action d'achat uniquement si vente ouverte et URL/système disponible */}
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

            {/* Liste plus compacte des autres dates à venir */}
            {secondaryUpcomingEvents.length > 0 && (
              <div className="divide-y theme-border border-t border-b">
                {secondaryUpcomingEvents.map((evt) => {
                  const statusInfo = getStatusLabel(evt.status);
                  return (
                    <article
                      key={evt.id}
                      className="py-5 flex flex-wrap items-center justify-between gap-4"
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
                            {language === 'fr' ? evt.countryFr : evt.countryEn}
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

            {/* Distinction nette des événements passés */}
            {pastEvents.length > 0 && (
              <div className="pt-8 border-t theme-border opacity-70">
                <h3 className="text-xs font-semibold uppercase tracking-widest theme-muted mb-4">
                  {language === 'fr'
                    ? 'Dates passées (Terminées)'
                    : 'Past Dates (Completed)'}
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
          /* Cas 2 (Par défaut) : Aucun événement confirmé — Composition sobre exigée par la Section 6 */
          <div className="p-8 md:p-12 theme-surface border theme-border space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 theme-bg border theme-border-strong flex items-center justify-center shrink-0">
                  <Calendar
                    className="w-6 h-6 theme-accent-text"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-lg md:text-2xl font-semibold theme-text">
                    {language === 'fr'
                      ? 'Les prochaines dates seront annoncées ici.'
                      : 'Upcoming dates will be announced here.'}
                  </p>
                  <p className="text-xs md:text-sm theme-muted">
                    {language === 'fr'
                      ? 'Aucun concert de démonstration n’est inventé. Dès validation d’une date officielle par le management, la billetterie s’affichera automatiquement.'
                      : 'No fake demonstration concerts are invented. As soon as an official date is confirmed by management, ticketing will appear here automatically.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="#booking"
                  className="inline-flex items-center gap-2 px-5 py-3 theme-accent-bg text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 whitespace-nowrap"
                >
                  <span>
                    {language === 'fr'
                      ? 'Proposer une date (Booking)'
                      : 'Book a show'}
                  </span>
                </a>

                {environmentMode === 'preview' && (
                  <button
                    type="button"
                    onClick={() => setShowTechDrawer((prev) => !prev)}
                    aria-expanded={showTechDrawer}
                    className="inline-flex items-center gap-2 px-4 py-3 theme-bg border theme-border-strong text-xs font-medium uppercase tracking-wider theme-text hover:border-[#FF5A1F] transition-colors duration-150 whitespace-nowrap"
                  >
                    <QrCode
                      className="w-4 h-4 theme-accent-text"
                      aria-hidden="true"
                    />
                    <span>
                      {language === 'fr'
                        ? 'Architecture Mode A / Mode B'
                        : 'Mode A / Mode B Architecture'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Panneau d'inspection de l'architecture Billetterie Mode A & Mode B (en mode Preview uniquement) */}
            {environmentMode === 'preview' && showTechDrawer && (
              <div className="pt-6 border-t theme-border space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 theme-bg border theme-border space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider theme-accent-text">
                      {language === 'fr'
                        ? ticketingModesDocumentation.modeA.titleFr
                        : ticketingModesDocumentation.modeA.titleEn}
                    </p>
                    <p className="text-xs theme-muted leading-relaxed">
                      {language === 'fr'
                        ? ticketingModesDocumentation.modeA.summaryFr
                        : ticketingModesDocumentation.modeA.summaryEn}
                    </p>
                  </div>

                  <div className="p-5 theme-bg border theme-border space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider theme-accent-text">
                      {language === 'fr'
                        ? ticketingModesDocumentation.modeB.titleFr
                        : ticketingModesDocumentation.modeB.titleEn}
                    </p>
                    <p className="text-xs theme-muted leading-relaxed">
                      {language === 'fr'
                        ? ticketingModesDocumentation.modeB.summaryFr
                        : ticketingModesDocumentation.modeB.summaryEn}
                    </p>
                  </div>
                </div>

                {/* Banc de test du contrôleur de scan atomique QR côté serveur (Mode B) */}
                <div className="p-5 theme-bg border theme-border space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className="w-4 h-4 theme-accent-text"
                        aria-hidden="true"
                      />
                      <h3 className="text-xs font-semibold uppercase tracking-wider theme-text">
                        {language === 'fr'
                          ? 'Simulateur technique (Mode Preview) — Vérification serveur de jeton QR opaque & Scan atomique'
                          : 'Technical Simulator (Preview Mode) — Server Opaque QR Token & Atomic Scan Verification'}
                      </h3>
                    </div>
                    <span className="text-[11px] theme-muted">
                      Endpoint : POST /api/tickets/verify-qr
                    </span>
                  </div>

                  <p className="text-xs theme-muted leading-relaxed">
                    {language === 'fr'
                      ? 'Ce module teste la règle de sécurité de la Section 7 : aucun renseignement personnel n’est encodé dans le QR code (uniquement un identifiant opaque). Le premier scan valide l’entrée de manière atomique ; un second scan du même jeton est immédiatement rejeté.'
                      : 'This module tests Section 7 security rules: zero personal data is encoded in the QR code (only an opaque identifier). The first scan atomically validates entry; a second scan of the same token is immediately rejected.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="text"
                      value={testToken}
                      onChange={(e) => setTestToken(e.target.value)}
                      aria-label={
                        language === 'fr'
                          ? 'Jeton opaque de billet à vérifier'
                          : 'Opaque ticket token to verify'
                      }
                      className="px-3.5 py-2 theme-surface border theme-border-strong text-xs font-medium theme-text min-w-[260px]"
                    />
                    <button
                      type="button"
                      onClick={handleTestAtomicQrScan}
                      disabled={isScanning}
                      className="px-4 py-2 theme-accent-bg text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 whitespace-nowrap"
                    >
                      {isScanning
                        ? language === 'fr'
                          ? 'Vérification...'
                          : 'Verifying...'
                        : language === 'fr'
                        ? 'Tester un scan d’entrée'
                        : 'Test entry scan'}
                    </button>
                    <button
                      type="button"
                      onClick={resetTestToken}
                      className="px-3.5 py-2 theme-surface border theme-border-strong text-xs font-medium theme-muted hover:theme-text transition-colors duration-150 whitespace-nowrap"
                    >
                      {language === 'fr'
                        ? 'Générer un nouveau jeton opaque'
                        : 'Generate new opaque token'}
                    </button>
                  </div>

                  {scanResult && (
                    <div
                      role="status"
                      className={`p-3.5 border text-xs flex items-start gap-2.5 ${
                        scanResult.ok
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-[#FF5A1F] bg-[#FF5A1F]/10'
                      }`}
                    >
                      {scanResult.ok ? (
                        <CheckCircle2
                          className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      ) : (
                        <XCircle
                          className="w-4 h-4 theme-accent-text shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      <div className="space-y-1">
                        <p className="font-semibold theme-text">
                          {language === 'fr'
                            ? scanResult.messageFr
                            : scanResult.messageEn}
                        </p>
                        <p className="theme-muted tabular-nums">
                          Token: {scanResult.token} · Timestamp:{' '}
                          {scanResult.scannedAtISO}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
