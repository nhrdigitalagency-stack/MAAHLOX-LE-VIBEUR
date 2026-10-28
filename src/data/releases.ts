export interface ReleaseProject {
  id: string;
  title: string;
  year: string;
  releaseDateNoteFr: string;
  releaseDateNoteEn: string;
  roleInTimelineFr: string;
  roleInTimelineEn: string;
  descriptionFr: string;
  descriptionEn: string;
  documentedDetailsFr: string[];
  documentedDetailsEn: string[];
  documentedTracksFr: string[];
  documentedTracksEn: string[];
  officialCoverPath: string | null;
  typographicPosterCode: {
    indexNumber: string;
    shortCode: string;
    accentColor: string;
  };
  verifiedListenLinks: {
    platform: 'Spotify' | 'Deezer';
    url: string;
    labelFr: string;
    labelEn: string;
  }[];
  creditsFr: string | null;
}

export type ChronologyEraGroup =
  | 'all'
  | '2012-2017'
  | '2018-2021'
  | '2022-2023'
  | '2024-2026';

export interface DocumentedTrackEntry {
  id: string;
  trackNumber?: number;
  title: string;
  artistsOrCollabFr?: string;
  artistsOrCollabEn?: string;
  dateOrPeriodFr: string;
  dateOrPeriodEn: string;
  sourceNoteFr?: string;
  sourceNoteEn?: string;
  spotifyAction: 'listen_confirmed' | 'search';
  spotifyUrl: string;
}

export interface DocumentedEraBlock {
  id: string;
  eraNumber: string;
  eraGroup: Exclude<ChronologyEraGroup, 'all'>;
  periodTitleFr: string;
  periodTitleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  editorialContextFr: string;
  editorialContextEn: string;
  methodologyAlertFr?: string;
  methodologyAlertEn?: string;
  projectSpotifyUrl?: string;
  projectSpotifyLabelFr?: string;
  projectSpotifyLabelEn?: string;
  tracks: DocumentedTrackEntry[];
}

const buildSpotifySearchUrl = (query: string) =>
  `https://open.spotify.com/search/${encodeURIComponent(query)}`;

