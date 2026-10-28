import { SiteEnvironmentMode } from './siteConfig';

export type MerchCategory = 'tshirt' | 'hoodie' | 'cap' | 'poster';

export type ProductPublicationStatus = 'published' | 'preview_concept' | 'draft';

export interface MerchColorOption {
  id: string;
  labelFr: string;
  labelEn: string;
  hex: string;
}

export interface SizeGuideRow {
  size: string;
  chestCm: string;
  lengthCm: string;
}

export interface MerchProduct {
  id: string;
  slug: string;
  nameFr: string;
  nameEn: string;
  category: MerchCategory;
  categoryLabelFr: string;
  categoryLabelEn: string;
  descriptionFr: string;
  descriptionEn: string;
  authorizedPhotos: string[]; // Vide tant qu'aucune photo produit réelle n'est fournie
  price: number;
  currency: 'XAF';
  sizes: string[];
  colors: MerchColorOption[];
  // Clé au format `${size}__${colorId}` -> quantité disponible pour le test technique en mode preview
  variantStock: Record<string, number>;
  sizeGuide: SizeGuideRow[] | null;
  fabricCompositionFr: string | null; // null tant que non fourni officiellement (ne pas inventer coton bio, etc.)
  fabricCompositionEn: string | null;
  careInstructionsFr: string | null;
  careInstructionsEn: string | null;
  shippingTermsFr: string;
  shippingTermsEn: string;
  returnPolicyFr: string;
  returnPolicyEn: string;
  publicationStatus: ProductPublicationStatus;
  conceptNoticeFr: string;
  conceptNoticeEn: string;
  graphicCode: {
    editionCode: string;
    frontPrintText: string;
    subPrintText: string;
  };
}

/**
 * Section 8 & 9 : Boutique Merchandising (« Le merch »)
 * - Ne jamais affirmer que ces produits existent déjà.
 * - En mode preview : maquettes clairement identifiées « Concept — non disponible à la vente ».
 * - En mode production : aucun produit fictif (0 produit retourné tant que publicationStatus !== 'published').
 * - Ne jamais inventer : coton biologique, fabrication locale, édition limitée, label éthique, délai de livraison, réduction.
 */
