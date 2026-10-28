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

export interface PendingResourceItem {
  id: string;
  category: 'media' | 'audio' | 'video' | 'contact' | 'legal' | 'links' | 'commerce' | 'ticketing';
  label: string;
  status: 'pending_artist_validation' | 'not_configured' | 'ready_to_connect';
  configLocation: string;
  notes: string;
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
  verifiedOnlinePresence: {
    id: string;
    platform: string;
    accountLabelFr: string;
    accountLabelEn: string;
    contextNoteFr: string;
    contextNoteEn: string;
    url: string | null;
  }[];
  pendingResourcesToProvide: PendingResourceItem[];
}

export const siteConfig: SiteConfig = {
  defaultEnvironmentMode: 'preview',
  featureFlags: {
    enableTickets: true,
    enableShop: true,
    enableCheckout: false, // Désactivé tant qu'aucun prestataire de paiement marchand n'est connecté
    enableSocialSection: true,
  },
  projectStatus: {
    isOfficialApproved: false,
    disclaimerFr: 'Concept de portfolio — non officiel',
    disclaimerEn: 'Portfolio concept — unofficial',
    robotsPolicy: 'noindex, nofollow',
  },
  creativeConcept: {
    titleFr: 'MAAHLOX — LA VIBRATION EN GRAND',
    titleEn: 'MAAHLOX — THE VIBRATION AT SCALE',
    transitionLineFr: 'Une voix. Une énergie. Une vibration.',
    transitionLineEn: 'One voice. One energy. One vibration.',
    attributionNoteFr:
      'Direction créative et propositions éditoriales du concept web — non attribuées comme citations de l’artiste.',
    attributionNoteEn:
      'Creative direction and editorial proposals of the web concept — not attributed as quotes from the artist.',
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
  verifiedOnlinePresence: [
    {
      id: 'facebook-official-page',
      platform: 'Facebook',
      accountLabelFr: 'Page Facebook « MaahloxOfficiel »',
      accountLabelEn: 'Facebook Page “MaahloxOfficiel”',
      contextNoteFr: 'Page documentée associée aux publications de l’artiste.',
      contextNoteEn: 'Documented page associated with the artist’s publications.',
      url: 'https://www.facebook.com/MaahloxOfficiel/',
    },
    {
      id: 'youtube-channel',
      platform: 'YouTube',
      accountLabelFr: 'Chaîne YouTube « MAAHLOX officiel »',
      accountLabelEn: 'YouTube Channel “MAAHLOX officiel”',
      contextNoteFr: 'Chaîne documentée regroupant les clips publiés.',
      contextNoteEn: 'Documented channel hosting published music videos.',
      url: 'https://www.youtube.com/channel/UCat6V_NP3w_cFCnmqJeJ7Qg',
    },
    {
      id: 'soundcloud-profile',
      platform: 'SoundCloud',
      accountLabelFr: 'Profil SoundCloud « maahlox »',
      accountLabelEn: 'SoundCloud Profile “maahlox”',
      contextNoteFr: 'Lien historique, activité actuelle à revalider.',
      contextNoteEn: 'Historical link, current activity to be revalidated.',
      url: 'https://soundcloud.com/maahlox',
    },
    {
      id: 'deezer-artist',
      platform: 'Deezer',
      accountLabelFr: 'Profil artiste « Maahlox Le Vibeur »',
      accountLabelEn: 'Artist profile “Maahlox Le Vibeur”',
      contextNoteFr: 'Référencé dans les bases musicales consultées.',
      contextNoteEn: 'Referenced in consulted music databases.',
      url: 'https://www.deezer.com/fr/search/Maahlox%20Le%20Vibeur',
    },
  ],
  pendingResourcesToProvide: [
    {
      id: 'instagram-validation',
      category: 'links',
      label: 'Confirmation du compte Instagram actif unique (@maahlox_officiel vs @maahloxofficiel)',
      status: 'pending_artist_validation',
      configLocation: 'src/data/socials.ts',
      notes: 'Désactivé en mode production tant que l’équipe n’a pas confirmé lequel des deux comptes est actif.',
    },
    {
      id: 'tiktok-url',
      category: 'links',
      label: 'URL officielle du compte TikTok',
      status: 'not_configured',
      configLocation: 'src/data/socials.ts',
      notes: 'Aucune icône ni carte TikTok n’est affichée tant que l’URL exacte n’est pas fournie.',
    },
    {
      id: 'official-merch-catalog',
      category: 'commerce',
      label: 'Catalogue merchandising validé (photos, prix fermes XAF, stocks par taille, composition textile, frais de livraison)',
      status: 'pending_artist_validation',
      configLocation: 'src/data/products.ts & src/data/shipping.ts',
      notes: 'En mode preview, des maquettes explicitement marquées « Concept — non disponible à la vente » permettent de tester le parcours panier.',
    },
    {
      id: 'payment-gateway-xaf',
      category: 'commerce',
      label: 'Clés API serveur et compte marchand approuvé (agrégateur XAF / Mobile Money / Carte)',
      status: 'ready_to_connect',
      configLocation: 'server.ts & src/data/siteConfig.ts',
      notes: 'La revalidation serveur des prix/stocks (/api/shop/validate-cart) est opérationnelle ; le checkout direct reste désactivé sans clés marchandes.',
    },
    {
      id: 'confirmed-concerts-ticketing',
      category: 'ticketing',
      label: 'Dates de concerts confirmées et liens de billetterie externe (Mode A) ou base de données billetterie (Mode B)',
      status: 'not_configured',
      configLocation: 'src/data/events.ts',
      notes: 'Aucun concert fictif n’est affiché. La section présente sobrement l’attente des prochaines dates.',
    },
    {
      id: 'official-covers',
      category: 'media',
      label: 'Pochettes haute définition officielles des projets (2013, 2017, 2019, 2024)',
      status: 'pending_artist_validation',
      configLocation: 'src/data/releases.ts',
      notes: 'Remplacées par des compositions typographiques éditoriales temporaires clairement identifiées.',
    },
    {
      id: 'youtube-video-ids',
      category: 'video',
      label: 'Identifiants YouTube exacts (videoId) des clips autorisés à l’intégration iframe',
      status: 'not_configured',
      configLocation: 'src/data/videos.ts',
      notes: 'Lien direct vers la chaîne YouTube officielle fourni ; aucun faux lecteur iframe n’est simulé.',
    },
    {
      id: 'booking-endpoint',
      category: 'contact',
      label: 'Coordonnées vérifiées de management / booking et endpoint serveur de messagerie',
      status: 'not_configured',
      configLocation: 'src/data/siteConfig.ts',
      notes: 'Le formulaire génère un brief structuré téléchargeable/copiable sans simuler un envoi serveur.',
    },
  ],
};