export const releasesData: ReleaseProject[] = [
  {
    id: 'traumatiser-2013',
    title: 'Traumatiser',
    year: '2013',
    releaseDateNoteFr: 'Référencé en 2013 (après la révélation de 2012)',
    releaseDateNoteEn: 'Referenced in 2013 (following the 2012 breakthrough)',
    roleInTimelineFr: 'Chapitre des débuts dans la chronologie discographique.',
    roleInTimelineEn: 'Early milestone in the documented discography.',
    descriptionFr:
      'Premier projet référencé après la révélation de « La bière c’est combien ici ? » (2012). Il marque l’ancrage de Maahlox Le Vibeur dans le paysage urbain camerounais du début des années 2010.',
    descriptionEn:
      'First referenced project following the 2012 breakthrough of “La bière c’est combien ici ?”, marking Maahlox Le Vibeur’s anchorage in the early-2010s Cameroonian urban scene.',
    documentedDetailsFr: [
      'Année de référence : 2013 (après « La bière c’est combien ici ? » en 2012)',
      'Onze premiers titres retrouvés dans une compilation publiée en avril 2018 (dates de sortie originales non confirmées individuellement)',
      'Collaboration documentée de cette période : « Traumatiser » — avec Koppo',
    ],
    documentedDetailsEn: [
      'Reference year: 2013 (following “La bière c’est combien ici ?” in 2012)',
      'Eleven early tracks traced in an April 2018 compilation (individual original release dates unconfirmed)',
      'Documented collaboration from this era: “Traumatiser” — featuring Koppo',
    ],
    documentedTracksFr: [
      'La bière c’est combien ici (2012 — piste Spotify confirmée)',
      'Traumatiser — avec Koppo',
      'L’argent c’est l’argent',
      'Arrêter Brenda',
      'Alexandre Song dans ton dos',
      'Tchoupo Moting ne sort pas',
      'Écraser le pistache',
      'On veut s’amuser',
      'Tu es dedans',
      'Un bon plantain',
      'Fouillez fouillez',
      'Mange ta part',
    ],
    documentedTracksEn: [
      'La bière c’est combien ici (2012 — confirmed Spotify track)',
      'Traumatiser — with Koppo',
      'L’argent c’est l’argent',
      'Arrêter Brenda',
      'Alexandre Song dans ton dos',
      'Tchoupo Moting ne sort pas',
      'Écraser le pistache',
      'On veut s’amuser',
      'Tu es dedans',
      'Un bon plantain',
      'Fouillez fouillez',
      'Mange ta part',
    ],
    officialCoverPath: null,
    typographicPosterCode: {
      indexNumber: 'PROJ. 01',
      shortCode: 'TRM / 13',
      accentColor: '#FF5A1F',
    },
    verifiedListenLinks: [
      {
        platform: 'Spotify',
        url: buildSpotifySearchUrl('Maahlox Le Vibeur Traumatiser'),
        labelFr: 'Rechercher sur Spotify',
        labelEn: 'Search on Spotify',
      },
      {
        platform: 'Deezer',
        url: 'https://www.deezer.com/fr/search/Maahlox%20Le%20Vibeur%20Traumatiser',
        labelFr: 'Rechercher sur Deezer',
        labelEn: 'Search on Deezer',
      },
    ],
    creditsFr: null,
  },
  {
    id: 'ca-sort-comme-ca-sort-2017',
    title: 'Ça sort comme ça sort',
    year: '2017',
    releaseDateNoteFr: 'Publication numérique : 3 mars 2017 · 9 titres',
    releaseDateNoteEn: 'Digital release: March 3, 2017 · 9 tracks',
    roleInTimelineFr: 'Projet de 9 titres documenté sur Spotify et Audiomack.',
    roleInTimelineEn: '9-track project documented on Spotify and Audiomack.',
    descriptionFr:
      'Publié numériquement le 3 mars 2017, ce projet contient neuf morceaux dont l’ordre de la tracklist est documenté sur Audiomack. Certains titres ont pu circuler avant cette date de publication groupée.',
    descriptionEn:
      'Digitally published on March 3, 2017, this project contains nine tracks with the tracklist order documented on Audiomack. Some songs circulated prior to this collective release date.',
    documentedDetailsFr: [
      'Date de publication numérique : 3 mars 2017',
      'Volume : 9 titres (ordre de la tracklist documenté sur Audiomack)',
      'Piste 8 « Tu as combien » : disponibilité directe confirmée sur Spotify',
      'Autre sortie de l’année 2017 : « Fini avec » (8 décembre 2017, Qobuz)',
    ],
    documentedDetailsEn: [
      'Digital publication date: March 3, 2017',
      'Volume: 9 tracks (tracklist order documented on Audiomack)',
      'Track 8 “Tu as combien”: direct availability confirmed on Spotify',
      'Other 2017 release: “Fini avec” (December 8, 2017, Qobuz)',
    ],
    documentedTracksFr: [
      '1. Ça sort comme ça sort',
      '2. Tuer pour tuer — avec Phil-B',
      '3. Ça rit pas',
      '4. Tu montes tu descends',
      '5. Secoue',
      '6. Le Fou',
      '7. Toujours dedans',
      '8. Tu as combien (Écouter sur Spotify)',
      '9. Les sorciers',
    ],
    documentedTracksEn: [
      '1. Ça sort comme ça sort',
      '2. Tuer pour tuer — with Phil-B',
      '3. Ça rit pas',
      '4. Tu montes tu descends',
      '5. Secoue',
      '6. Le Fou',
      '7. Toujours dedans',
      '8. Tu as combien (Listen on Spotify)',
      '9. Les sorciers',
    ],
    officialCoverPath: null,
    typographicPosterCode: {
      indexNumber: 'PROJ. 02',
      shortCode: 'CSCS / 17',
      accentColor: '#FF5A1F',
    },
    verifiedListenLinks: [
      {
        platform: 'Spotify',
        url: buildSpotifySearchUrl('Maahlox Le Vibeur Ça sort comme ça sort'),
        labelFr: 'Ça sort comme ça sort — 9 titres (Spotify)',
        labelEn: 'Ça sort comme ça sort — 9 tracks (Spotify)',
      },
      {
        platform: 'Deezer',
        url: 'https://www.deezer.com/fr/search/Maahlox%20Le%20Vibeur%20Ca%20sort%20comme%20ca%20sort',
        labelFr: 'Rechercher sur Deezer',
        labelEn: 'Search on Deezer',
      },
    ],
    creditsFr: null,
  },
  {
    id: 'prends-seulement-ta-part-2019',
    title: 'Prends seulement ta part',
    year: '2018 / 2019',
    releaseDateNoteFr: 'Single le 18 juin 2018 · Projet cité en 2019',
    releaseDateNoteEn: 'Single on June 18, 2018 · Project cited in 2019',
    roleInTimelineFr: 'Single confirmé sur Spotify (2018) & projet biographique (2019).',
    roleInTimelineEn: 'Confirmed Spotify single (2018) & biographical project (2019).',
    descriptionFr:
      'Les sources biographiques citent un album de 2019 intitulé « Prends seulement ta part », tandis que les catalogues numériques consultés (Qobuz, Spotify) présentent un single sorti le 18 juin 2018. Par rigueur éditoriale, aucune tracklist non vérifiée n’est inventée pour l’album de 2019.',
    descriptionEn:
      'Biographical sources cite a 2019 album titled “Prends seulement ta part”, whereas digital catalogs (Qobuz, Spotify) index a single released on June 18, 2018. For editorial accuracy, no unverified tracklist is invented for the 2019 album.',
    documentedDetailsFr: [
      '18 juin 2018 : publication numérique du single « Prends seulement ta part » (Qobuz & piste confirmée sur Spotify)',
      '2019 : mention biographique d’un projet du même nom (tracklist complète non établie — aucune piste inventée)',
      '15 juillet 2019 : sortie du single confirmé « Montre moi » (Qobuz & Spotify)',
    ],
    documentedDetailsEn: [
      'June 18, 2018: digital release of the single “Prends seulement ta part” (Qobuz & confirmed Spotify track)',
      '2019: biographical mention of a project of the same name (complete tracklist not established — no tracks invented)',
      'July 15, 2019: release of confirmed single “Montre moi” (Qobuz & Spotify)',
    ],
    documentedTracksFr: [
      'Prends seulement ta part (Single — 18 juin 2018 · Écouter sur Spotify)',
      'Montre moi (Single — 15 juillet 2019 · Écouter sur Spotify)',
    ],
    documentedTracksEn: [
      'Prends seulement ta part (Single — June 18, 2018 · Listen on Spotify)',
      'Montre moi (Single — July 15, 2019 · Listen on Spotify)',
    ],
    officialCoverPath: null,
    typographicPosterCode: {
      indexNumber: 'PROJ. 03',
      shortCode: 'PSTP / 19',
      accentColor: '#DFFF00',
    },
    verifiedListenLinks: [
      {
        platform: 'Spotify',
        url: buildSpotifySearchUrl('Maahlox Le Vibeur Prends seulement ta part'),
        labelFr: 'Écouter sur Spotify',
        labelEn: 'Listen on Spotify',
      },
      {
        platform: 'Deezer',
        url: 'https://www.deezer.com/fr/search/Maahlox%20Le%20Vibeur%20Prends%20seulement%20ta%20part',
        labelFr: 'Rechercher sur Deezer',
        labelEn: 'Search on Deezer',
      },
    ],
    creditsFr: null,
  },
  {
    id: 'izacam-vol-1-2024',
    title: 'Izacam (Volume 1)',
    year: '2024',
    releaseDateNoteFr: 'Publication numérique : 24 mai 2024 · 26 titres (~1 h 38)',
    releaseDateNoteEn: 'Digital release: May 24, 2024 · 26 tracks (~1h 38m)',
    roleInTimelineFr: 'Projet majeur de 26 titres documenté sur Spotify et Stillac.',
    roleInTimelineEn: 'Major 26-track project documented on Spotify and Stillac.',
    descriptionFr:
      'Publié le 24 mai 2024, « Izacam (Volume 1) » comprend 26 titres pour environ 1 h 38 min d’écoute. La tracklist ci-dessous suit l’ordre documenté sur Stillac (incluant la reprise de singles parus antérieurement comme « L’amitié », « Ce n’est plus le quartier » et « On ne met pas le cœur »).',
    descriptionEn:
      'Published on May 24, 2024, “Izacam (Volume 1)” spans 26 tracks (~1h 38m). The tracklist follows the exact order documented on Stillac (including previously released singles such as “L’amitié”, “Ce n’est plus le quartier”, and “On ne met pas le cœur”).',
    documentedDetailsFr: [
      'Date de publication numérique : 24 mai 2024',
      'Format : 26 titres · Durée environ 1 h 38 min',
      'Collaborations indiquées sur Stillac : Opinel 21 (piste 5), Lil Peuffy (piste 9), Tim Kayzer (piste 10), Therapie (piste 19), Magasco (piste 21), Dilo Sog (piste 24)',
      'Note de rigueur : les pistes 15 (« Personne ne connaît… ») et 24 (« Elle a une… ») conservent leurs points de suspension tels qu’édités sur Stillac',
    ],
    documentedDetailsEn: [
      'Digital publication date: May 24, 2024',
      'Format: 26 tracks · Runtime approx. 1h 38m',
      'Collaborations listed on Stillac: Opinel 21 (track 5), Lil Peuffy (track 9), Tim Kayzer (track 10), Therapie (track 19), Magasco (track 21), Dilo Sog (track 24)',
      'Editorial accuracy note: tracks 15 (“Personne ne connaît…”) and 24 (“Elle a une…”) retain their ellipsis exactly as published on Stillac',
    ],
    documentedTracksFr: [
      '1. Mon livre unique de français',
      '2. Il faut',
      '3. Le bon chat',
      '4. L’amitié',
      '5. Faut bisser (avec Opinel 21)',
      '6. C’est trop bon',
      '7. Le koki',
      '8. Ce n’est plus le quartier',
      '9. Ça croque dur (avec Lil Peuffy)',
      '10. C’est Dieu qui va m’élever (avec Tim Kayzer)',
      '11. Vu trop de choses',
      '12. Mes sentiments',
      '13. Il est calé',
      '14. Le match',
      '15. Personne ne connaît…',
      '16. Si tu pars',
      '17. Va à l’école (Écouter sur Spotify)',
      '18. Interlude',
      '19. Le cube (avec Therapie)',
      '20. On ne met pas le cœur',
      '21. Take it slow (avec Magasco)',
      '22. Tu tapes seulement',
      '23. Théorie du danger',
      '24. Elle a une… (avec Dilo Sog)',
      '25. Le gésier',
      '26. Hypocrite',
    ],
    documentedTracksEn: [
      '1. Mon livre unique de français',
      '2. Il faut',
      '3. Le bon chat',
      '4. L’amitié',
      '5. Faut bisser (feat. Opinel 21)',
      '6. C’est trop bon',
      '7. Le koki',
      '8. Ce n’est plus le quartier',
      '9. Ça croque dur (feat. Lil Peuffy)',
      '10. C’est Dieu qui va m’élever (feat. Tim Kayzer)',
      '11. Vu trop de choses',
      '12. Mes sentiments',
      '13. Il est calé',
      '14. Le match',
      '15. Personne ne connaît…',
      '16. Si tu pars',
      '17. Va à l’école (Listen on Spotify)',
      '18. Interlude',
      '19. Le cube (feat. Therapie)',
      '20. On ne met pas le cœur',
      '21. Take it slow (feat. Magasco)',
      '22. Tu tapes seulement',
      '23. Théorie du danger',
      '24. Elle a une… (feat. Dilo Sog)',
      '25. Le gésier',
      '26. Hypocrite',
    ],
    officialCoverPath: null,
    typographicPosterCode: {
      indexNumber: 'PROJ. 04',
      shortCode: 'IZC1 / 24',
      accentColor: '#FF5A1F',
    },
    verifiedListenLinks: [
      {
        platform: 'Spotify',
        url: buildSpotifySearchUrl('Maahlox Le Vibeur Izacam Volume 1'),
        labelFr: 'Izacam (Volume 1) sur Spotify',
        labelEn: 'Izacam (Volume 1) on Spotify',
      },
      {
        platform: 'Deezer',
        url: 'https://www.deezer.com/fr/search/Maahlox%20Le%20Vibeur%20Izacam',
        labelFr: 'Rechercher sur Deezer',
        labelEn: 'Search on Deezer',
      },
    ],
    creditsFr: null,
  },
];

