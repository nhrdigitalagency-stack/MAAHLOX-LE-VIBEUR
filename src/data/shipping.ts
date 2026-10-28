export interface ShippingZone {
  id: string;
  nameFr: string;
  nameEn: string;
  countryCode: string;
  feeXAF: number | null; // null = frais à confirmer sur devis / non connus d'avance
  feeLabelFr: string;
  feeLabelEn: string;
  isVerifiedByTeam: boolean;
}

export interface PaymentGatewaySpec {
  id: string;
  labelFr: string;
  labelEn: string;
  currency: 'XAF';
  isConfigured: boolean;
  statusNoteFr: string;
  statusNoteEn: string;
}

/**
 * Section 10 & 11 : Livraison, Devise FCFA (XAF) et Moyens de paiement
 * - Aucun délai ni tarif définitif n'est inventé comme actif en production.
 * - Les moyens de paiement locaux (MTN Mobile Money, Orange Money, Carte) sont préparés dans
 *   l'architecture mais explicitement marqués comme non configurés tant qu'un compte marchand
 *   approuvé n'est pas fourni.
 */
export const shippingZonesData: ShippingZone[] = [
  {
    id: 'zone-yaounde',
    nameFr: 'Yaoundé (Cameroun)',
    nameEn: 'Yaoundé (Cameroon)',
    countryCode: 'CM',
    feeXAF: null,
    feeLabelFr: 'À confirmer lors de la validation de la demande',
    feeLabelEn: 'To be confirmed upon inquiry validation',
    isVerifiedByTeam: false,
  },
  {
    id: 'zone-douala',
    nameFr: 'Douala (Cameroun)',
    nameEn: 'Douala (Cameroon)',
    countryCode: 'CM',
    feeXAF: null,
    feeLabelFr: 'À confirmer lors de la validation de la demande',
    feeLabelEn: 'To be confirmed upon inquiry validation',
    isVerifiedByTeam: false,
  },
  {
    id: 'zone-cameroun-autres',
    nameFr: 'Autres villes — Cameroun',
    nameEn: 'Other cities — Cameroon',
    countryCode: 'CM',
    feeXAF: null,
    feeLabelFr: 'Selon transporteur partenaire à confirmer',
    feeLabelEn: 'Subject to partner carrier confirmation',
    isVerifiedByTeam: false,
  },
  {
    id: 'zone-international',
    nameFr: 'International (Hors Cameroun)',
    nameEn: 'International (Outside Cameroon)',
    countryCode: 'INTL',
    feeXAF: null,
    feeLabelFr: 'Sur devis selon destination',
    feeLabelEn: 'Custom quote based on destination',
    isVerifiedByTeam: false,
  },
];

export const paymentGatewaysArchitecture: PaymentGatewaySpec[] = [
  {
    id: 'mtn-momo-xaf',
    labelFr: 'MTN Mobile Money (XAF)',
    labelEn: 'MTN Mobile Money (XAF)',
    currency: 'XAF',
    isConfigured: false,
    statusNoteFr: 'Architecture prête — en attente de compte marchand et clés API serveur',
    statusNoteEn: 'Architecture ready — awaiting merchant account and server API keys',
  },
  {
    id: 'orange-money-xaf',
    labelFr: 'Orange Money (XAF)',
    labelEn: 'Orange Money (XAF)',
    currency: 'XAF',
    isConfigured: false,
    statusNoteFr: 'Architecture prête — en attente de compte marchand et clés API serveur',
    statusNoteEn: 'Architecture ready — awaiting merchant account and server API keys',
  },
  {
    id: 'card-xaf-intl',
    labelFr: 'Carte bancaire (Visa / Mastercard)',
    labelEn: 'Bank Card (Visa / Mastercard)',
    currency: 'XAF',
    isConfigured: false,
    statusNoteFr: 'Architecture prête — en attente de passerelle sécurisée (PCI-DSS externe)',
    statusNoteEn: 'Architecture ready — awaiting secure gateway (external PCI-DSS)',
  },
];

export function formatPriceXAF(amount: number, lang: 'fr' | 'en' = 'fr'): string {
  const formattedNumber = new Intl.NumberFormat(
    lang === 'fr' ? 'fr-FR' : 'en-US',
    {
      maximumFractionDigits: 0,
    }
  ).format(amount);
  return `${formattedNumber} FCFA`;
}
