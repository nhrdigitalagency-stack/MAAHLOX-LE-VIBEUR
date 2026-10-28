export interface VideoClip {
  id: string;
  title: string;
  featuredNoteFr: string;
  featuredNoteEn: string;
  collaborationFr: string | null;
  collaborationEn: string | null;
  contextPeriodFr: string;
  contextPeriodEn: string;
  isPrimaryHighlight: boolean;
  posterImagePath: string;
  posterImageAltFr: string;
  posterImageAltEn: string;
  youtubeVideoId: string | null;
  externalSearchUrl: string;
}

export const videosData: VideoClip[] = [
  {
    id: 'ca-sort-comme-ca-sort-clip',
    title: 'Ça sort comme ça sort',
    featuredNoteFr: 'Sélection principale · Répertoire emblématique (2015–2017)',
    featuredNoteEn: 'Primary selection · Signature repertoire (2015–2017)',
    collaborationFr: null,
    collaborationEn: null,
    contextPeriodFr: 'Période 2015–2017 · Projet « Ça sort comme ça sort »',
    contextPeriodEn: '2015–2017 Period · Project “Ça sort comme ça sort”',
    isPrimaryHighlight: true,
    posterImagePath: '/assets/aistudio/Gemini_Generated_Image_xpmhwxxpmhwxxpmh_d9aba250.jpg',
    posterImageAltFr: 'Maahlox Le Vibeur en performance sur scène avec microphone',
    posterImageAltEn: 'Maahlox Le Vibeur performing live on stage with microphone',
    youtubeVideoId: null,
    externalSearchUrl:
      'https://www.youtube.com/results?search_query=Maahlox+Le+Vibeur+Ca+sort+comme+ca+sort+clip+officiel',
  },
  {
    id: 'tu-montes-tu-descends-clip',
    title: 'Tu montes tu descends',
    featuredNoteFr: 'Titre phare du parcours (2015–2017)',
    featuredNoteEn: 'Flagship track of the 2015–2017 period',
    collaborationFr: null,
    collaborationEn: null,
    contextPeriodFr: 'Sélection de titres documentés',
    contextPeriodEn: 'Documented track selection',
    isPrimaryHighlight: false,
    posterImagePath: '/assets/aistudio/images__7__25a61c6f.jpg',
    posterImageAltFr: 'Portrait de Maahlox Le Vibeur en blouson blanc',
    posterImageAltEn: 'Portrait of Maahlox Le Vibeur in a white bomber jacket',
    youtubeVideoId: null,
    externalSearchUrl:
      'https://www.youtube.com/results?search_query=Maahlox+Le+Vibeur+Tu+montes+tu+descends+clip+officiel',
  },
  {
    id: 'tu-as-combien-clip',
    title: 'Tu as combien',
    featuredNoteFr: 'Sélection musicale · Séquence 2015–2017',
    featuredNoteEn: 'Musical selection · 2015–2017 Sequence',
    collaborationFr: null,
    collaborationEn: null,
    contextPeriodFr: 'Sélection de titres documentés',
    contextPeriodEn: 'Documented track selection',
    isPrimaryHighlight: false,
    posterImagePath: '/assets/aistudio/images__5__ee4918e4.jpg',
    posterImageAltFr: 'Portrait de Maahlox Le Vibeur portant des lunettes teintées',
    posterImageAltEn: 'Portrait of Maahlox Le Vibeur wearing tinted sunglasses',
    youtubeVideoId: null,
    externalSearchUrl:
      'https://www.youtube.com/results?search_query=Maahlox+Le+Vibeur+Tu+as+combien+clip+officiel',
  },
  {
    id: 'prends-seulement-ta-part-clip',
    title: 'Prends seulement ta part',
    featuredNoteFr: 'Titre éponyme du projet paru en mars 2019',
    featuredNoteEn: 'Title track of the project released in March 2019',
    collaborationFr: null,
    collaborationEn: null,
    contextPeriodFr: 'Projet « Prends seulement ta part » (2019)',
    contextPeriodEn: 'Project “Prends seulement ta part” (2019)',
    isPrimaryHighlight: false,
    posterImagePath: '/assets/aistudio/fb_img_1568203609271283963966_d63cb506.jpg',
    posterImageAltFr: 'Maahlox Le Vibeur en portrait extérieur',
    posterImageAltEn: 'Maahlox Le Vibeur in an outdoor portrait',
    youtubeVideoId: null,
    externalSearchUrl:
      'https://www.youtube.com/results?search_query=Maahlox+Le+Vibeur+Prends+seulement+ta+part+clip+officiel',
  },
  {
    id: 'tuer-pour-tuer-phil-b',
    title: 'Tuer pour tuer',
    featuredNoteFr: 'Collaboration documentée par publication vidéo sur YouTube',
    featuredNoteEn: 'Collaboration documented via YouTube video release',
    collaborationFr: 'Avec Phil-B',
    collaborationEn: 'With Phil-B',
    contextPeriodFr: 'Répertoire collaboratif documenté',
    contextPeriodEn: 'Documented collaborative repertoire',
    isPrimaryHighlight: false,
    posterImagePath: '/assets/aistudio/images__4__9e28e9d7.jpg',
    posterImageAltFr: 'Maahlox Le Vibeur en studio devant un microphone',
    posterImageAltEn: 'Maahlox Le Vibeur in a studio in front of a microphone',
    youtubeVideoId: null,
    externalSearchUrl:
      'https://www.youtube.com/results?search_query=Maahlox+Le+Vibeur+Phil-B+Tuer+pour+tuer',
  },
];
