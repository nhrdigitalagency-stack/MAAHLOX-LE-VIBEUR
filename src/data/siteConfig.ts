export type SiteEnvironmentMode = 'preview' | 'production';

export interface NavItem {
  id: string;
  label: {
    fr: string;
    en: string;
  };
  href: string;
  featureFlag?: keyof FeatureFlags;
}

export interface FeatureFlags {
  enableTickets: boolean;
  enableShop: boolean;
  enableCheckout: boolean;
  enableSocialSection: boolean;
}

export interface SiteConfig {
  defaultEnvironmentMode: SiteEnvironmentMode;
  featureFlags: FeatureFlags;
  projectStatus: {
    isOfficialApproved: boolean;
    disclaimerFr: string;
    disclaimerEn: string;
    robotsPolicy: 'noindex, nofollow' | 'index, follow';
  };
  creativeConcept: {
    titleFr: string;
    titleEn: string;
    transitionLineFr: string;
    transitionLineEn: string;
    attributionNoteFr: string;
    attributionNoteEn: string;
  };
  navigation: NavItem[];
  ticketingConfig: {
    activeMode: 'external' | 'integrated';
    hasConnectedTicketingBackend: boolean;
    qrVerificationEndpointReady: boolean;
  };
  shopConfig: {
    defaultCurrency: 'XAF';
    orderMode: 'assisted' | 'connected_checkout';
    hasVerifiedMerchantAccount: boolean;
    hasConnectedPaymentGateway: boolean;
    verifiedOrderContactEmail: string | null;
  };
  bookingConfig: {
    hasVerifiedDirectContact: boolean;
    hasConnectedBackendEndpoint: boolean;
    pressKitUrl: string | null;
    managementEmail: string | null;
  };
}

export const siteConfig: SiteConfig = {
  defaultEnvironmentMode: 'production',
  featureFlags: {
    enableTickets: true,
    enableShop: true,
    enableCheckout: false,
    enableSocialSection: true,
  },
  projectStatus: {
    isOfficialApproved: true,
    disclaimerFr: 'MAAHLOX LE VIBEUR · YAOUNDÉ, CAMEROUN',
    disclaimerEn: 'MAAHLOX LE VIBEUR · YAOUNDÉ, CAMEROON',
    robotsPolicy: 'index, follow',
  },
  creativeConcept: {
    titleFr: 'MAAHLOX — LA VIBRATION EN GRAND',
    titleEn: 'MAAHLOX — THE VIBRATION AT SCALE',
    transitionLineFr: 'Une voix. Une énergie. Une vibration.',
    transitionLineEn: 'One voice. One energy. One vibration.',
    attributionNoteFr: 'Univers musical & scénique — Yaoundé / Obili',
    attributionNoteEn: 'Musical & stage universe — Yaoundé / Obili',
  },
  navigation: [
    { id: 'univers', label: { fr: 'Univers', en: 'Universe' }, href: '#univers' },
    { id: 'biographie', label: { fr: 'Biographie', en: 'Biography' }, href: '#biographie' },
    { id: 'musique', label: { fr: 'Musique', en: 'Music' }, href: '#musique' },
    { id: 'videos', label: { fr: 'Clips', en: 'Videos' }, href: '#videos' },
    {
      id: 'concerts',
      label: { fr: 'Concerts', en: 'Shows' },
      href: '#concerts',
      featureFlag: 'enableTickets',
    },
    {
      id: 'boutique',
      label: { fr: 'Boutique', en: 'Merch' },
      href: '#boutique',
      featureFlag: 'enableShop',
    },
    { id: 'booking', label: { fr: 'Booking', en: 'Booking' }, href: '#booking' },
  ],
  ticketingConfig: {
    activeMode: 'external',
    hasConnectedTicketingBackend: false,
    qrVerificationEndpointReady: true,
  },
  shopConfig: {
    defaultCurrency: 'XAF',
    orderMode: 'assisted',
    hasVerifiedMerchantAccount: false,
    hasConnectedPaymentGateway: false,
    verifiedOrderContactEmail: null,
  },
  bookingConfig: {
    hasVerifiedDirectContact: false,
    hasConnectedBackendEndpoint: false,
    pressKitUrl: null,
    managementEmail: null,
  },
};
