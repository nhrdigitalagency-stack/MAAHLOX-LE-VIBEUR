export type GalleryCategory = 'scene' | 'portraits' | 'studio';

export interface GalleryMediaItem {
  id: string;
  src: string;
  category: GalleryCategory;
  categoryLabelFr: string;
  categoryLabelEn: string;
  titleFr: string;
  titleEn: string;
  captionFr: string;
  captionEn: string;
  altFr: string;
  altEn: string;
  creditFr: string;
  creditEn: string;
  authorizationNoteFr: string;
  authorizationNoteEn: string;
  width: number;
  height: number;
  aspectRatioClass: string;
  gridSpanClass: string;
}

export const galleryData: GalleryMediaItem[] = [
  {
    id: 'gallery-stage-monumental',
    src: '/assets/aistudio/Gemini_Generated_Image_xpmhwxxpmhwxxpmh_d9aba250.jpg',
    category: 'scene',
    categoryLabelFr: 'Scène',
    categoryLabelEn: 'Stage',
    titleFr: 'Performance live en plein air',
    titleEn: 'Open-air live performance',
    captionFr: 'Maahlox Le Vibeur au microphone sur scène, entouré de fumée scénique et de son équipe.',
    captionEn: 'Maahlox Le Vibeur at the microphone on stage, surrounded by stage smoke and his crew.',
    altFr: 'Maahlox Le Vibeur sur scène tenant le microphone, vêtu d’une veste sombre sur un maillot numéro 47',
    altEn: 'Maahlox Le Vibeur on stage holding the microphone, wearing a dark jacket over a number 47 jersey',
    creditFr: 'Archive fournie pour le concept · Crédit photographe à confirmer avant publication officielle',
    creditEn: 'Archive provided for the concept · Photographer credit to be confirmed before official publication',
    authorizationNoteFr: 'Média fourni dans le brief projet — droits d’exploitation publique à valider.',
    authorizationNoteEn: 'Media provided in project brief — public usage rights to be validated.',
    width: 1920,
    height: 1080,
    aspectRatioClass: 'aspect-[16/9]',
    gridSpanClass: 'md:col-span-8',
  },
  {
    id: 'gallery-portrait-bomber',
    src: '/assets/aistudio/images__7__25a61c6f.jpg',
    category: 'portraits',
    categoryLabelFr: 'Portraits',
    categoryLabelEn: 'Portraits',
    titleFr: 'Portrait studio — Blouson blanc',
    titleEn: 'Studio portrait — White bomber jacket',
    captionFr: 'Cadrage serré mettant en valeur l’attitude frontale et les codes vestimentaires urbains.',
    captionEn: 'Tight framing highlighting his direct attitude and urban styling.',
    altFr: 'Portrait rapproché de Maahlox Le Vibeur portant un blouson blanc à écussons et des lunettes sombres',
    altEn: 'Close-up portrait of Maahlox Le Vibeur wearing a white patched bomber jacket and dark sunglasses',
    creditFr: 'Archive fournie pour le concept · Crédit photographe à confirmer',
    creditEn: 'Archive provided for the concept · Photographer credit to be confirmed',
    authorizationNoteFr: 'Média fourni dans le brief projet — droits d’exploitation publique à valider.',
    authorizationNoteEn: 'Media provided in project brief — public usage rights to be validated.',
    width: 900,
    height: 900,
    aspectRatioClass: 'aspect-square',
    gridSpanClass: 'md:col-span-4',
  },
  {
    id: 'gallery-studio-session',
    src: '/assets/aistudio/images__4__9e28e9d7.jpg',
    category: 'studio',
    categoryLabelFr: 'Sessions créatives',
    categoryLabelEn: 'Creative sessions',
    titleFr: 'Session studio & prise de voix',
    titleEn: 'Studio session & vocal take',
    captionFr: 'Enregistrement et intervention au microphone avec casque de monitoring.',
    captionEn: 'Recording and microphone session with studio monitoring headphones.',
    altFr: 'Maahlox Le Vibeur avec un casque audio sur les oreilles devant un microphone de studio',
    altEn: 'Maahlox Le Vibeur wearing studio headphones in front of a condenser microphone',
    creditFr: 'Archive fournie pour le concept · Crédit photographe à confirmer',
    creditEn: 'Archive provided for the concept · Photographer credit to be confirmed',
    authorizationNoteFr: 'Média fourni dans le brief projet — droits d’exploitation publique à valider.',
    authorizationNoteEn: 'Media provided in project brief — public usage rights to be validated.',
    width: 1200,
    height: 750,
    aspectRatioClass: 'aspect-[16/10]',
    gridSpanClass: 'md:col-span-4',
  },
  {
    id: 'gallery-portrait-street',
    src: '/assets/aistudio/fb_img_1568203609271283963966_d63cb506.jpg',
    category: 'portraits',
    categoryLabelFr: 'Portraits',
    categoryLabelEn: 'Portraits',
    titleFr: 'Séquence urbaine',
    titleEn: 'Urban sequence',
    captionFr: 'Portrait pris en extérieur, fidèle à l’énergie directe associée à son parcours.',
    captionEn: 'Outdoor portrait reflecting the direct urban energy associated with his journey.',
    altFr: 'Portrait extérieur de Maahlox Le Vibeur portant des lunettes de soleil, t-shirt noir et sac à dos',
    altEn: 'Outdoor portrait of Maahlox Le Vibeur wearing sunglasses, black t-shirt, and backpack',
    creditFr: 'Archive fournie pour le concept · Crédit photographe à confirmer',
    creditEn: 'Archive provided for the concept · Photographer credit to be confirmed',
    authorizationNoteFr: 'Média fourni dans le brief projet — droits d’exploitation publique à valider.',
    authorizationNoteEn: 'Media provided in project brief — public usage rights to be validated.',
    width: 1080,
    height: 750,
    aspectRatioClass: 'aspect-[4/3]',
    gridSpanClass: 'md:col-span-4',
  },
  {
    id: 'gallery-portrait-editorial',
    src: '/assets/aistudio/images__5__ee4918e4.jpg',
    category: 'portraits',
    categoryLabelFr: 'Portraits',
    categoryLabelEn: 'Portraits',
    titleFr: 'Portrait en intérieur',
    titleEn: 'Indoor portrait',
    captionFr: 'Pose détendue en intérieur, regard cadré derrière des verres teintés.',
    captionEn: 'Relaxed indoor pose framed behind tinted lenses.',
    altFr: 'Maahlox Le Vibeur assis sur un fauteuil en intérieur, portant un t-shirt noir et une chaîne',
    altEn: 'Maahlox Le Vibeur seated in an armchair indoors, wearing a black t-shirt and chain',
    creditFr: 'Archive fournie pour le concept (mention visuelle ERIC sur l’archive) · Droits à vérifier',
    creditEn: 'Archive provided for the concept (visual mark ERIC on archive) · Rights to be verified',
    authorizationNoteFr: 'Média fourni dans le brief projet — droits d’exploitation publique à valider.',
    authorizationNoteEn: 'Media provided in project brief — public usage rights to be validated.',
    width: 1080,
    height: 750,
    aspectRatioClass: 'aspect-[4/3]',
    gridSpanClass: 'md:col-span-4',
  },
];
