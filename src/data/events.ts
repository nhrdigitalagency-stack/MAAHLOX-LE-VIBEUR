export type EventStatus =
  | 'announced'
  | 'on_sale'
  | 'sold_out'
  | 'postponed'
  | 'cancelled'
  | 'completed';

export type EventSaleMode = 'external' | 'integrated';

export type EventPublicationStatus = 'published' | 'draft' | 'preview_only';

export interface TicketCategory {
  id: string;
  nameFr: string;
  nameEn: string;
  price: number;
  currency: 'XAF' | 'EUR';
  availableStock: number | null; // null si géré sur billetterie externe
  descriptionFr?: string;
  descriptionEn?: string;
}

export interface LiveEventItem {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  dateISO: string; // YYYY-MM-DD
  time24h: string; // HH:mm
  timezone: string; // ex: 'Africa/Douala'
  city: string;
  countryFr: string;
  countryEn: string;
  venue: string;
  authorizedPosterPath: string | null;
  status: EventStatus;
  ticketCategories: TicketCategory[];
  currency: 'XAF' | 'EUR';
  feesNoteFr: string | null;
  feesNoteEn: string | null;
  externalTicketUrl: string | null;
  saleMode: EventSaleMode;
  accessRulesFr: string | null;
  accessRulesEn: string | null;
  cancellationPolicyFr: string | null;
  cancellationPolicyEn: string | null;
  publicationStatus: EventPublicationStatus;
}

/**
 * Section 6 : Concerts & Billets
 * - Ne jamais inventer de concerts ni de disponibilité limitée (« dernières places »).
 * - Ne pas créer de concerts de démonstration dans le site public.
 * - Si aucun événement n'est confirmé, la liste reste vide et l'interface affiche sobrement :
 *   « Les prochaines dates seront annoncées ici. »
 */
export const eventsData: LiveEventItem[] = [];

export function getPublishedEvents(): LiveEventItem[] {
  return eventsData.filter((evt) => evt.publicationStatus === 'published');
}

export const ticketingModesDocumentation = {
  modeA: {
    id: 'external',
    titleFr: 'Mode A — Billetterie externe validée (Prioritaire)',
    titleEn: 'Mode A — Validated External Ticketing (Priority)',
    summaryFr:
      'Présentation éditoriale de la date confirmée (lieu, horaires, conditions d’accès) et redirection sécurisée vers la plateforme de billetterie officielle choisie par l’organisateur.',
    summaryEn:
      'Editorial presentation of the confirmed date (venue, schedule, access rules) and secure redirection to the official ticketing platform chosen by the promoter.',
  },
  modeB: {
    id: 'integrated',
    titleFr: 'Mode B — Billetterie intégrée & Contrôle QR serveur (Prêt à connecter)',
    titleEn: 'Mode B — Integrated Ticketing & Server QR Control (Ready to connect)',
    summaryFr:
      'Architecture prête à connecter : réservation temporaire avec expiration, émission du billet uniquement après validation serveur du paiement, et QR code à jeton opaque (sans données personnelles encodées) vérifié par scan atomique côté serveur.',
    summaryEn:
      'Ready-to-connect architecture: temporary hold with expiration, ticket issuance strictly after server-side payment verification, and opaque-token QR code (zero personal data encoded) verified via atomic server-side scan.',
  },
};
