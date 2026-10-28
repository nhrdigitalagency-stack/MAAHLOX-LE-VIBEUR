import { SiteEnvironmentMode } from './siteConfig';

export type SocialPlatformId =
  | 'facebook'
  | 'youtube'
  | 'spotify'
  | 'soundcloud'
  | 'instagram'
  | 'tiktok';

export type SocialVerificationStatus =
  | 'verified_documented'
  | 'historical_to_revalidate'
  | 'candidate_ambiguous'
  | 'unconfirmed_missing_url';

export interface SocialLinkItem {
  id: string;
  platform: SocialPlatformId;
  platformName: string;
  label: {
    fr: string;
    en: string;
  };
  handleOrChannel: string;
  url: string | null;
  alternateHistoricalUrl?: string;
  verificationStatus: SocialVerificationStatus;
  statusBadge: {
    fr: string;
    en: string;
  };
  editorialDescription: {
    fr: string;
    en: string;
  };
  enabled: boolean;
  displayOrder: number;
  cardSpanClass: string;
}

export const socialsData: SocialLinkItem[] = [
  {
    id: 'social-youtube',
    platform: 'youtube',
    platformName: 'YouTube',
    label: {
      fr: 'Chaîne YouTube — MAAHLOX officiel',
      en: 'YouTube Channel — MAAHLOX officiel',
    },
    handleOrChannel: 'MAAHLOX officiel',
    url: 'https://www.youtube.com/channel/UCat6V_NP3w_cFCnmqJeJ7Qg',
    verificationStatus: 'verified_documented',
    statusBadge: {
      fr: 'Chaîne Vidéo & Clips',
      en: 'Video Channel & Music Videos',
    },
    editorialDescription: {
      fr: 'Retrouvez les publications vidéo et la playlist « MAAHLOX Le Vibeur – CLIPS OFFICIELS » sur la chaîne YouTube.',
      en: 'Watch video releases and the “MAAHLOX Le Vibeur – CLIPS OFFICIELS” playlist on the YouTube channel.',
    },
    enabled: true,
    displayOrder: 1,
    cardSpanClass: 'md:col-span-7',
  },
  {
    id: 'social-facebook',
    platform: 'facebook',
    platformName: 'Facebook',
    label: {
      fr: 'Page Facebook — MaahloxOfficiel',
      en: 'Facebook Page — MaahloxOfficiel',
    },
    handleOrChannel: '@MaahloxOfficiel',
    url: 'https://www.facebook.com/MaahloxOfficiel/',
    verificationStatus: 'verified_documented',
    statusBadge: {
      fr: 'Page Communauté',
      en: 'Community Page',
    },
    editorialDescription: {
      fr: 'Suivez les actualités, annonces et publications de Maahlox Le Vibeur sur Facebook.',
      en: 'Follow news, announcements, and posts from Maahlox Le Vibeur on Facebook.',
    },
    enabled: true,
    displayOrder: 2,
    cardSpanClass: 'md:col-span-5',
  },
  {
    id: 'social-spotify',
    platform: 'spotify',
    platformName: 'Spotify',
    label: {
      fr: 'Spotify — Maahlox Le Vibeur',
      en: 'Spotify — Maahlox Le Vibeur',
    },
    handleOrChannel: 'Maahlox Le Vibeur',
    url: 'https://open.spotify.com/search/Maahlox%20Le%20Vibeur',
    verificationStatus: 'verified_documented',
    statusBadge: {
      fr: 'Catalogue Streaming',
      en: 'Streaming Catalog',
    },
    editorialDescription: {
      fr: 'Écoutez les projets « Ça sort comme ça sort », « Izacam (Volume 1) » et l’ensemble des singles disponibles sur Spotify.',
      en: 'Stream the projects “Ça sort comme ça sort”, “Izacam (Volume 1)”, and all singles available on Spotify.',
    },
    enabled: true,
    displayOrder: 3,
    cardSpanClass: 'md:col-span-4',
  },
  {
    id: 'social-soundcloud',
    platform: 'soundcloud',
    platformName: 'SoundCloud',
    label: {
      fr: 'SoundCloud — maahlox',
      en: 'SoundCloud — maahlox',
    },
    handleOrChannel: 'soundcloud.com/maahlox',
    url: 'https://soundcloud.com/maahlox',
    verificationStatus: 'historical_to_revalidate',
    statusBadge: {
      fr: 'Archives Audio',
      en: 'Audio Archives',
    },
    editorialDescription: {
      fr: 'Explorez les archives audio et premières publications en ligne de Maahlox Le Vibeur sur SoundCloud.',
      en: 'Explore audio archives and early online releases from Maahlox Le Vibeur on SoundCloud.',
    },
    enabled: true,
    displayOrder: 4,
    cardSpanClass: 'md:col-span-4',
  },
  {
    id: 'social-instagram',
    platform: 'instagram',
    platformName: 'Instagram',
    label: {
      fr: 'Instagram — @maahlox_officiel',
      en: 'Instagram — @maahlox_officiel',
    },
    handleOrChannel: '@maahlox_officiel',
    url: 'https://www.instagram.com/maahlox_officiel/',
    verificationStatus: 'verified_documented',
    statusBadge: {
      fr: 'Galerie & Coulisses',
      en: 'Visuals & Backstage',
    },
    editorialDescription: {
      fr: 'Visuels de scène, sessions studio et instants capturés autour de l’univers de Maahlox Le Vibeur.',
      en: 'Stage visuals, studio sessions, and moments captured around Maahlox Le Vibeur’s universe.',
    },
    enabled: true,
    displayOrder: 5,
    cardSpanClass: 'md:col-span-4',
  },
];

export function getActivePublicSocials(): SocialLinkItem[] {
  return socialsData
    .filter((item) => item.enabled && Boolean(item.url))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getPendingVerificationSocials(
  _mode?: SiteEnvironmentMode
): SocialLinkItem[] {
  return [];
}