/**
 * CHRONOLOGIE INTÉGRALE DES 11 PÉRIODES DOCUMENTÉES (2012 – 2026)
 * Reprend l'intégralité des morceaux, dates, collaborations et statuts Spotify fournis.
 */
export const documentedChronologyData: DocumentedEraBlock[] = [
  {
    id: 'era-01-premiers-titres',
    eraNumber: '01',
    eraGroup: '2012-2017',
    periodTitleFr: 'Premiers titres : 2012 & compilation d’avril 2018',
    periodTitleEn: 'Early Tracks: 2012 & April 2018 Compilation',
    subtitleFr: '12 morceaux · Dates originales antérieures à avril 2018 à compléter',
    subtitleEn: '12 tracks · Original pre-April 2018 release dates to be completed',
    editorialContextFr:
      '« La bière c’est combien ici ? » est associé à sa révélation en 2012 (piste Spotify confirmée). Pour les onze autres titres ci-dessous, une trace figure dans une compilation publiée en avril 2018, sans date de sortie originale suffisamment établie pour les classer individuellement entre eux.',
    editorialContextEn:
      '“La bière c’est combien ici ?” is associated with his 2012 breakthrough (confirmed Spotify track). The other eleven tracks below appear in an April 2018 compilation without sufficiently established original release dates to rank them individually.',
    tracks: [
      {
        id: 'trk-2012-biere',
        title: 'La bière c’est combien ici',
        dateOrPeriodFr: '2012, selon sa biographie',
        dateOrPeriodEn: '2012, according to biography',
        sourceNoteFr: 'Piste Spotify confirmée',
        sourceNoteEn: 'Confirmed Spotify track',
        spotifyAction: 'listen_confirmed',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur La bière c’est combien ici'),
      },
      {
        id: 'trk-pre2018-argent',
        title: 'L’argent c’est l’argent',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur L’argent c’est l’argent'),
      },
      {
        id: 'trk-pre2018-brenda',
        title: 'Arrêter Brenda',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Arrêter Brenda'),
      },
      {
        id: 'trk-pre2018-alexandre-song',
        title: 'Alexandre Song dans ton dos',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Alexandre Song dans ton dos'),
      },
      {
        id: 'trk-pre2018-tchoupo',
        title: 'Tchoupo Moting ne sort pas',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Tchoupo Moting ne sort pas'),
      },
      {
        id: 'trk-pre2018-pistache',
        title: 'Écraser le pistache',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Écraser le pistache'),
      },
      {
        id: 'trk-pre2018-traumatiser',
        title: 'Traumatiser',
        artistsOrCollabFr: 'avec Koppo',
        artistsOrCollabEn: 'with Koppo',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Koppo Traumatiser'),
      },
      {
        id: 'trk-pre2018-amuser',
        title: 'On veut s’amuser',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur On veut s’amuser'),
      },
      {
        id: 'trk-pre2018-dedans',
        title: 'Tu es dedans',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Tu es dedans'),
      },
      {
        id: 'trk-pre2018-plantain',
        title: 'Un bon plantain',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Un bon plantain'),
      },
      {
        id: 'trk-pre2018-fouillez',
        title: 'Fouillez fouillez',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Fouillez fouillez'),
      },
      {
        id: 'trk-pre2018-mange-ta-part',
        title: 'Mange ta part',
        dateOrPeriodFr: 'Avant avril 2018, date originale non confirmée',
        dateOrPeriodEn: 'Before April 2018, original date unconfirmed',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Mange ta part'),
      },
    ],
  },
  {
    id: 'era-02-2015-collab',
    eraNumber: '02',
    eraGroup: '2012-2017',
    periodTitleFr: '2015 — Collaboration retrouvée',
    periodTitleEn: '2015 — Documented Collaboration',
    subtitleFr: 'Sortie associée à l’artiste recensée sur Shazam',
    subtitleEn: 'Associated release indexed on Shazam',
    editorialContextFr:
      'Collaboration recensée dans les sorties associées à Maahlox Le Vibeur sur Shazam en 2015.',
    editorialContextEn:
      'Collaboration indexed among releases associated with Maahlox Le Vibeur on Shazam in 2015.',
    tracks: [
      {
        id: 'trk-2015-15ans',
        title: 'À 15 ans tu fais déjà',
        artistsOrCollabFr: 'Dollard Lemoine et Maahlox Le Vibeur',
        artistsOrCollabEn: 'Dollard Lemoine and Maahlox Le Vibeur',
        dateOrPeriodFr: '2015',
        dateOrPeriodEn: '2015',
        sourceNoteFr: 'Recensé sur Shazam',
        sourceNoteEn: 'Indexed on Shazam',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Dollard Lemoine Maahlox Le Vibeur À 15 ans tu fais déjà'),
      },
    ],
  },
  {
    id: 'era-03-2017-cscs',
    eraNumber: '03',
    eraGroup: '2012-2017',
    periodTitleFr: '2017 — « Ça sort comme ça sort » (9 titres) & Single',
    periodTitleEn: '2017 — “Ça sort comme ça sort” (9 tracks) & Single',
    subtitleFr: 'Publication numérique du projet : 3 mars 2017 · Autre sortie : 8 décembre 2017',
    subtitleEn: 'Project digital release: March 3, 2017 · Other release: December 8, 2017',
    editorialContextFr:
      'L’ordre des neuf titres du projet du 3 mars 2017 est documenté sur Audiomack ; la piste 8 « Tu as combien » dispose d’un lien direct retrouvé sur Spotify. Le single « Fini avec » (8 décembre 2017) est recensé par Qobuz.',
    editorialContextEn:
      'The order of the nine tracks from the March 3, 2017 project is documented on Audiomack; track 8 “Tu as combien” has a confirmed Spotify entry. The single “Fini avec” (December 8, 2017) is indexed by Qobuz.',
    projectSpotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Ça sort comme ça sort'),
    projectSpotifyLabelFr: 'Ça sort comme ça sort — 9 titres (Spotify)',
    projectSpotifyLabelEn: 'Ça sort comme ça sort — 9 tracks (Spotify)',
    tracks: [
      {
        id: 'trk-2017-cscs-1',
        trackNumber: 1,
        title: 'Ça sort comme ça sort',
        dateOrPeriodFr: '3 mars 2017 (Piste 1)',
        dateOrPeriodEn: 'March 3, 2017 (Track 1)',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Ça sort comme ça sort'),
      },
      {
        id: 'trk-2017-cscs-2',
        trackNumber: 2,
        title: 'Tuer pour tuer',
        artistsOrCollabFr: 'avec Phil-B',
        artistsOrCollabEn: 'with Phil-B',
        dateOrPeriodFr: '3 mars 2017 (Piste 2)',
        dateOrPeriodEn: 'March 3, 2017 (Track 2)',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Phil-B Tuer pour tuer'),
      },
      {
        id: 'trk-2017-cscs-3',
        trackNumber: 3,
        title: 'Ça rit pas',
        dateOrPeriodFr: '3 mars 2017 (Piste 3)',
        dateOrPeriodEn: 'March 3, 2017 (Track 3)',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Ça rit pas'),
      },
      {
        id: 'trk-2017-cscs-4',
        trackNumber: 4,
        title: 'Tu montes tu descends',
        dateOrPeriodFr: '3 mars 2017 (Piste 4)',
        dateOrPeriodEn: 'March 3, 2017 (Track 4)',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Tu montes tu descends'),
      },
      {
        id: 'trk-2017-cscs-5',
        trackNumber: 5,
        title: 'Secoue',
        dateOrPeriodFr: '3 mars 2017 (Piste 5)',
        dateOrPeriodEn: 'March 3, 2017 (Track 5)',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Secoue'),
      },
      {
        id: 'trk-2017-cscs-6',
        trackNumber: 6,
        title: 'Le Fou',
        dateOrPeriodFr: '3 mars 2017 (Piste 6)',
        dateOrPeriodEn: 'March 3, 2017 (Track 6)',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Le Fou'),
      },
      {
        id: 'trk-2017-cscs-7',
        trackNumber: 7,
        title: 'Toujours dedans',
        dateOrPeriodFr: '3 mars 2017 (Piste 7)',
        dateOrPeriodEn: 'March 3, 2017 (Track 7)',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Toujours dedans'),
      },
      {
        id: 'trk-2017-cscs-8',
        trackNumber: 8,
        title: 'Tu as combien',
        dateOrPeriodFr: '3 mars 2017 (Piste 8)',
        dateOrPeriodEn: 'March 3, 2017 (Track 8)',
        sourceNoteFr: 'Lien direct Spotify retrouvé',
        sourceNoteEn: 'Direct Spotify entry confirmed',
        spotifyAction: 'listen_confirmed',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Tu as combien'),
      },
      {
        id: 'trk-2017-cscs-9',
        trackNumber: 9,
        title: 'Les sorciers',
        dateOrPeriodFr: '3 mars 2017 (Piste 9)',
        dateOrPeriodEn: 'March 3, 2017 (Track 9)',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Les sorciers'),
      },
      {
        id: 'trk-2017-fini-avec',
        title: 'Fini avec',
        dateOrPeriodFr: '8 décembre 2017',
        dateOrPeriodEn: 'December 8, 2017',
        sourceNoteFr: 'Autre sortie 2017 recensée par Qobuz',
        sourceNoteEn: 'Other 2017 release indexed by Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Fini avec'),
      },
    ],
  },
  {
    id: 'era-04-2018-singles',
    eraNumber: '04',
    eraGroup: '2018-2021',
    periodTitleFr: '2018 — Singles',
    periodTitleEn: '2018 — Singles',
    subtitleFr: '5 singles classés selon leurs dates de publication numérique recensées par Qobuz',
    subtitleEn: '5 singles ordered by digital publication dates indexed by Qobuz',
    editorialContextFr:
      'Les morceaux suivants sont classés selon leurs dates de publication numérique recensées par Qobuz. Les pistes « C’est encore debout » et « Prends seulement ta part » ont été retrouvées sur Spotify.',
    editorialContextEn:
      'The following tracks are ordered by their Qobuz digital release dates. “C’est encore debout” and “Prends seulement ta part” have confirmed entries on Spotify.',
    tracks: [
      {
        id: 'trk-2018-debout',
        title: 'C’est encore debout',
        dateOrPeriodFr: '6 février 2018',
        dateOrPeriodEn: 'February 6, 2018',
        sourceNoteFr: 'Qobuz · Piste Spotify confirmée',
        sourceNoteEn: 'Qobuz · Confirmed Spotify track',
        spotifyAction: 'listen_confirmed',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur C’est encore debout'),
      },
      {
        id: 'trk-2018-mouf',
        title: 'Mouf',
        dateOrPeriodFr: '27 mars 2018',
        dateOrPeriodEn: 'March 27, 2018',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Mouf'),
      },
      {
        id: 'trk-2018-gout',
        title: 'Ça a le goût',
        dateOrPeriodFr: '29 mars 2018',
        dateOrPeriodEn: 'March 29, 2018',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Ça a le goût'),
      },
      {
        id: 'trk-2018-bosse',
        title: 'Voici alors la bosse',
        dateOrPeriodFr: '21 avril 2018',
        dateOrPeriodEn: 'April 21, 2018',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Voici alors la bosse'),
      },
      {
        id: 'trk-2018-pstp',
        title: 'Prends seulement ta part',
        dateOrPeriodFr: '18 juin 2018',
        dateOrPeriodEn: 'June 18, 2018',
        sourceNoteFr: 'Qobuz · Piste Spotify confirmée',
        sourceNoteEn: 'Qobuz · Confirmed Spotify track',
        spotifyAction: 'listen_confirmed',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Prends seulement ta part'),
      },
    ],
  },
  {
    id: 'era-05-2019-single',
    eraNumber: '05',
    eraGroup: '2018-2021',
    periodTitleFr: '2019 — Single confirmé & précision sur « Prends seulement ta part »',
    periodTitleEn: '2019 — Confirmed Single & Note on “Prends seulement ta part”',
    subtitleFr: '15 juillet 2019 (Qobuz & Spotify)',
    subtitleEn: 'July 15, 2019 (Qobuz & Spotify)',
    editorialContextFr:
      'La sortie de « Montre moi » le 15 juillet 2019 est recensée par Qobuz et dispose d’une page Spotify retrouvée.',
    editorialContextEn:
      'The release of “Montre moi” on July 15, 2019 is indexed by Qobuz and has a confirmed Spotify page.',
    methodologyAlertFr:
      'Précision concernant « Prends seulement ta part » : les sources biographiques citent un album de 2019 portant ce nom, mais les catalogues numériques consultés présentent aussi un single sorti le 18 juin 2018. Faute de tracklist complète et fiable établie pour l’album de 2019, aucune piste n’est inventée et l’album n’est pas confondu avec le single.',
    methodologyAlertEn:
      'Clarification regarding “Prends seulement ta part”: biographical sources cite a 2019 album of this name, while consulted digital catalogs also index a single released on June 18, 2018. Without a complete and reliable tracklist for the 2019 album, no tracks are invented and the album is not conflated with the single.',
    tracks: [
      {
        id: 'trk-2019-montre-moi',
        title: 'Montre moi',
        dateOrPeriodFr: '15 juillet 2019',
        dateOrPeriodEn: 'July 15, 2019',
        sourceNoteFr: 'Qobuz · Page Spotify retrouvée',
        sourceNoteEn: 'Qobuz · Confirmed Spotify page',
        spotifyAction: 'listen_confirmed',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Montre moi'),
      },
    ],
  },
  {
    id: 'era-06-2020-singles',
    eraNumber: '06',
    eraGroup: '2018-2021',
    periodTitleFr: '2020 — Singles',
    periodTitleEn: '2020 — Singles',
    subtitleFr: '2 sorties recensées avec leurs dates par Qobuz',
    subtitleEn: '2 releases with dates indexed by Qobuz',
    editorialContextFr:
      'Deux sorties numériques recensées en 2020 par Qobuz, dont la collaboration « Merci » avec Black M.',
    editorialContextEn:
      'Two digital releases indexed in 2020 by Qobuz, including the collaboration “Merci” featuring Black M.',
    tracks: [
      {
        id: 'trk-2020-merci',
        title: 'Merci',
        artistsOrCollabFr: 'avec Black M',
        artistsOrCollabEn: 'with Black M',
        dateOrPeriodFr: '26 juin 2020',
        dateOrPeriodEn: 'June 26, 2020',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Black M Merci'),
      },
      {
        id: 'trk-2020-enlever',
        title: 'Tu veux enlever ?',
        dateOrPeriodFr: '3 décembre 2020',
        dateOrPeriodEn: 'December 3, 2020',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Tu veux enlever'),
      },
    ],
  },
  {
    id: 'era-07-2021-single',
    eraNumber: '07',
    eraGroup: '2018-2021',
    periodTitleFr: '2021 — Single confirmé',
    periodTitleEn: '2021 — Confirmed Single',
    subtitleFr: '4 juillet 2021 (Apple Music / suivi Spotify) · 8 juillet 2021 (Qobuz)',
    subtitleEn: 'July 4, 2021 (Apple Music / Spotify tracker) · July 8, 2021 (Qobuz)',
    editorialContextFr:
      'La date du 4 juillet 2021 figure chez Apple Music et dans le catalogue de suivi Spotify consulté (Qobuz présente également une entrée datée du 8 juillet 2021 ; la première date documentée est retenue ici).',
    editorialContextEn:
      'The July 4, 2021 date appears on Apple Music and in the consulted Spotify tracking catalog (Qobuz also lists an entry dated July 8, 2021; the earliest documented date is retained here).',
    tracks: [
      {
        id: 'trk-2021-coeur',
        title: 'On ne mets pas le cœur',
        dateOrPeriodFr: '4 juillet 2021',
        dateOrPeriodEn: 'July 4, 2021',
        sourceNoteFr: 'Apple Music / suivi Spotify (entrée du 8 juillet sur Qobuz)',
        sourceNoteEn: 'Apple Music / Spotify tracker (July 8 entry on Qobuz)',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur On ne mets pas le cœur'),
      },
    ],
  },
  {
    id: 'era-08-2022-singles',
    eraNumber: '08',
    eraGroup: '2022-2023',
    periodTitleFr: '2022 — Singles et collaboration',
    periodTitleEn: '2022 — Singles & Collaboration',
    subtitleFr: '4 sorties documentées (Qobuz & catalogue de suivi Spotify)',
    subtitleEn: '4 documented releases (Qobuz & Spotify tracking catalog)',
    editorialContextFr:
      'Les trois premiers titres sont datés dans le catalogue Qobuz. Le remix « Chacun sa chance », associé notamment à Daphne, Tzy Panchak, Maahlox et Tenor, figure dans les catalogues consultés au 13 novembre 2022.',
    editorialContextEn:
      'The first three tracks are dated in the Qobuz catalog. The “Chacun sa chance” remix, associated with Daphne, Tzy Panchak, Maahlox, and Tenor, appears in consulted catalogs on November 13, 2022.',
    tracks: [
      {
        id: 'trk-2022-danger',
        title: 'Le danger',
        dateOrPeriodFr: '13 avril 2022',
        dateOrPeriodEn: 'April 13, 2022',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Le danger'),
      },
      {
        id: 'trk-2022-ngang',
        title: 'Le Nga’ng',
        dateOrPeriodFr: '19 août 2022',
        dateOrPeriodEn: 'August 19, 2022',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Le Nga’ng'),
      },
      {
        id: 'trk-2022-nkang',
        title: 'L’excès de nkang',
        dateOrPeriodFr: '10 novembre 2022',
        dateOrPeriodEn: 'November 10, 2022',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur L’excès de nkang'),
      },
      {
        id: 'trk-2022-chacun-sa-chance',
        title: 'Chacun sa chance — Remix',
        artistsOrCollabFr: 'associé notamment à Daphne, Tzy Panchak, Maahlox et Tenor',
        artistsOrCollabEn: 'associated with Daphne, Tzy Panchak, Maahlox, and Tenor',
        dateOrPeriodFr: '13 novembre 2022, selon le catalogue de suivi Spotify',
        dateOrPeriodEn: 'November 13, 2022, per Spotify tracking catalog',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Chacun sa chance Remix Daphne Tzy Panchak Maahlox Tenor'),
      },
    ],
  },
  {
    id: 'era-09-2023-singles',
    eraNumber: '09',
    eraGroup: '2022-2023',
    periodTitleFr: '2023 — Singles',
    periodTitleEn: '2023 — Singles',
    subtitleFr: '3 sorties datées par Qobuz · Crédits artistes associés sur Shazam',
    subtitleEn: '3 releases dated by Qobuz · Associated artist credits on Shazam',
    editorialContextFr:
      'Les dates proviennent du catalogue Qobuz ; les artistes associés à « Les gros ways » (Maahlox Le Vibeur, Koppo et Mani Bella) sont indiqués sur Shazam.',
    editorialContextEn:
      'Dates originate from the Qobuz catalog; artists associated with “Les gros ways” (Maahlox Le Vibeur, Koppo, and Mani Bella) are credited on Shazam.',
    tracks: [
      {
        id: 'trk-2023-amitie',
        title: 'L’amitié',
        artistsOrCollabFr: 'Maahlox Le Vibeur',
        artistsOrCollabEn: 'Maahlox Le Vibeur',
        dateOrPeriodFr: '21 février 2023',
        dateOrPeriodEn: 'February 21, 2023',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur L’amitié'),
      },
      {
        id: 'trk-2023-quartier',
        title: 'Ce n’est plus le quartier',
        artistsOrCollabFr: 'Maahlox Le Vibeur',
        artistsOrCollabEn: 'Maahlox Le Vibeur',
        dateOrPeriodFr: '23 mai 2023',
        dateOrPeriodEn: 'May 23, 2023',
        sourceNoteFr: 'Qobuz',
        sourceNoteEn: 'Qobuz',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Ce n’est plus le quartier'),
      },
      {
        id: 'trk-2023-gros-ways',
        title: 'Les gros ways',
        artistsOrCollabFr: 'Maahlox Le Vibeur, Koppo et Mani Bella',
        artistsOrCollabEn: 'Maahlox Le Vibeur, Koppo, and Mani Bella',
        dateOrPeriodFr: '28 septembre 2023',
        dateOrPeriodEn: 'September 28, 2023',
        sourceNoteFr: 'Qobuz & Shazam',
        sourceNoteEn: 'Qobuz & Shazam',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Koppo Mani Bella Les gros ways'),
      },
    ],
  },
  {
    id: 'era-10-2024-izacam',
    eraNumber: '10',
    eraGroup: '2024-2026',
    periodTitleFr: '2024 — « Izacam (Volume 1) » (26 titres) & Singles post-projet',
    periodTitleEn: '2024 — “Izacam (Volume 1)” (26 tracks) & Post-Project Singles',
    subtitleFr: 'Projet publié le 24 mai 2024 (~1 h 38 min) + 2 singles parus en août et novembre 2024',
    subtitleEn: 'Project published May 24, 2024 (~1h 38m) + 2 singles in August & November 2024',
    editorialContextFr:
      'Les 26 morceaux d’« Izacam (Volume 1) » suivent l’ordre de la tracklist publiée sur Stillac. Les pistes 15 et 24 y apparaissent avec des points de suspension : leurs intitulés ne sont pas complétés au hasard. Suivent les deux singles parus après le projet en 2024 (« Çava finir » le 1er août 2024 et « Viviane — Remix » le 4 novembre 2024).',
    editorialContextEn:
      'The 26 tracks of “Izacam (Volume 1)” follow the tracklist order published on Stillac. Tracks 15 and 24 appear with suspension points and are not arbitrarily completed. Followed by the two post-project singles from 2024 (“Çava finir” on August 1, 2024 and “Viviane — Remix” on November 4, 2024).',
    projectSpotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Izacam Volume 1'),
    projectSpotifyLabelFr: 'Izacam (Volume 1) sur Spotify',
    projectSpotifyLabelEn: 'Izacam (Volume 1) on Spotify',
    tracks: [
      {
        id: 'trk-2024-izc-01',
        trackNumber: 1,
        title: 'Mon livre unique de français',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #01',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #01',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Mon livre unique de français'),
      },
      {
        id: 'trk-2024-izc-02',
        trackNumber: 2,
        title: 'Il faut',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #02',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #02',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Il faut'),
      },
      {
        id: 'trk-2024-izc-03',
        trackNumber: 3,
        title: 'Le bon chat',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #03',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #03',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Le bon chat'),
      },
      {
        id: 'trk-2024-izc-04',
        trackNumber: 4,
        title: 'L’amitié',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #04',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #04',
        sourceNoteFr: 'Déjà paru en single le 21 fév. 2023',
        sourceNoteEn: 'Previously released as a single on Feb 21, 2023',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur L’amitié'),
      },
      {
        id: 'trk-2024-izc-05',
        trackNumber: 5,
        title: 'Faut bisser',
        artistsOrCollabFr: 'avec Opinel 21',
        artistsOrCollabEn: 'with Opinel 21',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #05',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #05',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Opinel 21 Faut bisser'),
      },
      {
        id: 'trk-2024-izc-06',
        trackNumber: 6,
        title: 'C’est trop bon',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #06',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #06',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur C’est trop bon'),
      },
      {
        id: 'trk-2024-izc-07',
        trackNumber: 7,
        title: 'Le koki',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #07',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #07',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Le koki'),
      },
      {
        id: 'trk-2024-izc-08',
        trackNumber: 8,
        title: 'Ce n’est plus le quartier',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #08',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #08',
        sourceNoteFr: 'Déjà paru en single le 23 mai 2023',
        sourceNoteEn: 'Previously released as a single on May 23, 2023',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Ce n’est plus le quartier'),
      },
      {
        id: 'trk-2024-izc-09',
        trackNumber: 9,
        title: 'Ça croque dur',
        artistsOrCollabFr: 'avec Lil Peuffy',
        artistsOrCollabEn: 'with Lil Peuffy',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #09',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #09',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Lil Peuffy Ça croque dur'),
      },
      {
        id: 'trk-2024-izc-10',
        trackNumber: 10,
        title: 'C’est Dieu qui va m’élever',
        artistsOrCollabFr: 'avec Tim Kayzer',
        artistsOrCollabEn: 'with Tim Kayzer',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #10',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #10',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Tim Kayzer C’est Dieu qui va m’élever'),
      },
      {
        id: 'trk-2024-izc-11',
        trackNumber: 11,
        title: 'Vu trop de choses',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #11',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #11',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Vu trop de choses'),
      },
      {
        id: 'trk-2024-izc-12',
        trackNumber: 12,
        title: 'Mes sentiments',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #12',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #12',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Mes sentiments'),
      },
      {
        id: 'trk-2024-izc-13',
        trackNumber: 13,
        title: 'Il est calé',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #13',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #13',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Il est calé'),
      },
      {
        id: 'trk-2024-izc-14',
        trackNumber: 14,
        title: 'Le match',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #14',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #14',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Le match'),
      },
      {
        id: 'trk-2024-izc-15',
        trackNumber: 15,
        title: 'Personne ne connaît…',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #15',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #15',
        sourceNoteFr: 'Intitulé exact avec points de suspension sur Stillac',
        sourceNoteEn: 'Exact title with ellipsis on Stillac',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Personne ne connaît'),
      },
      {
        id: 'trk-2024-izc-16',
        trackNumber: 16,
        title: 'Si tu pars',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #16',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #16',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Si tu pars'),
      },
      {
        id: 'trk-2024-izc-17',
        trackNumber: 17,
        title: 'Va à l’école',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #17',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #17',
        sourceNoteFr: 'Lien direct Spotify retrouvé',
        sourceNoteEn: 'Direct Spotify entry confirmed',
        spotifyAction: 'listen_confirmed',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Va à l’école'),
      },
      {
        id: 'trk-2024-izc-18',
        trackNumber: 18,
        title: 'Interlude',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #18',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #18',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Izacam Interlude'),
      },
      {
        id: 'trk-2024-izc-19',
        trackNumber: 19,
        title: 'Le cube',
        artistsOrCollabFr: 'avec Therapie',
        artistsOrCollabEn: 'with Therapie',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #19',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #19',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Therapie Le cube'),
      },
      {
        id: 'trk-2024-izc-20',
        trackNumber: 20,
        title: 'On ne met pas le cœur',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #20',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #20',
        sourceNoteFr: 'Déjà paru en single en juillet 2021',
        sourceNoteEn: 'Previously released as a single in July 2021',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur On ne met pas le cœur'),
      },
      {
        id: 'trk-2024-izc-21',
        trackNumber: 21,
        title: 'Take it slow',
        artistsOrCollabFr: 'avec Magasco',
        artistsOrCollabEn: 'with Magasco',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #21',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #21',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Magasco Take it slow'),
      },
      {
        id: 'trk-2024-izc-22',
        trackNumber: 22,
        title: 'Tu tapes seulement',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #22',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #22',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Tu tapes seulement'),
      },
      {
        id: 'trk-2024-izc-23',
        trackNumber: 23,
        title: 'Théorie du danger',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #23',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #23',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Théorie du danger'),
      },
      {
        id: 'trk-2024-izc-24',
        trackNumber: 24,
        title: 'Elle a une…',
        artistsOrCollabFr: 'avec Dilo Sog',
        artistsOrCollabEn: 'with Dilo Sog',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #24',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #24',
        sourceNoteFr: 'Intitulé exact avec points de suspension sur Stillac',
        sourceNoteEn: 'Exact title with ellipsis on Stillac',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Dilo Sog Elle a une'),
      },
      {
        id: 'trk-2024-izc-25',
        trackNumber: 25,
        title: 'Le gésier',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #25',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #25',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Le gésier'),
      },
      {
        id: 'trk-2024-izc-26',
        trackNumber: 26,
        title: 'Hypocrite',
        dateOrPeriodFr: '24 mai 2024 · Izacam (Vol. 1) #26',
        dateOrPeriodEn: 'May 24, 2024 · Izacam (Vol. 1) #26',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Hypocrite'),
      },
      {
        id: 'trk-2024-cava-finir',
        title: 'Çava finir',
        dateOrPeriodFr: '1er août 2024 (Single post-projet)',
        dateOrPeriodEn: 'August 1, 2024 (Post-project single)',
        sourceNoteFr: 'Qobuz & Shazam',
        sourceNoteEn: 'Qobuz & Shazam',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur Çava finir'),
      },
      {
        id: 'trk-2024-viviane-remix',
        title: 'Viviane — Remix',
        artistsOrCollabFr: 'avec notamment Prince Aimé, Magasco, Lili Anoma et Thérapie',
        artistsOrCollabEn: 'featuring Prince Aimé, Magasco, Lili Anoma, and Thérapie',
        dateOrPeriodFr: '4 novembre 2024 (Single post-projet)',
        dateOrPeriodEn: 'November 4, 2024 (Post-project single)',
        sourceNoteFr: 'Qobuz & Shazam',
        sourceNoteEn: 'Qobuz & Shazam',
        spotifyAction: 'search',
        spotifyUrl: buildSpotifySearchUrl('Viviane Remix Prince Aimé Magasco Maahlox Lili Anoma Thérapie'),
      },
    ],
  },
  {
    id: 'era-11-2026-john-wick',
    eraNumber: '11',
    eraGroup: '2024-2026',
    periodTitleFr: '2026 — Sortie récente retrouvée',
    periodTitleEn: '2026 — Documented Recent Release',
    subtitleFr: '23 juillet 2026 (Qobuz, Soundcharts & Spotify)',
    subtitleEn: 'July 23, 2026 (Qobuz, Soundcharts & Spotify)',
    editorialContextFr:
      'La date du 23 juillet 2026 est confirmée par Qobuz et Soundcharts ; Spotify référence la piste sous le titre « John wick - Seul contre tous ».',
    editorialContextEn:
      'The July 23, 2026 date is confirmed by Qobuz and Soundcharts; Spotify indexes the track under the title “John wick - Seul contre tous”.',
    tracks: [
      {
        id: 'trk-2026-john-wick',
        title: 'John wick — Seul contre tous',
        dateOrPeriodFr: '23 juillet 2026',
        dateOrPeriodEn: 'July 23, 2026',
        sourceNoteFr: 'Confirmé par Qobuz, Soundcharts & Spotify',
        sourceNoteEn: 'Confirmed by Qobuz, Soundcharts & Spotify',
        spotifyAction: 'listen_confirmed',
        spotifyUrl: buildSpotifySearchUrl('Maahlox Le Vibeur John wick Seul contre tous'),
      },
    ],
  },
];

export interface OptionalAudioConfig {
  isEnabled: boolean;
  tracks: {
    id: string;
    title: string;
    audioUrl: string;
    durationSeconds: number;
  }[];
}

export const optionalAudioConfig: OptionalAudioConfig = {
  isEnabled: false,
  tracks: [],
};
