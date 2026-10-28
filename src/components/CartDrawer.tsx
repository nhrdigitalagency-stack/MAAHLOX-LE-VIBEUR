import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  Copy,
  Download,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { formatPriceXAF, shippingZonesData } from '../data/shipping';
import { useAppSettings } from '../context/AppSettingsContext';
import {
  ServerCartValidationResult,
  useCart,
} from '../context/CartContext';
import { MerchVisualArtwork } from './MerchVisualArtwork';

export const CartDrawer: React.FC = () => {
  const { language } = useAppSettings();
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

  const handlePrepareOrder = async (e: React.FormEvent) => {
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
        )} | Sous-total: ${formatPriceXAF(line.lineTotalXAF, language)}`
    );

    const summaryText =
      language === 'fr'
        ? [
            '=== BON DE COMMANDE MERCHANDISING — MAAHLOX LE VIBEUR ===',
            `Date : ${validation.verifiedAtISO.slice(0, 10)}`,
            `Client : ${customerName.trim()} (${customerEmail.trim()})`,
            `Zone de livraison : ${selectedZone.nameFr}`,
            `Ville / Quartier : ${customerCity.trim() || 'Non précisée'}`,
            '',
            '--- ARTICLES SÉLECTIONNÉS ---',
            ...itemsSummaryLines,
            '',
            `Sous-total : ${formatPriceXAF(
              validation.recalculatedSubtotalXAF,
              'fr'
            )}`,
            `Livraison : ${validation.shippingFeeNoteFr}`,
            `Total : ${formatPriceXAF(validation.recalculatedTotalXAF, 'fr')}`,
            customerNote.trim() ? `\nNote : ${customerNote.trim()}` : '',
            '=========================================================',
          ]
            .filter(Boolean)
            .join('\n')
        : [
            '=== MERCHANDISING ORDER SUMMARY — MAAHLOX LE VIBEUR ===',
            `Date: ${validation.verifiedAtISO.slice(0, 10)}`,
            `Customer: ${customerName.trim()} (${customerEmail.trim()})`,
            `Shipping zone: ${selectedZone.nameEn}`,
            `City / District: ${customerCity.trim() || 'Not specified'}`,
            '',
            '--- SELECTED ITEMS ---',
            ...itemsSummaryLines,
            '',
            `Subtotal: ${formatPriceXAF(
              validation.recalculatedSubtotalXAF,
              'en'
            )}`,
            `Shipping: ${validation.shippingFeeNoteEn}`,
            `Total: ${formatPriceXAF(validation.recalculatedTotalXAF, 'en')}`,
            customerNote.trim() ? `\nNote: ${customerNote.trim()}` : '',
            '=======================================================',
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
    a.download = 'commande-merch-maahlox.txt';
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
                {language === 'fr' ? 'VOTRE PANIER' : 'YOUR BAG'} (
                {totalQuantity})
              </h2>
              <p className="text-[11px] theme-muted">
                {language === 'fr'
                  ? 'Collection Studio · Devise FCFA (XAF)'
                  : 'Studio Collection · Currency FCFA (XAF)'}
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
                    ? 'Explorez la section « Le merch » pour sélectionner vos articles de la collection.'
                    : 'Explore “The Merch” section to select items from the collection.'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="px-5 py-2.5 theme-accent-bg text-xs font-semibold uppercase tracking-wider"
              >
                {language === 'fr'
                  ? 'Découvrir la boutique'
                  : 'Explore store'}
              </button>
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {lines.map((line) => (
                  <li
                    key={line.key}
                    className="p-4 theme-bg border theme-border hover:border-[#FF5A1F]/50 transition-colors duration-200 flex gap-4 items-start"
                  >
                    <div className="w-20 h-24 shrink-0 border theme-border overflow-hidden">
                      <MerchVisualArtwork
                        category={line.product.category}
                        colorHex={line.color.hex}
                        editionCode={line.product.graphicCode.editionCode}
                        frontPrintText={line.product.graphicCode.frontPrintText}
                        subPrintText={line.product.graphicCode.subPrintText}
                        conceptNotice="STUDIO"
                        className="p-1.5!"
                      />
                    </div>

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
                    {language === 'fr' ? 'Expédition :' : 'Shipping:'}{' '}
                    <strong className="theme-text">
                      {language === 'fr'
                        ? selectedZone.feeLabelFr
                        : selectedZone.feeLabelEn}
                    </strong>
                  </p>
                </div>

                <div className="pt-3 border-t theme-border flex items-baseline justify-between">
                  <span className="font-semibold uppercase tracking-wider theme-text">
                    {language === 'fr' ? 'Total commande' : 'Order total'}
                  </span>
                  <span className="text-base font-bold theme-accent-text tabular-nums">
                    {formatPriceXAF(subtotalXAF, language)}
                  </span>
                </div>
              </div>

              <form
                onSubmit={handlePrepareOrder}
                noValidate
                className="p-4 theme-bg border theme-border space-y-3 text-xs"
              >
                <p className="font-semibold uppercase tracking-wider theme-text">
                  {language === 'fr'
                    ? 'Coordonnées de livraison & commande'
                    : 'Delivery & Order Details'}
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
                      ? 'Ville / Quartier'
                      : 'City / District'}
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
                      ? 'Instructions complémentaires'
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
                      ? 'Validation en cours...'
                      : 'Validating...'
                    : language === 'fr'
                    ? 'Valider mon bon de commande'
                    : 'Confirm order summary'}
                </button>

                {generatedOrderBrief && serverValidation && (
                  <div className="mt-4 p-3.5 theme-surface border border-[#FF5A1F] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold theme-accent-text">
                      <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>
                        {language === 'fr'
                          ? 'Bon de commande généré avec succès'
                          : 'Order summary generated successfully'}
                      </span>
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
