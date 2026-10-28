import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Download,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  formatPriceXAF,
  paymentGatewaysArchitecture,
  shippingZonesData,
} from '../data/shipping';
import { siteConfig } from '../data/siteConfig';
import { useAppSettings } from '../context/AppSettingsContext';
import {
  ServerCartValidationResult,
  useCart,
} from '../context/CartContext';
import { MerchVisualArtwork } from './MerchVisualArtwork';

export const CartDrawer: React.FC = () => {
  const { language, featureFlags } = useAppSettings();
  const {
    lines,
    totalQuantity,
    subtotalXAF,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    revalidateCartOrder,
  } = useCart();

  const [selectedZoneId, setSelectedZoneId] = useState<string>(
    shippingZonesData[0]?.id || 'zone-yaounde'
  );
  const [activeOrderTab, setActiveOrderTab] = useState<'assisted' | 'checkout'>(
    featureFlags.enableCheckout ? 'checkout' : 'assisted'
  );

  // Formulaire de demande de commande assistée (Voie A)
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isValidatingServer, setIsValidatingServer] = useState(false);
  const [serverValidation, setServerValidation] =
    useState<ServerCartValidationResult | null>(null);
  const [generatedOrderBrief, setGeneratedOrderBrief] = useState<string | null>(
    null
  );
  const [copiedOrderBrief, setCopiedOrderBrief] = useState(false);

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const selectedZone =
    shippingZonesData.find((z) => z.id === selectedZoneId) ||
    shippingZonesData[0];

  // Accessibilité : verrouillage scroll, touche Échap, piège de focus
  useEffect(() => {
    if (!isCartOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeCart();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handlePrepareAssistedOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (lines.length === 0) {
      setFormError(
        language === 'fr'
          ? 'Votre panier est vide.'
          : 'Your shopping bag is empty.'
      );
      return;
    }

    if (customerName.trim().length < 2) {
      setFormError(
        language === 'fr'
          ? 'Veuillez renseigner votre nom complet.'
          : 'Please enter your full name.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      setFormError(
        language === 'fr'
          ? 'Veuillez saisir une adresse e-mail valide.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setIsValidatingServer(true);
    const validation = await revalidateCartOrder(selectedZoneId);
    setServerValidation(validation);
    setIsValidatingServer(false);

    if (!validation.valid) {
      setFormError(
        (language === 'fr' ? validation.issuesFr : validation.issuesEn).join(
          ' '
        )
      );
      return;
    }

    const itemsSummaryLines = lines.map(
      (line, idx) =>
        `${idx + 1}. ${
          language === 'fr' ? line.product.nameFr : line.product.nameEn
        } — Taille: ${line.size} | Couleur: ${
          language === 'fr' ? line.color.labelFr : line.color.labelEn
        } | Qté: ${line.quantity} | Prix unitaire: ${formatPriceXAF(
          line.unitPriceXAF,
          language
        )} | Sous-total ligne: ${formatPriceXAF(line.lineTotalXAF, language)}`
    );

    const summaryText =
      language === 'fr'
        ? [
            '=== DEMANDE DE COMMANDE ASSISTÉE (CONCEPT PREVIEW) — MAAHLOX LE VIBEUR ===',
            'Statut : Demande préparatoire (Aucun paiement effectué · Aucune réservation commerciale active)',
            `Horodatage de revalidation serveur : ${validation.verifiedAtISO}`,
            `Client : ${customerName.trim()} (${customerEmail.trim()})`,
            `Zone de livraison sélectionnée : ${selectedZone.nameFr}`,
            `Ville / Adresse indicative : ${
              customerCity.trim() || 'Non précisée'
            }`,
            '',
            '--- ARTICLES SÉLECTIONNÉS (MAQUETTES CONCEPT) ---',
            ...itemsSummaryLines,
            '',
            `Sous-total recalculé côté serveur : ${formatPriceXAF(
              validation.recalculatedSubtotalXAF,
              'fr'
            )}`,
            `Frais de livraison : ${validation.shippingFeeNoteFr}`,
            `Total de référence (hors frais sur devis) : ${formatPriceXAF(
              validation.recalculatedTotalXAF,
              'fr'
            )}`,
            customerNote.trim() ? `\nNote : ${customerNote.trim()}` : '',
            '==========================================================================',
          ]
            .filter(Boolean)
            .join('\n')
        : [
            '=== ASSISTED ORDER INQUIRY (CONCEPT PREVIEW) — MAAHLOX LE VIBEUR ===',
            'Status: Preparatory inquiry (No payment processed · No commercial reservation active)',
            `Server revalidation timestamp: ${validation.verifiedAtISO}`,
            `Customer: ${customerName.trim()} (${customerEmail.trim()})`,
            `Selected shipping zone: ${selectedZone.nameEn}`,
            `City / Indicative address: ${
              customerCity.trim() || 'Not specified'
            }`,
            '',
            '--- SELECTED ITEMS (CONCEPT MOCKUPS) ---',
            ...itemsSummaryLines,
            '',
            `Server-recalculated subtotal: ${formatPriceXAF(
              validation.recalculatedSubtotalXAF,
              'en'
            )}`,
            `Shipping fee: ${validation.shippingFeeNoteEn}`,
            `Reference total (excluding custom quote shipping): ${formatPriceXAF(
              validation.recalculatedTotalXAF,
              'en'
            )}`,
            customerNote.trim() ? `\nNote: ${customerNote.trim()}` : '',
            '====================================================================',
          ]
            .filter(Boolean)
            .join('\n');

    setGeneratedOrderBrief(summaryText);
  };

  const handleCopyBrief = async () => {
    if (!generatedOrderBrief) return;
    try {
      await navigator.clipboard.writeText(generatedOrderBrief);
      setCopiedOrderBrief(true);
      window.setTimeout(() => setCopiedOrderBrief(false), 2500);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleDownloadBrief = () => {
    if (!generatedOrderBrief) return;
    const blob = new Blob([generatedOrderBrief], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demande-merch-maahlox-concept.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{ backgroundColor: 'var(--modal-backdrop)' }}
      className="fixed inset-0 z-[90] backdrop-blur-xs flex justify-end font-poppins transition-opacity duration-250"
      onClick={closeCart}
    >
      {/* Panneau latéral (entrée fluide en 280 ms) */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full theme-surface border-l theme-border-strong flex flex-col justify-between shadow-2xl overflow-hidden animate-slideInRight"
      >
        {/* En-tête du panier */}
        <div className="p-5 md:p-6 border-b theme-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShoppingBag
              className="w-5 h-5 theme-accent-text"
              aria-hidden="true"
            />
            <div>
              <h2
                id="cart-drawer-title"
                className="font-display text-2xl md:text-3xl theme-text tracking-wide"
              >
                {language === 'fr' ? 'VOTRE SÉLECTION' : 'YOUR BAG'} (
                {totalQuantity})
              </h2>
              <p className="text-[11px] theme-muted">
                {language === 'fr'
                  ? 'Prix recalculés côté serveur · Devise FCFA (XAF)'
                  : 'Server-recalculated prices · Currency FCFA (XAF)'}
              </p>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeCart}
            aria-label={
              language === 'fr' ? 'Fermer le panier' : 'Close shopping bag'
            }
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border theme-border-strong theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Corps défilant du panier */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          {lines.length === 0 ? (
            /* État vide soigné */
            <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center p-6 theme-bg border theme-border space-y-4">
              <ShoppingBag
                className="w-10 h-10 theme-muted opacity-50"
                aria-hidden="true"
              />
              <div className="space-y-1 max-w-xs">
                <p className="text-base font-semibold theme-text">
                  {language === 'fr'
                    ? 'Votre panier est actuellement vide.'
                    : 'Your shopping bag is currently empty.'}
                </p>
                <p className="text-xs theme-muted leading-relaxed">
                  {language === 'fr'
                    ? 'Explorez la section « Le merch » pour ajouter une maquette conceptuelle et tester le parcours.'
                    : 'Explore “The Merch” section to add a concept mockup and test the checkout flow.'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="px-5 py-2.5 theme-accent-bg text-xs font-semibold uppercase tracking-wider"
              >
                {language === 'fr'
                  ? 'Retourner à la boutique'
                  : 'Return to store'}
              </button>
            </div>
          ) : (
            <>
              {/* Liste des articles */}
              <ul className="space-y-4">
                {lines.map((line) => (
                  <li
                    key={line.key}
                    className="p-4 theme-bg border theme-border flex gap-4 items-start"
                  >
                    {/* Vignette produit */}
                    <div className="w-20 h-24 shrink-0 border theme-border overflow-hidden">
                      <MerchVisualArtwork
                        category={line.product.category}
                        colorHex={line.color.hex}
                        editionCode={line.product.graphicCode.editionCode}
                        frontPrintText={line.product.graphicCode.frontPrintText}
                        subPrintText={line.product.graphicCode.subPrintText}
                        conceptNotice="CONCEPT"
                        className="p-1.5!"
                      />
                    </div>

                    {/* Détails de ligne */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold theme-text truncate">
                          {language === 'fr'
                            ? line.product.nameFr
                            : line.product.nameEn}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeItem(line.key)}
                          aria-label={
                            language === 'fr'
                              ? `Retirer ${line.product.nameFr} du panier`
                              : `Remove ${line.product.nameEn} from bag`
                          }
                          className="theme-muted hover:text-[#FF5A1F] transition-colors duration-150 p-1 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      <p className="text-xs theme-muted">
                        {language === 'fr' ? 'Taille :' : 'Size:'}{' '}
                        <strong className="theme-text">{line.size}</strong> ·{' '}
                        {language === 'fr' ? 'Couleur :' : 'Color:'}{' '}
                        <strong className="theme-text">
                          {language === 'fr'
                            ? line.color.labelFr
                            : line.color.labelEn}
                        </strong>
                      </p>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                        {/* Contrôle de quantité bornée */}
                        <div className="inline-flex items-center border theme-border-strong theme-surface">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(line.key, line.quantity - 1)
                            }
                            aria-label={
                              language === 'fr'
                                ? 'Diminuer la quantité'
                                : 'Decrease quantity'
                            }
                            className="w-7 h-7 inline-flex items-center justify-center theme-text"
                          >
                            <Minus className="w-3 h-3" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold theme-text tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(line.key, line.quantity + 1)
                            }
                            disabled={line.quantity >= line.maxAvailableStock}
                            aria-label={
                              language === 'fr'
                                ? 'Augmenter la quantité'
                                : 'Increase quantity'
                            }
                            className="w-7 h-7 inline-flex items-center justify-center theme-text disabled:opacity-35"
                          >
                            <Plus className="w-3 h-3" aria-hidden="true" />
                          </button>
                        </div>

                        <span className="text-xs font-semibold theme-accent-text tabular-nums">
                          {formatPriceXAF(line.lineTotalXAF, language)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Récapitulatif financier & Zone de livraison */}
              <div className="p-4 theme-bg border theme-border space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="theme-muted">
                    {language === 'fr' ? 'Sous-total articles' : 'Subtotal'}
                  </span>
                  <span className="font-semibold theme-text tabular-nums">
                    {formatPriceXAF(subtotalXAF, language)}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t theme-border">
                  <label
                    htmlFor="cart-shipping-zone"
                    className="block font-semibold theme-text"
                  >
                    {language === 'fr'
                      ? 'Zone de livraison :'
                      : 'Shipping zone:'}
                  </label>
                  <select
                    id="cart-shipping-zone"
                    value={selectedZoneId}
                    onChange={(e) => setSelectedZoneId(e.target.value)}
                    className="w-full px-3 py-2 theme-surface border theme-border-strong text-xs theme-text"
                  >
                    {shippingZonesData.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {language === 'fr' ? zone.nameFr : zone.nameEn}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] theme-muted">
                    {language === 'fr' ? 'Frais de livraison :' : 'Shipping:'}{' '}
                    <strong className="theme-text">
                      {language === 'fr'
                        ? selectedZone.feeLabelFr
                        : selectedZone.feeLabelEn}
                    </strong>
                  </p>
                </div>

                <div className="pt-3 border-t theme-border flex items-baseline justify-between">
                  <span className="font-semibold uppercase tracking-wider theme-text">
                    {language === 'fr'
                      ? 'Total explicite (hors livraison sur devis)'
                      : 'Explicit total (excl. custom shipping)'}
                  </span>
                  <span className="text-base font-bold theme-accent-text tabular-nums">
                    {formatPriceXAF(subtotalXAF, language)}
                  </span>
                </div>
              </div>

              {/* Section 11 : Deux voies (Voie A : Commande assistée / Voie B : Checkout connecté) */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 p-1 theme-bg border theme-border text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveOrderTab('assisted')}
                    className={`py-2 px-3 font-semibold transition-colors duration-150 ${
                      activeOrderTab === 'assisted'
                        ? 'theme-accent-bg'
                        : 'theme-muted hover:theme-text'
                    }`}
                  >
                    {language === 'fr'
                      ? 'A. Demande assistée'
                      : 'A. Assisted Inquiry'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveOrderTab('checkout')}
                    className={`py-2 px-3 font-semibold transition-colors duration-150 ${
                      activeOrderTab === 'checkout'
                        ? 'theme-accent-bg'
                        : 'theme-muted hover:theme-text'
                    }`}
                  >
                    {language === 'fr'
                      ? 'B. Checkout connecté'
                      : 'B. Connected Checkout'}
                  </button>
                </div>

                {activeOrderTab === 'assisted' ? (
                  /* Voie A : Préparation d'une demande assistée après revalidation serveur */
                  <form
                    onSubmit={handlePrepareAssistedOrder}
                    noValidate
                    className="p-4 theme-bg border theme-border space-y-3 text-xs"
                  >
                    <p className="theme-muted leading-relaxed">
                      {language === 'fr'
                        ? 'Voie A (Active) : revalide les prix et quantités côté serveur (/api/shop/validate-cart) et prépare un récapitulatif de demande. Aucune affirmation de paiement ni de réservation commerciale.'
                        : 'Pathway A (Active): revalidates prices and quantities server-side (/api/shop/validate-cart) and prepares an inquiry summary. No payment or commercial reservation is claimed.'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="order-name"
                          className="block font-semibold theme-text mb-1"
                        >
                          {language === 'fr' ? 'Nom complet *' : 'Full name *'}
                        </label>
                        <input
                          id="order-name"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Jean Ndongo"
                          className="w-full px-3 py-2 theme-surface border theme-border-strong theme-text"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="order-email"
                          className="block font-semibold theme-text mb-1"
                        >
                          {language === 'fr' ? 'E-mail *' : 'Email *'}
                        </label>
                        <input
                          id="order-email"
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="contact@exemple.cm"
                          className="w-full px-3 py-2 theme-surface border theme-border-strong theme-text"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="order-city"
                        className="block font-semibold theme-text mb-1"
                      >
                        {language === 'fr'
                          ? 'Ville / Quartier (Cameroun ou International)'
                          : 'City / District (Cameroon or International)'}
                      </label>
                      <input
                        id="order-city"
                        type="text"
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        placeholder={
                          language === 'fr'
                            ? 'Ex. : Yaoundé, Bastos'
                            : 'e.g. Yaoundé, Bastos'
                        }
                        className="w-full px-3 py-2 theme-surface border theme-border-strong theme-text"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="order-note"
                        className="block font-semibold theme-text mb-1"
                      >
                        {language === 'fr'
                          ? 'Précisions éventuelles'
                          : 'Additional notes'}
                      </label>
                      <textarea
                        id="order-note"
                        rows={2}
                        value={customerNote}
                        onChange={(e) => setCustomerNote(e.target.value)}
                        className="w-full px-3 py-2 theme-surface border theme-border-strong theme-text"
                      />
                    </div>

                    {formError && (
                      <p className="text-[#FF5A1F] font-medium">{formError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isValidatingServer}
                      className="w-full py-3 px-4 theme-accent-bg font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity duration-150"
                    >
                      {isValidatingServer
                        ? language === 'fr'
                          ? 'Revalidation serveur en cours...'
                          : 'Revalidating on server...'
                        : language === 'fr'
                        ? 'Revalider et générer la fiche de demande'
                        : 'Revalidate & generate inquiry brief'}
                    </button>

                    {generatedOrderBrief && serverValidation && (
                      <div className="mt-4 p-3.5 theme-surface border border-[#FF5A1F] space-y-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle
                            className="w-4 h-4 theme-accent-text shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <p className="text-[11px] theme-text leading-relaxed">
                            {language === 'fr'
                              ? 'Demande préparée localement après revalidation serveur des prix (aucun paiement effectué, aucun numéro WhatsApp inventé).'
                              : 'Inquiry prepared locally after server price revalidation (no payment processed, no WhatsApp number invented).'}
                          </p>
                        </div>

                        <pre className="p-3 theme-bg border theme-border text-[11px] theme-text overflow-x-auto whitespace-pre-wrap">
                          {generatedOrderBrief}
                        </pre>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={handleCopyBrief}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 theme-accent-bg font-semibold uppercase tracking-wider"
                          >
                            {copiedOrderBrief ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>
                                  {language === 'fr' ? 'Copié' : 'Copied'}
                                </span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>
                                  {language === 'fr' ? 'Copier' : 'Copy'}
                                </span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleDownloadBrief}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 theme-bg border theme-border-strong font-medium uppercase tracking-wider theme-text"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>
                              {language === 'fr'
                                ? 'Télécharger (.txt)'
                                : 'Download (.txt)'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  /* Voie B : Checkout connecté (désactivé honnêtement tant qu'aucun compte marchand n'est fourni) */
                  <div className="p-4 theme-bg border theme-border space-y-4 text-xs">
                    <div className="flex items-start gap-2.5">
                      <Lock
                        className="w-4 h-4 theme-accent-text shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div className="space-y-1">
                        <p className="font-semibold theme-text">
                          {language === 'fr'
                            ? 'Checkout direct en attente de connexion marchande (enableCheckout = false)'
                            : 'Direct checkout awaiting merchant connection (enableCheckout = false)'}
                        </p>
                        <p className="theme-muted leading-relaxed">
                          {language === 'fr'
                            ? 'Conformément à la Section 11, aucun moyen de paiement (MTN Mobile Money, Orange Money, Carte) n’est présenté comme opérationnel sans intégration marchande réellement configurée.'
                            : 'In accordance with Section 11, no payment method (MTN Mobile Money, Orange Money, Card) is presented as operational without a configured live merchant integration.'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t theme-border">
                      <p className="font-semibold uppercase tracking-wider theme-muted">
                        {language === 'fr'
                          ? 'Passerelles préparées dans l’architecture (XAF) :'
                          : 'Gateways prepared in architecture (XAF):'}
                      </p>
                      {paymentGatewaysArchitecture.map((gw) => (
                        <div
                          key={gw.id}
                          className="p-2.5 theme-surface border theme-border flex items-center justify-between gap-2"
                        >
                          <span className="font-medium theme-text">
                            {language === 'fr' ? gw.labelFr : gw.labelEn}
                          </span>
                          <span className="text-[11px] theme-accent-text">
                            {siteConfig.shopConfig.hasConnectedPaymentGateway
                              ? 'Connecté'
                              : language === 'fr'
                              ? 'Prêt à connecter'
                              : 'Ready to connect'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Pied du panier */}
        {lines.length > 0 && (
          <div className="p-4 md:p-5 border-t theme-border flex items-center justify-between gap-4 text-xs">
            <button
              type="button"
              onClick={clearCart}
              className="theme-muted hover:text-[#FF5A1F] underline transition-colors duration-150"
            >
              {language === 'fr' ? 'Vider le panier' : 'Clear bag'}
            </button>
            <button
              type="button"
              onClick={closeCart}
              className="px-4 py-2 theme-bg border theme-border-strong font-medium uppercase tracking-wider theme-text hover:border-[#FF5A1F] transition-colors duration-150"
            >
              {language === 'fr' ? 'Fermer (Échap)' : 'Close (Esc)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
