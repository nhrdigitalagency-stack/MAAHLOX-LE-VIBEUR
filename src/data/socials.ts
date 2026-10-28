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

/**
 * Section 3 : Réseaux sociaux et plateformes documentés
 * - YouTube : https://www.youtube.com/channel/UCat6V_NP3w_cFCnmqJeJ7Qg
 * - Facebook : https://www.facebook.com/MaahloxOfficiel/
 * - Spotify : Profil artiste Maahlox Le Vibeur
 * - SoundCloud : https://soundcloud.com/maahlox (lien historique, activité actuelle à revalider)
 * - Instagram candidat : https://www.instagram.com/maahlox_officiel/
 *   (les descriptions historiques YouTube citent aussi https://www.instagram.com/maahloxofficiel/ ;
 *    désactivé en production jusqu'à validation du compte actuel par l'équipe du projet)
 * - TikTok : aucun lien confirmé (ne pas afficher l'icône tant que l'URL n'est pas fournie)
 */
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
      fr: 'Chaîne vidéo documentée',
      en: 'Documented video channel',
    },
    editorialDescription: {
      fr: 'Retrouvez les publications vidéo et la playlist « MAAHLOX Le Vibeur – CLIPS OFFICIELS » sur la chaîne YouTube référencée.',
      en: 'Watch video releases and the “MAAHLOX Le Vibeur – CLIPS OFFICIELS” playlist on the referenced YouTube channel.',
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
      fr: 'Lien documenté',
      en: 'Documented link',
    },
    editorialDescription: {
      fr: 'Page Facebook mentionnée dans les publications vidéo et références publiques du parcours de l’artiste.',
      en: 'Facebook page cited across video descriptions and public references of the artist’s career.',
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
      fr: 'Profil Spotify — Maahlox Le Vibeur',
      en: 'Spotify Profile — Maahlox Le Vibeur',
    },
    handleOrChannel: 'Maahlox Le Vibeur',
    url: 'https://open.spotify.com/search/Maahlox%20Le%20Vibeur',
    verificationStatus: 'verified_documented',
    statusBadge: {
      fr: 'Catalogue streaming documenté',
      en: 'Documented streaming catalog',
    },
    editorialDescription: {
      fr: 'Profil regroupant notamment les projets « Ça sort comme ça sort » (9 titres), « Izacam (Volume 1) » (26 titres) et les singles référencés sur Spotify.',
      en: 'Artist profile featuring projects “Ça sort comme ça sort” (9 tracks), “Izacam (Volume 1)” (26 tracks), and singles indexed on Spotify.',
    },
    enabled: true,
    displayOrder: 3,
    cardSpanClass: 'md:col-span-6',
  },
  {
    id: 'social-soundcloud',
    platform: 'soundcloud',
    platformName: 'SoundCloud',
    label: {
      fr: 'Profil SoundCloud — maahlox (lien historique)',
      en: 'SoundCloud Profile — maahlox (historical link)',
    },
    handleOrChannel: 'soundcloud.com/maahlox',
    url: 'https://soundcloud.com/maahlox',
    verificationStatus: 'historical_to_revalidate',
    statusBadge: {
      fr: 'Lien historique · Activité actuelle à revalider',
      en: 'Historical link · Current activity to revalidate',
    },
    editorialDescription: {
      fr: 'Archive audio en ligne associée aux premières publications. L’activité actuelle de ce profil reste à revalider par l’équipe.',
      en: 'Online audio archive associated with earlier releases. Current activity on this profile remains to be revalidated by the team.',
    },
    enabled: true,
    displayOrder: 4,
    cardSpanClass: 'md:col-span-6',
  },
  {
    id: 'social-instagram-candidate',
    platform: 'instagram',
    platformName: 'Instagram',
    label: {
      fr: 'Instagram (Candidat à valider par l’équipe)',
      en: 'Instagram (Candidate awaiting team validation)',
    },
    handleOrChannel: '@maahlox_officiel / @maahloxofficiel',
    url: 'https://www.instagram.com/maahlox_officiel/',
    alternateHistoricalUrl: 'https://www.instagram.com/maahloxofficiel/',
    verificationStatus: 'candidate_ambiguous',
    statusBadge: {
      fr: 'En attente de validation (2 URLs historiques recensées)',
      en: 'Pending validation (2 historical URLs recorded)',
    },
    editorialDescription: {
      fr: 'Compte candidat : https://www.instagram.com/maahlox_officiel/ (les descriptions YouTube historiques citent aussi https://www.instagram.com/maahloxofficiel/). Désactivé jusqu’à confirmation de l’équipe.',
      en: 'Candidate account: https://www.instagram.com/maahlox_officiel/ (historical YouTube descriptions also cite https://www.instagram.com/maahloxofficiel/). Disabled until team confirmation.',
    },
    enabled: false,
    displayOrder: 5,
    cardSpanClass: 'md:col-span-6',
  },
  {
    id: 'social-tiktok-unconfirmed',
    platform: 'tiktok',
    platformName: 'TikTok',
    label: {
      fr: 'TikTok (Aucun lien confirmé)',
      en: 'TikTok (No confirmed link)',
    },
    handleOrChannel: 'Non renseigné',
    url: null,
    verificationStatus: 'unconfirmed_missing_url',
    statusBadge: {
      fr: 'URL non fournie',
      en: 'URL not provided',
    },
    editorialDescription: {
      fr: 'Aucun lien TikTok confirmé. L’icône et le lien ne sont jamais affichés tant que l’URL officielle n’est pas fournie.',
      en: 'No confirmed TikTok link. Icon and link are never displayed until an official URL is provided.',
    },
    enabled: false,
    displayOrder: 6,
    cardSpanClass: 'md:col-span-6',
  },
];

export function getActivePublicSocials(): SocialLinkItem[] {
  return socialsData
    .filter((item) => item.enabled && Boolean(item.url))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getPendingVerificationSocials(
  mode: SiteEnvironmentMode
): SocialLinkItem[] {
  if (mode !== 'preview') return [];
  return socialsData
    .filter((item) => !item.enabled)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
