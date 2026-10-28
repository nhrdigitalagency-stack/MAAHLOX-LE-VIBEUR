import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  Check,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
  X,
} from 'lucide-react';
import {
  getVariantStock,
  getVisibleProducts,
  MerchProduct,
} from '../data/products';
import { formatPriceXAF } from '../data/shipping';
import { useAppSettings } from '../context/AppSettingsContext';
import { useCart } from '../context/CartContext';
import { MerchVisualArtwork } from './MerchVisualArtwork';

gsap.registerPlugin(ScrollTrigger);

export const MerchShopSection: React.FC = () => {
  const { language } = useAppSettings();
  const { addItem, openCart } = useCart();

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const visibleProducts = useMemo(() => getVisibleProducts(), []);

  const [selectedProduct, setSelectedProduct] = useState<MerchProduct | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorId, setSelectedColorId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeViewAngle, setActiveViewAngle] = useState<'front' | 'detail'>(
    'front'
  );
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          '.merch-depth-card',
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openProductSheet = (
    product: MerchProduct,
    triggerEl: HTMLButtonElement
  ) => {
    lastTriggerRef.current = triggerEl;
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || '');
    setSelectedColorId(product.colors[0]?.id || '');
    setQuantity(1);
    setActiveViewAngle('front');
    setShowSizeGuide(false);
    setFeedbackMessage(null);
  };

  const closeProductSheet = () => {
    setSelectedProduct(null);
    setFeedbackMessage(null);
    window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 20);
  };

  useEffect(() => {
    if (!selectedProduct) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeProductSheet();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled])'
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
  }, [selectedProduct]);

  const currentVariantStock = useMemo(() => {
    if (!selectedProduct || !selectedSize || !selectedColorId) return 0;
    return getVariantStock(selectedProduct, selectedSize, selectedColorId);
  }, [selectedProduct, selectedSize, selectedColorId]);

  const selectedColorObj = useMemo(() => {
    if (!selectedProduct) return undefined;
    return (
      selectedProduct.colors.find((c) => c.id === selectedColorId) ||
      selectedProduct.colors[0]
    );
  }, [selectedProduct, selectedColorId]);

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    if (!selectedSize) {
      setFeedbackMessage({
        type: 'error',
        text:
          language === 'fr'
            ? 'Veuillez sélectionner une taille avant d’ajouter au panier.'
            : 'Please select a size before adding to bag.',
      });
      return;
    }

    if (!selectedColorId) {
      setFeedbackMessage({
        type: 'error',
        text:
          language === 'fr'
            ? 'Veuillez sélectionner une couleur avant d’ajouter au panier.'
            : 'Please select a color before adding to bag.',
      });
      return;
    }

    const res = addItem(
      selectedProduct.id,
      selectedSize,
      selectedColorId,
      quantity
    );

    setFeedbackMessage({
      type: res.ok ? 'success' : 'error',
      text: language === 'fr' ? res.messageFr : res.messageEn,
    });
  };

  return (
    <section
      id="boutique"
      ref={sectionRef}
      aria-labelledby="merch-heading"
      className="relative py-20 md:py-32 theme-surface border-b theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* En-tête éditorial « Le merch » */}
        <div
          ref={headerRef}
          className="flex flex-wrap items-end justify-between gap-6 pb-6 mb-12 border-b theme-border"
        >
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest theme-accent-text mb-2">
              {language === 'fr'
                ? '07. Boutique Merchandising'
                : '07. Merchandising Store'}
            </p>
            <h2
              id="merch-heading"
              className="font-display text-4xl md:text-6xl theme-text tracking-tight"
            >
              {language === 'fr' ? 'LE MERCH' : 'THE MERCH'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="theme-muted font-medium">
              {language === 'fr'
                ? 'Collection Studio · Textile & Tirages grand format'
                : 'Studio Collection · Apparel & Large-Format Prints'}
            </span>
          </div>
        </div>

        {/* Grille produits avec animations au scroll et au survol */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {visibleProducts.map((product) => {
            const primaryColor = product.colors[0];
            return (
              <article
                key={product.id}
                className="merch-depth-card group theme-bg border theme-border hover:border-[#FF5A1F] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(255,90,31,0.14)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <button
                    type="button"
                    onClick={(e) => openProductSheet(product, e.currentTarget)}
                    aria-label={
                      language === 'fr'
                        ? `Ouvrir la fiche produit : ${product.nameFr}`
                        : `Open product sheet: ${product.nameEn}`
                    }
                    className="block w-full aspect-[4/5] overflow-hidden border-b theme-border text-left focus-visible:outline-none"
                  >
                    <MerchVisualArtwork
                      category={product.category}
                      colorHex={primaryColor?.hex || '#121212'}
                      editionCode={product.graphicCode.editionCode}
                      frontPrintText={product.graphicCode.frontPrintText}
                      subPrintText={product.graphicCode.subPrintText}
                      conceptNotice={
                        language === 'fr'
                          ? product.conceptNoticeFr
                          : product.conceptNoticeEn
                      }
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>

                  <div className="p-5 space-y-2">
                    <p className="text-[11px] font-medium uppercase tracking-wider theme-muted">
                      {language === 'fr'
                        ? product.categoryLabelFr
                        : product.categoryLabelEn}
                    </p>
                    <h3 className="text-base font-semibold theme-text group-hover:text-[#FF5A1F] transition-colors duration-200 leading-snug">
                      {language === 'fr' ? product.nameFr : product.nameEn}
                    </h3>
                    <p className="text-sm font-semibold theme-accent-text tabular-nums">
                      {formatPriceXAF(product.price, language)}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t theme-border flex items-center justify-between gap-2">
                  <span className="text-xs theme-muted">
                    {language === 'fr' ? 'Tailles :' : 'Sizes:'}{' '}
                    <strong className="theme-text font-medium">
                      {product.sizes.join(' · ')}
                    </strong>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => openProductSheet(product, e.currentTarget)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 theme-surface border theme-border-strong text-xs font-semibold uppercase tracking-wider theme-text group-hover:border-[#FF5A1F] group-hover:text-[#FF5A1F] transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <span>
                      {language === 'fr' ? 'Commander' : 'View item'}
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* FICHE PRODUIT COMPLÈTE (Modal accessible) */}
      {selectedProduct && (
        <div
          style={{ backgroundColor: 'var(--modal-backdrop)' }}
          className="fixed inset-0 z-[80] backdrop-blur-xs flex items-center justify-center p-4 md:p-6 overflow-y-auto font-poppins"
          onClick={closeProductSheet}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-sheet-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl theme-surface border theme-border-strong p-6 md:p-8 shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b theme-border">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
                  {language === 'fr'
                    ? selectedProduct.categoryLabelFr
                    : selectedProduct.categoryLabelEn}
                </p>
                <h3
                  id="product-sheet-title"
                  className="font-display text-3xl md:text-4xl theme-text mt-1"
                >
                  {language === 'fr'
                    ? selectedProduct.nameFr
                    : selectedProduct.nameEn}
                </h3>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeProductSheet}
                aria-label={
                  language === 'fr'
                    ? 'Fermer la fiche produit'
                    : 'Close product sheet'
                }
                className="inline-flex items-center justify-center w-10 h-10 border theme-border-strong theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150 shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-3">
                <div className="aspect-[4/5] w-full border theme-border overflow-hidden">
                  <MerchVisualArtwork
                    category={selectedProduct.category}
                    colorHex={selectedColorObj?.hex || '#121212'}
                    editionCode={selectedProduct.graphicCode.editionCode}
                    frontPrintText={selectedProduct.graphicCode.frontPrintText}
                    subPrintText={selectedProduct.graphicCode.subPrintText}
                    conceptNotice={
                      language === 'fr'
                        ? selectedProduct.conceptNoticeFr
                        : selectedProduct.conceptNoticeEn
                    }
                    viewAngle={activeViewAngle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveViewAngle('front')}
                    aria-pressed={activeViewAngle === 'front'}
                    className={`py-2 px-3 text-xs font-medium border transition-colors duration-150 ${
                      activeViewAngle === 'front'
                        ? 'border-[#FF5A1F] theme-bg theme-text font-semibold'
                        : 'theme-border theme-bg theme-muted hover:theme-text'
                    }`}
                  >
                    {language === 'fr'
                      ? 'Vue 01 · Silhouette'
                      : 'View 01 · Full view'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveViewAngle('detail')}
                    aria-pressed={activeViewAngle === 'detail'}
                    className={`py-2 px-3 text-xs font-medium border transition-colors duration-150 ${
                      activeViewAngle === 'detail'
                        ? 'border-[#FF5A1F] theme-bg theme-text font-semibold'
                        : 'theme-border theme-bg theme-muted hover:theme-text'
                    }`}
                  >
                    {language === 'fr'
                      ? 'Vue 02 · Détail marquage'
                      : 'View 02 · Print detail'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="pb-4 border-b theme-border flex items-baseline justify-between gap-4">
                  <span className="text-2xl font-bold theme-accent-text tabular-nums">
                    {formatPriceXAF(selectedProduct.price, language)}
                  </span>
                  <span className="text-xs theme-muted">
                    {selectedProduct.graphicCode.editionCode}
                  </span>
                </div>

                <p className="text-sm theme-text opacity-90 leading-relaxed">
                  {language === 'fr'
                    ? selectedProduct.descriptionFr
                    : selectedProduct.descriptionEn}
                </p>

                {/* Sélection de la couleur */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider theme-text">
                    {language === 'fr' ? 'Couleur :' : 'Color:'}{' '}
                    <span className="theme-muted font-normal">
                      {selectedColorObj
                        ? language === 'fr'
                          ? selectedColorObj.labelFr
                          : selectedColorObj.labelEn
                        : ''}
                    </span>
                  </label>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {selectedProduct.colors.map((color) => {
                      const isSelected = color.id === selectedColorId;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => {
                            setSelectedColorId(color.id);
                            setFeedbackMessage(null);
                          }}
                          aria-pressed={isSelected}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 border text-xs transition-colors duration-150 ${
                            isSelected
                              ? 'border-[#FF5A1F] theme-bg font-semibold theme-text'
                              : 'theme-border theme-bg theme-muted hover:theme-text'
                          }`}
                        >
                          <span
                            style={{ backgroundColor: color.hex }}
                            className="w-3.5 h-3.5 rounded-full border border-[#F5F1E8]/30 shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            {language === 'fr' ? color.labelFr : color.labelEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sélection de la taille + Guide des tailles */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider theme-text">
                      {language === 'fr' ? 'Taille :' : 'Size:'}{' '}
                      <span className="theme-accent-text">{selectedSize}</span>
                    </label>

                    {selectedProduct.sizeGuide && (
                      <button
                        type="button"
                        onClick={() => setShowSizeGuide((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium theme-muted hover:text-[#FF5A1F] transition-colors duration-150"
                      >
                        <Ruler className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>
                          {language === 'fr'
                            ? 'Guide des tailles'
                            : 'Size guide'}
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {selectedProduct.sizes.map((size) => {
                      const stockForSize = getVariantStock(
                        selectedProduct,
                        size,
                        selectedColorId
                      );
                      const isSelected = size === selectedSize;
                      const isOut = stockForSize <= 0;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            setSelectedSize(size);
                            setQuantity(1);
                            setFeedbackMessage(null);
                          }}
                          aria-pressed={isSelected}
                          className={`min-w-[48px] px-3.5 py-2 border text-xs font-medium transition-colors duration-150 tabular-nums ${
                            isSelected
                              ? 'border-[#FF5A1F] theme-accent-bg font-semibold'
                              : isOut
                              ? 'theme-border theme-bg theme-muted opacity-50 line-through'
                              : 'theme-border-strong theme-bg theme-text hover:border-[#FF5A1F]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  {showSizeGuide && selectedProduct.sizeGuide && (
                    <div className="mt-3 p-3.5 theme-bg border theme-border text-xs">
                      <p className="font-semibold theme-text mb-2">
                        {language === 'fr'
                          ? 'Guide des mesures :'
                          : 'Size measurements:'}
                      </p>
                      <table className="w-full text-left border-collapse tabular-nums">
                        <thead>
                          <tr className="border-b theme-border theme-muted">
                            <th className="py-1.5">
                              {language === 'fr' ? 'Taille' : 'Size'}
                            </th>
                            <th className="py-1.5">
                              {language === 'fr' ? 'Largeur poitrine' : 'Chest'}
                            </th>
                            <th className="py-1.5">
                              {language === 'fr' ? 'Longueur' : 'Length'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y theme-border">
                          {selectedProduct.sizeGuide.map((row) => (
                            <tr key={row.size}>
                              <td className="py-1.5 font-semibold theme-text">
                                {row.size}
                              </td>
                              <td className="py-1.5 theme-muted">
                                {row.chestCm}
                              </td>
                              <td className="py-1.5 theme-muted">
                                {row.lengthCm}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Quantité & État de disponibilité */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider theme-text">
                      {language === 'fr' ? 'Quantité :' : 'Quantity:'}
                    </span>
                    <div className="inline-flex items-center border theme-border-strong theme-bg">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={currentVariantStock <= 0 || quantity <= 1}
                        aria-label={
                          language === 'fr'
                            ? 'Diminuer la quantité'
                            : 'Decrease quantity'
                        }
                        className="w-9 h-9 inline-flex items-center justify-center theme-text disabled:opacity-40"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-10 text-center text-xs font-semibold theme-text tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((q) =>
                            Math.min(10, currentVariantStock, q + 1)
                          )
                        }
                        disabled={
                          currentVariantStock <= 0 ||
                          quantity >= Math.min(10, currentVariantStock)
                        }
                        aria-label={
                          language === 'fr'
                            ? 'Augmenter la quantité'
                            : 'Increase quantity'
                        }
                        className="w-9 h-9 inline-flex items-center justify-center theme-text disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <span className="text-xs font-medium">
                    {currentVariantStock > 0 ? (
                      <span className="theme-muted">
                        {language === 'fr'
                          ? `En stock (${currentVariantStock} disponibles)`
                          : `In stock (${currentVariantStock} available)`}
                      </span>
                    ) : (
                      <span className="theme-accent-text font-semibold">
                        {language === 'fr'
                          ? 'Variante épuisée'
                          : 'Out of stock'}
                      </span>
                    )}
                  </span>
                </div>

                {/* Bouton d'ajout au panier */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={currentVariantStock <= 0}
                    className="w-full py-3.5 px-6 theme-accent-bg font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {currentVariantStock > 0
                        ? language === 'fr'
                          ? 'Ajouter au panier'
                          : 'Add to bag'
                        : language === 'fr'
                        ? 'Variante indisponible'
                        : 'Variant out of stock'}
                    </span>
                  </button>

                  {feedbackMessage && (
                    <div
                      role="status"
                      aria-live="polite"
                      className={`p-3.5 border text-xs flex flex-wrap items-center justify-between gap-2 ${
                        feedbackMessage.type === 'success'
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-[#FF5A1F] bg-[#FF5A1F]/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {feedbackMessage.type === 'success' ? (
                          <Check
                            className="w-4 h-4 text-emerald-400 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <AlertCircle
                            className="w-4 h-4 theme-accent-text shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <span className="font-medium theme-text">
                          {feedbackMessage.text}
                        </span>
                      </div>

                      {feedbackMessage.type === 'success' && (
                        <button
                          type="button"
                          onClick={() => {
                            closeProductSheet();
                            openCart();
                          }}
                          className="underline font-semibold theme-accent-text whitespace-nowrap"
                        >
                          {language === 'fr' ? 'Ouvrir le panier' : 'Open bag'}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Détails de confection et d'expédition */}
                <div className="pt-4 border-t theme-border space-y-2.5 text-xs theme-muted">
                  {selectedProduct.fabricCompositionFr && (
                    <div>
                      <strong className="theme-text">
                        {language === 'fr'
                          ? 'Composition & entretien :'
                          : 'Fabric & care:'}
                      </strong>{' '}
                      {language === 'fr'
                        ? selectedProduct.fabricCompositionFr
                        : selectedProduct.fabricCompositionEn}
                    </div>
                  )}
                  <div>
                    <strong className="theme-text">
                      {language === 'fr' ? 'Livraison :' : 'Shipping:'}
                    </strong>{' '}
                    {language === 'fr'
                      ? selectedProduct.shippingTermsFr
                      : selectedProduct.shippingTermsEn}
                  </div>
                  <div>
                    <strong className="theme-text">
                      {language === 'fr' ? 'Retours :' : 'Returns:'}
                    </strong>{' '}
                    {language === 'fr'
                      ? selectedProduct.returnPolicyFr
                      : selectedProduct.returnPolicyEn}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
