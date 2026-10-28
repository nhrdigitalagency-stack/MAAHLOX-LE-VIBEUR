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
    platform: string;
    url: string;
    labelFr: string;
    labelEn: string;
  }[];
  creditsFr: string | null;
}

export const releasesData: ReleaseProject[] = [
  {
    id: 'traumatiser-2013',
    title: 'Traumatiser',
    year: '2013',
    releaseDateNoteFr: 'Référencé en 2013',
    releaseDateNoteEn: 'Referenced in 2013',
    roleInTimelineFr: 'Chapitre des débuts dans la chronologie discographique.',
    roleInTimelineEn: 'Early milestone in the documented discography.',
    descriptionFr:
      'Premier projet référencé après la révélation de « La bière c’est combien ici ? ». Il marque l’ancrage de Maahlox Le Vibeur dans le paysage urbain camerounais du début des années 2010.',
    descriptionEn:
      'First referenced project following the breakthrough of “La bière c’est combien ici ?”, marking Maahlox Le Vibeur’s anchorage in the early-2010s Cameroonian urban scene.',
    documentedDetailsFr: [
      'Année de référence : 2013',
      'Période associée aux titres « Je t’aime », « Kokoko » et « Traumatiser » (avec Koppo)',
    ],
    documentedDetailsEn: [
      'Reference year: 2013',
      'Era associated with tracks “Je t’aime”, “Kokoko”, and “Traumatiser” (featuring Koppo)',
    ],
    documentedTracksFr: ['Je t’aime', 'Kokoko', 'Traumatiser (avec Koppo)'],
    documentedTracksEn: ['Je t’aime', 'Kokoko', 'Traumatiser (with Koppo)'],
    officialCoverPath: null,
    typographicPosterCode: {
      indexNumber: 'PROJ. 01',
      shortCode: 'TRM / 13',
      accentColor: '#FF5A1F',
    },
    verifiedListenLinks: [
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
    releaseDateNoteFr: 'Paru en 2017',
    releaseDateNoteEn: 'Released in 2017',
    roleInTimelineFr: 'Projet mis en avant dans la sélection musicale.',
    roleInTimelineEn: 'Featured project in the musical selection.',
    descriptionFr:
      'Recensé comme album dans les sources consultées, ce projet s’inscrit dans la séquence 2015–2017 durant laquelle plusieurs morceaux élargissent son audience auprès du public.',
    descriptionEn:
      'Cataloged as an album in consulted sources, this project anchors the 2015–2017 sequence during which several flagship tracks broadened his public audience.',
    documentedDetailsFr: [
      'Année de parution : 2017',
      'Format recensé dans les sources consultées : Album',
      'Période associée aux titres « Ça sort comme ça sort », « Tu montes tu descends » et « Tu as combien »',
    ],
    documentedDetailsEn: [
      'Release year: 2017',
      'Format listed in consulted sources: Album',
      'Period associated with “Ça sort comme ça sort”, “Tu montes tu descends”, and “Tu as combien”',
    ],
    documentedTracksFr: ['Ça sort comme ça sort', 'Tu montes tu descends', 'Tu as combien'],
    documentedTracksEn: ['Ça sort comme ça sort', 'Tu montes tu descends', 'Tu as combien'],
    officialCoverPath: null,
    typographicPosterCode: {
      indexNumber: 'PROJ. 02',
      shortCode: 'CSCS / 17',
      accentColor: '#FF5A1F',
    },
    verifiedListenLinks: [
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
    year: '2019',
    releaseDateNoteFr: 'Paru en mars 2019',
    releaseDateNoteEn: 'Released in March 2019',
    roleInTimelineFr: 'Carte album et étape majeure du parcours.',
    roleInTimelineEn: 'Key album milestone in his career trajectory.',
    descriptionFr:
      'Publié en mars 2019 et présenté comme un album réunissant vingt titres par ProfileAbility, ce projet consolide son registre direct et festif.',
    descriptionEn:
      'Published in March 2019 and presented as a twenty-track album by ProfileAbility, this project consolidates his direct and festive style.',
    documentedDetailsFr: [
      'Date de publication : Mars 2019',
      'Volume documenté : Présenté comme un album de 20 titres (source : ProfileAbility)',
    ],
    documentedDetailsEn: [
      'Publication date: March 2019',
      'Documented volume: Presented as a 20-track album (source: ProfileAbility)',
    ],
    documentedTracksFr: ['Prends seulement ta part'],
    documentedTracksEn: ['Prends seulement ta part'],
    officialCoverPath: null,
    typographicPosterCode: {
      indexNumber: 'PROJ. 03',
      shortCode: 'PSTP / 19',
      accentColor: '#DFFF00',
    },
    verifiedListenLinks: [
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
    releaseDateNoteFr: 'Paru en 2024',
    releaseDateNoteEn: 'Released in 2024',
    roleInTimelineFr: 'Projet présenté dans la discographie documentée.',
    roleInTimelineEn: 'Project featured in the documented discography.',
    descriptionFr:
      'Mentionné dans sa biographie sur Deezer en 2024, « Izacam (Volume 1) » prolonge le parcours discographique de Maahlox Le Vibeur fidèle à son écriture frontale.',
    descriptionEn:
      'Mentioned in his Deezer biography in 2024, “Izacam (Volume 1)” extends Maahlox Le Vibeur’s discography with his signature outspoken delivery.',
    documentedDetailsFr: [
      'Année de parution : 2024',
      'Référence documentaire : Biographie artiste sur Deezer',
    ],
    documentedDetailsEn: [
      'Release year: 2024',
      'Documentary reference: Artist biography on Deezer',
    ],
    documentedTracksFr: [],
    documentedTracksEn: [],
    officialCoverPath: null,
    typographicPosterCode: {
      indexNumber: 'PROJ. 04',
      shortCode: 'IZC1 / 24',
      accentColor: '#FF5A1F',
    },
    verifiedListenLinks: [
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
