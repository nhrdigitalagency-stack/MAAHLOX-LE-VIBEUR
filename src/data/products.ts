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
  authorizedPhotos: string[];
  price: number;
  currency: 'XAF';
  sizes: string[];
  colors: MerchColorOption[];
  variantStock: Record<string, number>;
  sizeGuide: SizeGuideRow[] | null;
  fabricCompositionFr: string | null;
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

export const productsData: MerchProduct[] = [
  {
    id: 'merch-concept-tshirt-vibration',
    slug: 'tshirt-studio-la-vibration',
    nameFr: 'T-Shirt Studio « La Vibration »',
    nameEn: 'Studio T-Shirt “La Vibration”',
    category: 'tshirt',
    categoryLabelFr: 'T-Shirt · Collection Studio',
    categoryLabelEn: 'T-Shirt · Studio Collection',
    descriptionFr:
      'T-shirt à coupe droite arborant le marquage typographique « MAAHLOX — OBILI / YAOUNDÉ » inspiré de l’identité scénique de l’artiste.',
    descriptionEn:
      'Straight-cut t-shirt featuring the “MAAHLOX — OBILI / YAOUNDÉ” typographic print inspired by the artist’s stage identity.',
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
      'XXL__charcoal': 3,
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
    fabricCompositionFr: 'Coton peigné dense · Sérigraphie haute tenue',
    fabricCompositionEn: 'Dense combed cotton · High-durability screen print',
    careInstructionsFr: 'Lavage à l’envers à 30°C',
    careInstructionsEn: 'Wash inside out at 30°C',
    shippingTermsFr:
      'Expédition disponible à Yaoundé, Douala, dans les régions du Cameroun et à l’international.',
    shippingTermsEn:
      'Shipping available in Yaoundé, Douala, across Cameroon regions, and internationally.',
    returnPolicyFr:
      'Échange ou retour sous 14 jours pour tout article non porté dans son emballage d’origine.',
    returnPolicyEn:
      'Exchange or return within 14 days for unworn items in original packaging.',
    publicationStatus: 'published',
    conceptNoticeFr: 'ÉDITION STUDIO',
    conceptNoticeEn: 'STUDIO EDITION',
    graphicCode: {
      editionCode: 'ÉDITION 01 / TEE',
      frontPrintText: 'MAAHLOX',
      subPrintText: 'YAOUNDÉ · OBILI',
    },
  },
  {
    id: 'merch-concept-hoodie-obili',
    slug: 'hoodie-obili-studio',
    nameFr: 'Hoodie « Obili Studio »',
    nameEn: 'Hoodie “Obili Studio”',
    category: 'hoodie',
    categoryLabelFr: 'Hoodie · Collection Studio',
    categoryLabelEn: 'Hoodie · Studio Collection',
    descriptionFr:
      'Sweat à capuche structuré conçu autour de la signature visuelle « LE VIBEUR » et des couleurs Noir Charbon et Orange Scène.',
    descriptionEn:
      'Structured hooded sweatshirt designed around the “LE VIBEUR” visual signature in Charcoal Black and Stage Orange.',
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
      'XL__orange-stage': 2,
      'XXL__orange-stage': 1,
    },
    sizeGuide: [
      { size: 'M', chestCm: '57 cm', lengthCm: '71 cm' },
      { size: 'L', chestCm: '60 cm', lengthCm: '74 cm' },
      { size: 'XL', chestCm: '63 cm', lengthCm: '76 cm' },
      { size: 'XXL', chestCm: '66 cm', lengthCm: '78 cm' },
    ],
    fabricCompositionFr: 'Molleton épais brossé · Finition bord-côte renforcée',
    fabricCompositionEn: 'Heavy brushed fleece · Reinforced ribbed trim',
    careInstructionsFr: 'Lavage à l’envers à 30°C',
    careInstructionsEn: 'Wash inside out at 30°C',
    shippingTermsFr:
      'Expédition disponible à Yaoundé, Douala, dans les régions du Cameroun et à l’international.',
    shippingTermsEn:
      'Shipping available in Yaoundé, Douala, across Cameroon regions, and internationally.',
    returnPolicyFr:
      'Échange ou retour sous 14 jours pour tout article non porté dans son emballage d’origine.',
    returnPolicyEn:
      'Exchange or return within 14 days for unworn items in original packaging.',
    publicationStatus: 'published',
    conceptNoticeFr: 'ÉDITION STUDIO',
    conceptNoticeEn: 'STUDIO EDITION',
    graphicCode: {
      editionCode: 'ÉDITION 02 / HD',
      frontPrintText: 'LE VIBEUR',
      subPrintText: 'OBILI · YAOUNDÉ',
    },
  },
  {
    id: 'merch-concept-cap-monogram',
    slug: 'casquette-wordmark-maahlox',
    nameFr: 'Casquette Wordmark « MAAHLOX »',
    nameEn: 'Wordmark Cap “MAAHLOX”',
    category: 'cap',
    categoryLabelFr: 'Casquette · Accessoire Scène',
    categoryLabelEn: 'Cap · Stage Accessory',
    descriptionFr:
      'Casquette structurée à 6 panneaux et visière courbée avec broderie frontale « MAAHLOX » et détail contrasté Orange Scène.',
    descriptionEn:
      'Structured 6-panel curved-brim cap with front “MAAHLOX” embroidery and Stage Orange contrast detail.',
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
    fabricCompositionFr: 'Sergé de coton structuré · Broderie relief',
    fabricCompositionEn: 'Structured cotton twill · Raised embroidery',
    careInstructionsFr: 'Nettoyage en surface avec un chiffon humide',
    careInstructionsEn: 'Spot clean with a damp cloth',
    shippingTermsFr:
      'Expédition disponible à Yaoundé, Douala, dans les régions du Cameroun et à l’international.',
    shippingTermsEn:
      'Shipping available in Yaoundé, Douala, across Cameroon regions, and internationally.',
    returnPolicyFr:
      'Échange ou retour sous 14 jours pour tout article non porté dans son emballage d’origine.',
    returnPolicyEn:
      'Exchange or return within 14 days for unworn items in original packaging.',
    publicationStatus: 'published',
    conceptNoticeFr: 'ÉDITION STUDIO',
    conceptNoticeEn: 'STUDIO EDITION',
    graphicCode: {
      editionCode: 'ÉDITION 03 / CAP',
      frontPrintText: 'MAAHLOX',
      subPrintText: 'ÉDITION SCÈNE',
    },
  },
  {
    id: 'merch-concept-poster-affiche',
    slug: 'affiche-la-vibration-en-grand',
    nameFr: 'Affiche Typographique « La Vibration en Grand »',
    nameEn: 'Typographic Poster “The Vibration at Scale”',
    category: 'poster',
    categoryLabelFr: 'Affiche · Tirage Collector',
    categoryLabelEn: 'Poster · Collector Print',
    descriptionFr:
      'Affiche grand format 50 × 70 cm reprenant la composition typographique monumentale « MAAHLOX — LA VIBRATION EN GRAND ».',
    descriptionEn:
      'Large-format 50 × 70 cm poster featuring the monumental typographic composition “MAAHLOX — THE VIBRATION AT SCALE”.',
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
    fabricCompositionFr: 'Papier couché mat 250 g/m² · Tube de protection',
    fabricCompositionEn: '250 gsm matte art paper · Protective tube',
    careInstructionsFr: 'Conserver à l’abri de l’humidité',
    careInstructionsEn: 'Keep away from moisture',
    shippingTermsFr:
      'Expédition sous tube rigide à Yaoundé, Douala, au Cameroun et à l’international.',
    shippingTermsEn:
      'Shipped in a rigid tube across Yaoundé, Douala, Cameroon, and internationally.',
    returnPolicyFr:
      'Échange ou retour sous 14 jours dans son tube d’origine.',
    returnPolicyEn:
      'Exchange or return within 14 days in original protective tube.',
    publicationStatus: 'published',
    conceptNoticeFr: 'ÉDITION STUDIO',
    conceptNoticeEn: 'STUDIO EDITION',
    graphicCode: {
      editionCode: 'ÉDITION 04 / PRINT',
      frontPrintText: 'LA VIBRATION',
      subPrintText: '50 × 70 CM · TIRAGE STUDIO',
    },
  },
];

export function getVisibleProducts(_mode?: SiteEnvironmentMode): MerchProduct[] {
  return productsData;
}

export function getVariantStock(
  product: MerchProduct,
  size: string,
  colorId: string
): number {
  const key = `${size}__${colorId}`;
  return product.variantStock[key] ?? 0;
}