export const productsData: MerchProduct[] = [
  {
    id: 'merch-concept-tshirt-vibration',
    slug: 'tshirt-concept-la-vibration',
    nameFr: 'T-Shirt Studio « La Vibration » (Maquette Concept)',
    nameEn: 'Studio T-Shirt “La Vibration” (Concept Mockup)',
    category: 'tshirt',
    categoryLabelFr: 'T-shirt · Maquette de prévisualisation',
    categoryLabelEn: 'T-shirt · Preview mockup',
    descriptionFr:
      'Maquette de direction artistique pour un t-shirt à coupe droite arborant le marquage typographique « MAAHLOX — OBILI / YAOUNDÉ ». Article de démonstration technique non commercialisé.',
    descriptionEn:
      'Art direction mockup for a straight-cut t-shirt featuring the “MAAHLOX — OBILI / YAOUNDÉ” typographic print. Technical demonstration item not available for commercial sale.',
    authorizedPhotos: [],
    price: 15000,
    currency: 'XAF',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { id: 'charcoal', labelFr: 'Noir Charbon', labelEn: 'Charcoal Black', hex: '#121212' },
      { id: 'ecru', labelFr: 'Blanc Cassé', labelEn: 'Warm Off-White', hex: '#EAE5D9' },
    ],
    variantStock: {
      'S__charcoal': 5,
      'M__charcoal': 8,
      'L__charcoal': 8,
      'XL__charcoal': 4,
      'XXL__charcoal': 0, // Permet de tester l'état indisponible d'une variante
      'S__ecru': 3,
      'M__ecru': 6,
      'L__ecru': 5,
      'XL__ecru': 2,
      'XXL__ecru': 2,
    },
    sizeGuide: [
      { size: 'S', chestCm: '51 cm', lengthCm: '70 cm' },
      { size: 'M', chestCm: '54 cm', lengthCm: '72 cm' },
      { size: 'L', chestCm: '57 cm', lengthCm: '75 cm' },
      { size: 'XL', chestCm: '60 cm', lengthCm: '77 cm' },
      { size: 'XXL', chestCm: '63 cm', lengthCm: '79 cm' },
    ],
    fabricCompositionFr: null, // À fournir par l'équipe (aucune invention de grammage ou coton bio)
    fabricCompositionEn: null,
    careInstructionsFr: null,
    careInstructionsEn: null,
    shippingTermsFr:
      'Modalités, zones et délais d’expédition à confirmer par l’équipe de management avant ouverture des ventes.',
    shippingTermsEn:
      'Shipping terms, zones, and delivery timeframes to be confirmed by management before sales launch.',
    returnPolicyFr:
      'Conditions de retour et d’échange à définir par l’entité commerciale habilitée.',
    returnPolicyEn:
      'Return and exchange policy to be defined by the authorized commercial entity.',
    publicationStatus: 'preview_concept',
    conceptNoticeFr: 'Concept — non disponible à la vente',
    conceptNoticeEn: 'Concept — not available for sale',
    graphicCode: {
      editionCode: 'CONCEPT 01 / TEE',
      frontPrintText: 'MAAHLOX',
      subPrintText: 'YAOUNDÉ · OBILI',
    },
  },
  {
    id: 'merch-concept-hoodie-obili',
    slug: 'hoodie-concept-obili-studio',
    nameFr: 'Hoodie « Obili Studio » (Maquette Concept)',
    nameEn: 'Hoodie “Obili Studio” (Concept Mockup)',
    category: 'hoodie',
    categoryLabelFr: 'Hoodie · Maquette de prévisualisation',
    categoryLabelEn: 'Hoodie · Preview mockup',
    descriptionFr:
      'Proposition graphique de sweat à capuche pensée pour accompagner l’identité visuelle du portfolio. Cet article n’existe pas encore en production et sert à valider l’interface boutique.',
    descriptionEn:
      'Graphic proposal for a hooded sweatshirt designed to match the portfolio visual identity. This item is not in production and serves to validate the shop interface.',
    authorizedPhotos: [],
    price: 28000,
    currency: 'XAF',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { id: 'charcoal', labelFr: 'Noir Charbon', labelEn: 'Charcoal Black', hex: '#121212' },
      { id: 'orange-stage', labelFr: 'Orange Scène', labelEn: 'Stage Orange', hex: '#FF5A1F' },
    ],
    variantStock: {
      'M__charcoal': 6,
      'L__charcoal': 6,
      'XL__charcoal': 4,
      'XXL__charcoal': 2,
      'M__orange-stage': 3,
      'L__orange-stage': 4,
      'XL__orange-stage': 0,
      'XXL__orange-stage': 1,
    },
    sizeGuide: [
      { size: 'M', chestCm: '57 cm', lengthCm: '71 cm' },
      { size: 'L', chestCm: '60 cm', lengthCm: '74 cm' },
      { size: 'XL', chestCm: '63 cm', lengthCm: '76 cm' },
      { size: 'XXL', chestCm: '66 cm', lengthCm: '78 cm' },
    ],
    fabricCompositionFr: null,
    fabricCompositionEn: null,
    careInstructionsFr: null,
    careInstructionsEn: null,
    shippingTermsFr:
      'Modalités, zones et délais d’expédition à confirmer par l’équipe de management avant ouverture des ventes.',
    shippingTermsEn:
      'Shipping terms, zones, and delivery timeframes to be confirmed by management before sales launch.',
    returnPolicyFr:
      'Conditions de retour et d’échange à définir par l’entité commerciale habilitée.',
    returnPolicyEn:
      'Return and exchange policy to be defined by the authorized commercial entity.',
    publicationStatus: 'preview_concept',
    conceptNoticeFr: 'Concept — non disponible à la vente',
    conceptNoticeEn: 'Concept — not available for sale',
    graphicCode: {
      editionCode: 'CONCEPT 02 / HD',
      frontPrintText: 'LE VIBEUR',
      subPrintText: 'STUDIO SPECTRUM',
    },
  },
  {
    id: 'merch-concept-cap-monogram',
    slug: 'casquette-concept-wordmark',
    nameFr: 'Casquette Wordmark « MAAHLOX » (Maquette Concept)',
    nameEn: 'Wordmark Cap “MAAHLOX” (Concept Mockup)',
    category: 'cap',
    categoryLabelFr: 'Casquette · Maquette de prévisualisation',
    categoryLabelEn: 'Cap · Preview mockup',
    descriptionFr:
      'Maquette conceptuelle de casquette structurée à visière courbée avec marquage frontal minimaliste. Présentée uniquement en mode prévisualisation.',
    descriptionEn:
      'Conceptual mockup of a structured cap with minimalist front wordmark. Displayed exclusively in preview mode.',
    authorizedPhotos: [],
    price: 10000,
    currency: 'XAF',
    sizes: ['TU'],
    colors: [
      { id: 'charcoal', labelFr: 'Noir Charbon', labelEn: 'Charcoal Black', hex: '#121212' },
    ],
    variantStock: {
      'TU__charcoal': 10,
    },
    sizeGuide: null,
    fabricCompositionFr: null,
    fabricCompositionEn: null,
    careInstructionsFr: null,
    careInstructionsEn: null,
    shippingTermsFr:
      'Modalités, zones et délais d’expédition à confirmer par l’équipe de management avant ouverture des ventes.',
    shippingTermsEn:
      'Shipping terms, zones, and delivery timeframes to be confirmed by management before sales launch.',
    returnPolicyFr:
      'Conditions de retour et d’échange à définir par l’entité commerciale habilitée.',
    returnPolicyEn:
      'Return and exchange policy to be defined by the authorized commercial entity.',
    publicationStatus: 'preview_concept',
    conceptNoticeFr: 'Concept — non disponible à la vente',
    conceptNoticeEn: 'Concept — not available for sale',
    graphicCode: {
      editionCode: 'CONCEPT 03 / CAP',
      frontPrintText: 'MAAHLOX',
      subPrintText: 'SERIE CONCEPT',
    },
  },
  {
    id: 'merch-concept-poster-affiche',
    slug: 'affiche-concept-vibration-en-grand',
    nameFr: 'Affiche Typographique « La Vibration en Grand » (Maquette Concept)',
    nameEn: 'Typographic Poster “The Vibration at Scale” (Concept Mockup)',
    category: 'poster',
    categoryLabelFr: 'Affiche · Maquette de prévisualisation',
    categoryLabelEn: 'Poster · Preview mockup',
    descriptionFr:
      'Étude d’affiche de concert reprenant la grille typographique du projet web. Maquette non destinée à la vente tant qu’aucune édition physique n’est validée par l’artiste.',
    descriptionEn:
      'Concert poster study based on the web project’s typographic grid. Mockup not for sale until a physical edition is validated by the artist.',
    authorizedPhotos: [],
    price: 8000,
    currency: 'XAF',
    sizes: ['50x70 cm'],
    colors: [
      { id: 'charcoal', labelFr: 'Noir & Orange Scène', labelEn: 'Black & Stage Orange', hex: '#121212' },
    ],
    variantStock: {
      '50x70 cm__charcoal': 12,
    },
    sizeGuide: null,
    fabricCompositionFr: null,
    fabricCompositionEn: null,
    careInstructionsFr: null,
    careInstructionsEn: null,
    shippingTermsFr:
      'Modalités, zones et délais d’expédition à confirmer par l’équipe de management avant ouverture des ventes.',
    shippingTermsEn:
      'Shipping terms, zones, and delivery timeframes to be confirmed by management before sales launch.',
    returnPolicyFr:
      'Conditions de retour et d’échange à définir par l’entité commerciale habilitée.',
    returnPolicyEn:
      'Return and exchange policy to be defined by the authorized commercial entity.',
    publicationStatus: 'preview_concept',
    conceptNoticeFr: 'Concept — non disponible à la vente',
    conceptNoticeEn: 'Concept — not available for sale',
    graphicCode: {
      editionCode: 'CONCEPT 04 / PRINT',
      frontPrintText: 'LA VIBRATION',
      subPrintText: '50 × 70 CM · ÉTUDE GRAPHIQUE',
    },
  },
];

/**
 * Retourne les produits visibles selon le mode actif :
 * - En mode 'production' : uniquement les produits officiellement validés ('published').
 * - En mode 'preview' : inclut les maquettes conceptuelles ('preview_concept') clairement identifiées.
 */
export function getVisibleProducts(mode: SiteEnvironmentMode): MerchProduct[] {
  if (mode === 'production') {
    return productsData.filter((p) => p.publicationStatus === 'published');
  }
  return productsData.filter(
    (p) =>
      p.publicationStatus === 'published' ||
      p.publicationStatus === 'preview_concept'
  );
}

export function getVariantStock(
  product: MerchProduct,
  size: string,
  colorId: string
): number {
  const key = `${size}__${colorId}`;
  return product.variantStock[key] ?? 0;
}
