export interface BiographyChapter {
  id: string;
  number: string;
  periodFr: string;
  periodEn: string;
  title: {
    fr: string;
    en: string;
  };
  subtitle: {
    fr: string;
    en: string;
  };
  body: {
    fr: string;
    en: string;
  };
  documentedFactsFr: string[];
  documentedFactsEn: string[];
  imagePath: string;
  imageAltFr: string;
  imageAltEn: string;
  imageCaptionFr: string;
  imageCaptionEn: string;
}

export interface ArtistProfile {
  stageName: string;
  civilName: string;
  civilNameAltOrder: string;
  birthDateISO: string;
  birthDateFormattedFr: string;
  birthDateFormattedEn: string;
  birthPlaceFr: string;
  birthPlaceEn: string;
  anchorageFr: string;
  anchorageEn: string;
  activityFr: string;
  activityEn: string;
  universeKeywordsFr: string[];
  universeKeywordsEn: string[];
  shortBioFr: string;
  shortBioEn: string;
  longBioParagraphsFr: string[];
  longBioParagraphsEn: string[];
  chapters: BiographyChapter[];
  repertoireSelection: {
    title: string;
    noteFr?: string;
    noteEn?: string;
    yearContextFr?: string;
    yearContextEn?: string;
  }[];
}

export const artistData: ArtistProfile = {
  stageName: 'Maahlox Le Vibeur',
  civilName: 'Jean-Jules Kenfack',
  civilNameAltOrder: 'Kenfack Jean Jules',
  birthDateISO: '1990-01-16',
  birthDateFormattedFr: '16 janvier 1990',
  birthDateFormattedEn: 'January 16, 1990',
  birthPlaceFr: 'Yaoundé, Cameroun',
  birthPlaceEn: 'Yaoundé, Cameroon',
  anchorageFr: 'Quartier Obili, Yaoundé',
  anchorageEn: 'Obili District, Yaoundé',
  activityFr: 'Rappeur et chanteur camerounais',
  activityEn: 'Cameroonian rapper and singer',
  universeKeywordsFr: [
    'Musique urbaine',
    'Expression directe',
    'Énergie festive',
    'Ton provocateur',
  ],
  universeKeywordsEn: [
    'Urban music',
    'Direct expression',
    'Festive energy',
    'Provocative tone',
  ],
  shortBioFr:
    'Maahlox Le Vibeur, de son vrai nom Jean-Jules Kenfack, est un rappeur et chanteur camerounais né le 16 janvier 1990 à Yaoundé. Associé au quartier Obili, il développe un univers musical direct, festif et provocateur. Révélé auprès d’un large public au début des années 2010, il construit son parcours autour de titres comme « La bière c’est combien ici ? », « Ça sort comme ça sort » et « Tu montes tu descends ».',
  shortBioEn:
    'Maahlox Le Vibeur, born Jean-Jules Kenfack on January 16, 1990, in Yaoundé, is a Cameroonian rapper and singer. Closely associated with the Obili neighborhood, he has built a direct, festive, and provocative musical universe. Rising to wider public attention in the early 2010s, his journey is anchored by tracks such as “La bière c’est combien ici ?”, “Ça sort comme ça sort”, and “Tu montes tu descends”.',
  longBioParagraphsFr: [
    'Né à Yaoundé le 16 janvier 1990, Jean-Jules Kenfack, connu sous le nom de Maahlox Le Vibeur, est un rappeur et chanteur camerounais dont le parcours est étroitement associé au quartier Obili. Son identité artistique repose sur une expression directe, un ton provocateur et une musique tournée vers l’énergie collective et la fête.',
    'Il se fait connaître au début des années 2010 avec « La bière c’est combien ici ? ». Sa discographie se développe ensuite avec « Traumatiser », référencé en 2013, puis « Ça sort comme ça sort », paru en 2017. Des morceaux tels que « Tu montes tu descends » et « Tu as combien » comptent parmi les titres mis en avant dans les présentations de son parcours.',
    'En mars 2019, il publie « Prends seulement ta part », un album présenté comme réunissant vingt titres. Sa collaboration avec Phil-B autour de « Tuer pour tuer » figure également parmi les éléments documentés de son répertoire.',
    'En 2024, « Izacam (Volume 1) » vient enrichir sa discographie. À travers ces différents projets, Maahlox Le Vibeur affirme une identité reconnaissable dans la musique urbaine camerounaise, portée par son langage frontal et son univers festif.',
  ],
  longBioParagraphsEn: [
    'Born in Yaoundé on January 16, 1990, Jean-Jules Kenfack, known professionally as Maahlox Le Vibeur, is a Cameroonian rapper and singer whose career is closely tied to the Obili district. His artistic identity rests on direct expression, a provocative register, and music driven by collective energy and celebration.',
    'He first gained public recognition in the early 2010s with “La bière c’est combien ici ?”. His discography subsequently expanded with “Traumatiser”, referenced in 2013, followed by “Ça sort comme ça sort”, released in 2017. Tracks such as “Tu montes tu descends” and “Tu as combien” are among the key songs highlighted throughout his career.',
    'In March 2019, he released “Prends seulement ta part”, an album presented as bringing together twenty tracks. His collaboration with Phil-B on “Tuer pour tuer” is also among the documented works in his repertoire.',
    'In 2024, “Izacam (Volume 1)” further enriched his discography. Across these projects, Maahlox Le Vibeur has established a distinctive voice in Cameroonian urban music, carried by his outspoken language and festive sound.',
  ],
  chapters: [
    {
      id: 'yaounde-obili',
      number: '01',
      periodFr: 'Origines · 1990',
      periodEn: 'Origins · 1990',
      title: {
        fr: 'Yaoundé / Obili',
        en: 'Yaoundé / Obili',
      },
      subtitle: {
        fr: 'Ancrage urbain et naissance d’une signature vocale directe',
        en: 'Urban anchorage and birth of a direct vocal signature',
      },
      body: {
        fr: 'Né à Yaoundé le 16 janvier 1990, Jean-Jules Kenfack, connu sous le nom de Maahlox Le Vibeur, est un rappeur et chanteur camerounais dont le parcours est étroitement associé au quartier Obili. Son identité artistique repose sur une expression directe, un ton provocateur et une musique tournée vers l’énergie collective et la fête.',
        en: 'Born in Yaoundé on January 16, 1990, Jean-Jules Kenfack, known as Maahlox Le Vibeur, is a Cameroonian rapper and singer whose path is closely associated with the Obili neighborhood. His artistic identity relies on direct expression, a provocative tone, and music built for collective celebration.',
      },
      documentedFactsFr: [
        'Nom civil : Jean-Jules Kenfack (Kenfack Jean Jules)',
        'Naissance : 16 janvier 1990 à Yaoundé, Cameroun',
        'Ancrage territorial : Quartier Obili, Yaoundé',
      ],
      documentedFactsEn: [
        'Civil name: Jean-Jules Kenfack (Kenfack Jean Jules)',
        'Birth: January 16, 1990 in Yaoundé, Cameroon',
        'Local anchorage: Obili District, Yaoundé',
      ],
      imagePath: '/assets/aistudio/fb_img_1568203609271283963966_d63cb506.jpg',
      imageAltFr: 'Portrait urbain de Maahlox Le Vibeur portant des lunettes noires et un t-shirt noir',
      imageAltEn: 'Urban portrait of Maahlox Le Vibeur wearing dark sunglasses and a black t-shirt',
      imageCaptionFr: 'Ancrage urbain · Yaoundé, Cameroun',
      imageCaptionEn: 'Urban anchorage · Yaoundé, Cameroon',
    },
    {
      id: 'premiers-reperes',
      number: '02',
      periodFr: 'Début des années 2010 · 2013',
      periodEn: 'Early 2010s · 2013',
      title: {
        fr: 'Les premiers repères',
        en: 'First Milestones',
      },
      subtitle: {
        fr: 'De « La bière c’est combien ici ? » au projet « Traumatiser »',
        en: 'From “La bière c’est combien ici ?” to “Traumatiser”',
      },
      body: {
        fr: 'Il se fait connaître au début des années 2010 avec « La bière c’est combien ici ? », dont la plateforme Deezer situe la révélation en 2012. Sa discographie se développe ensuite avec « Traumatiser », référencé en 2013 ; les titres documentés de cette période comprennent notamment « Je t’aime », « Kokoko » et « Traumatiser », avec Koppo.',
        en: 'He gained recognition in the early 2010s with “La bière c’est combien ici ?”, dated to 2012 on Deezer. His discography then developed with “Traumatiser”, referenced in 2013; documented tracks from this period include “Je t’aime”, “Kokoko”, and “Traumatiser” featuring Koppo.',
      },
      documentedFactsFr: [
        'Début des années 2010 (révélation située en 2012 sur Deezer) : « La bière c’est combien ici ? »',
        '2013 : Projet « Traumatiser »',
        'Titres documentés sur cette période : « Je t’aime », « Kokoko », « Traumatiser » (avec Koppo)',
      ],
      documentedFactsEn: [
        'Early 2010s (breakthrough dated 2012 on Deezer): “La bière c’est combien ici ?”',
        '2013: Project “Traumatiser”',
        'Documented tracks from this era: “Je t’aime”, “Kokoko”, “Traumatiser” (with Koppo)',
      ],
      imagePath: '/assets/aistudio/images__4__9e28e9d7.jpg',
      imageAltFr: 'Maahlox Le Vibeur en session studio avec casque et microphone',
      imageAltEn: 'Maahlox Le Vibeur in a studio session with headphones and microphone',
      imageCaptionFr: 'Prise de voix et travail en studio',
      imageCaptionEn: 'Vocal recording and studio session',
    },
    {
      id: 'ca-sort-comme-ca-sort',
      number: '03',
      periodFr: '2015 – 2017',
      periodEn: '2015 – 2017',
      title: {
        fr: 'Ça sort comme ça sort',
        en: 'Ça sort comme ça sort',
      },
      subtitle: {
        fr: 'Titres fédérateurs et structuration discographique en 2017',
        en: 'Unifying tracks and album release in 2017',
      },
      body: {
        fr: 'Entre 2015 et 2017, plusieurs titres participent à son identification auprès du public, notamment « Ça sort comme ça sort », « Tu montes tu descends » et « Tu as combien ». En 2017 paraît le projet « Ça sort comme ça sort », recensé comme album dans les sources consultées.',
        en: 'Between 2015 and 2017, several tracks cemented his popularity with audiences, notably “Ça sort comme ça sort”, “Tu montes tu descends”, and “Tu as combien”. In 2017, the project “Ça sort comme ça sort” was released and cataloged as an album in consulted sources.',
      },
      documentedFactsFr: [
        '2015–2017 : Diffusion de « Ça sort comme ça sort », « Tu montes tu descends » et « Tu as combien »',
        '2017 : Sortie du projet « Ça sort comme ça sort » (recensé comme album)',
      ],
      documentedFactsEn: [
        '2015–2017: Release of “Ça sort comme ça sort”, “Tu montes tu descends”, and “Tu as combien”',
        '2017: Release of the project “Ça sort comme ça sort” (listed as an album)',
      ],
      imagePath: '/assets/aistudio/images__5__ee4918e4.jpg',
      imageAltFr: 'Portrait de Maahlox Le Vibeur assis, portant des lunettes teintées et une chaîne',
      imageAltEn: 'Portrait of Maahlox Le Vibeur seated, wearing tinted sunglasses and a chain',
      imageCaptionFr: 'Portrait éditorial · Période « Ça sort comme ça sort »',
      imageCaptionEn: 'Editorial portrait · “Ça sort comme ça sort” era',
    },
    {
      id: 'prends-seulement-ta-part',
      number: '04',
      periodFr: 'Mars 2019',
      periodEn: 'March 2019',
      title: {
        fr: 'Prends seulement ta part',
        en: 'Prends seulement ta part',
      },
      subtitle: {
        fr: 'Un projet de vingt titres et des collaborations remarquées',
        en: 'A twenty-track project and documented collaborations',
      },
      body: {
        fr: 'En mars 2019, il publie « Prends seulement ta part », un album présenté comme réunissant vingt titres par ProfileAbility. Sa collaboration avec Phil-B autour de « Tuer pour tuer » figure également parmi les éléments documentés de son répertoire.',
        en: 'In March 2019, he released “Prends seulement ta part”, presented as a twenty-track album by ProfileAbility. His collaboration with Phil-B on “Tuer pour tuer” also stands among the documented entries in his repertoire.',
      },
      documentedFactsFr: [
        'Mars 2019 : Publication du projet « Prends seulement ta part » (présenté comme un album de 20 titres)',
        'Collaboration documentée : « Tuer pour tuer », avec Phil-B',
      ],
      documentedFactsEn: [
        'March 2019: Publication of “Prends seulement ta part” (presented as a 20-track album)',
        'Documented collaboration: “Tuer pour tuer”, with Phil-B',
      ],
      imagePath: '/assets/aistudio/images__7__25a61c6f.jpg',
      imageAltFr: 'Portrait de Maahlox Le Vibeur portant un blouson blanc à écussons et des lunettes noires',
      imageAltEn: 'Portrait of Maahlox Le Vibeur wearing a white patched bomber jacket and dark sunglasses',
      imageCaptionFr: 'Esthétique frontale · Répertoire 2019',
      imageCaptionEn: 'Direct aesthetic · 2019 Repertoire',
    },
    {
      id: 'izacam',
      number: '05',
      periodFr: '2024',
      periodEn: '2024',
      title: {
        fr: 'Izacam',
        en: 'Izacam',
      },
      subtitle: {
        fr: 'Continuité discographique avec « Izacam (Volume 1) »',
        en: 'Discographic continuity with “Izacam (Volume 1)”',
      },
      body: {
        fr: 'En 2024, « Izacam (Volume 1) » vient enrichir sa discographie, tel que mentionné dans sa biographie sur Deezer. À travers ces différents projets, Maahlox Le Vibeur affirme une identité reconnaissable dans la musique urbaine camerounaise, portée par son langage frontal et son univers festif.',
        en: 'In 2024, “Izacam (Volume 1)” expanded his discography, as referenced in his Deezer biography. Across these projects, Maahlox Le Vibeur affirms a recognizable identity in Cameroonian urban music, driven by his outspoken delivery and festive spirit.',
      },
      documentedFactsFr: [
        '2024 : Sortie du projet « Izacam (Volume 1) » (référencé sur Deezer)',
        'Registre constant : Musique urbaine, expression directe et énergie festive',
      ],
      documentedFactsEn: [
        '2024: Release of “Izacam (Volume 1)” (referenced on Deezer)',
        'Consistent register: Urban music, direct expression, and festive energy',
      ],
      imagePath: '/assets/aistudio/Gemini_Generated_Image_xpmhwxxpmhwxxpmh_d9aba250.jpg',
      imageAltFr: 'Maahlox Le Vibeur sur scène au microphone devant un nuage de fumée scénique',
      imageAltEn: 'Maahlox Le Vibeur on stage holding a microphone in front of stage smoke',
      imageCaptionFr: 'Présence scénique · Maahlox Le Vibeur',
      imageCaptionEn: 'Stage presence · Maahlox Le Vibeur',
    },
  ],
  repertoireSelection: [
    {
      title: 'La bière c’est combien ici ?',
      yearContextFr: 'Début des années 2010 (2012)',
      yearContextEn: 'Early 2010s (2012)',
    },
    {
      title: 'Ça sort comme ça sort',
      yearContextFr: '2015–2017',
      yearContextEn: '2015–2017',
    },
    {
      title: 'Tu montes tu descends',
      yearContextFr: '2015–2017',
      yearContextEn: '2015–2017',
    },
    {
      title: 'Tu as combien',
      yearContextFr: '2015–2017',
      yearContextEn: '2015–2017',
    },
    { title: 'Fouillez fouillez' },
    { title: 'L’argent c’est l’argent' },
    { title: 'Les sorciers' },
    {
      title: 'Prends seulement ta part',
      yearContextFr: '2019',
      yearContextEn: '2019',
    },
    { title: 'Mange ta part' },
    {
      title: 'Tuer pour tuer',
      noteFr: 'Avec Phil-B',
      noteEn: 'With Phil-B',
    },
  ],
};
