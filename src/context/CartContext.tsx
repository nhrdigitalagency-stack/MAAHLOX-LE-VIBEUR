import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getVariantStock,
  getVisibleProducts,
  MerchColorOption,
  MerchProduct,
} from '../data/products';
import { shippingZonesData } from '../data/shipping';
import { useAppSettings } from './AppSettingsContext';

export interface StoredCartLine {
  productId: string;
  size: string;
  colorId: string;
  quantity: number;
}

export interface HydratedCartLine {
  key: string;
  product: MerchProduct;
  size: string;
  color: MerchColorOption;
  quantity: number;
  maxAvailableStock: number;
  unitPriceXAF: number;
  lineTotalXAF: number;
  isStockValid: boolean;
}

export interface ServerCartValidationResult {
  valid: boolean;
  verifiedAtISO: string;
  recalculatedSubtotalXAF: number;
  shippingFeeXAF: number | null;
  shippingFeeNoteFr: string;
  shippingFeeNoteEn: string;
  recalculatedTotalXAF: number;
  issuesFr: string[];
  issuesEn: string[];
  mode: 'assisted_inquiry' | 'connected_checkout';
}

interface CartContextValue {
  lines: HydratedCartLine[];
  totalQuantity: number;
  subtotalXAF: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    productId: string,
    size: string,
    colorId: string,
    quantity: number
  ) => { ok: boolean; messageFr: string; messageEn: string };
  updateQuantity: (lineKey: string, nextQuantity: number) => void;
  removeItem: (lineKey: string) => void;
  clearCart: () => void;
  revalidateCartOrder: (
    shippingZoneId: string
  ) => Promise<ServerCartValidationResult>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_CART_KEY = 'maahlox_portfolio_cart_v1';
const MAX_PER_VARIANT = 10;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { environmentMode } = useAppSettings();
  const [storedLines, setStoredLines] = useState<StoredCartLine[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      // Ne jamais lire de prix depuis localStorage : uniquement identifiants et quantités bornées
      return parsed
        .filter(
          (item) =>
            item &&
            typeof item.productId === 'string' &&
            typeof item.size === 'string' &&
            typeof item.colorId === 'string' &&
            typeof item.quantity === 'number' &&
            item.quantity >= 1
        )
        .map((item) => ({
          productId: item.productId,
          size: item.size,
          colorId: item.colorId,
          quantity: Math.min(MAX_PER_VARIANT, Math.max(1, Math.floor(item.quantity))),
        }));
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(storedLines));
    } catch {
      // Ignore storage quota errors
    }
  }, [storedLines]);

  const visibleProducts = useMemo(
    () => getVisibleProducts(environmentMode),
    [environmentMode]
  );

  // Hydratation stricte à partir des données canoniques (jamais de prix stocké côté client)
  const lines: HydratedCartLine[] = useMemo(() => {
    const result: HydratedCartLine[] = [];
    for (const item of storedLines) {
      const product = visibleProducts.find((p) => p.id === item.productId);
      if (!product) continue;

      const color = product.colors.find((c) => c.id === item.colorId);
      if (!color) continue;

      if (!product.sizes.includes(item.size)) continue;

      const maxStock = getVariantStock(product, item.size, item.colorId);
      const boundedMax = Math.min(MAX_PER_VARIANT, maxStock);
      const unitPriceXAF = product.price;
      const lineTotalXAF = unitPriceXAF * item.quantity;

      result.push({
        key: `${product.id}::${item.size}::${item.colorId}`,
        product,
        size: item.size,
        color,
        quantity: item.quantity,
        maxAvailableStock: boundedMax,
        unitPriceXAF,
        lineTotalXAF,
        isStockValid: maxStock >= item.quantity && item.quantity > 0,
      });
    }
    return result;
  }, [storedLines, visibleProducts]);

  const totalQuantity = useMemo(
    () => lines.reduce((acc, line) => acc + line.quantity, 0),
    [lines]
  );

  const subtotalXAF = useMemo(
    () => lines.reduce((acc, line) => acc + line.lineTotalXAF, 0),
    [lines]
  );

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = (
    productId: string,
    size: string,
    colorId: string,
    quantity: number
  ): { ok: boolean; messageFr: string; messageEn: string } => {
    const product = visibleProducts.find((p) => p.id === productId);
    if (!product) {
      return {
        ok: false,
        messageFr: 'Cet article n’est pas disponible dans le mode actuel.',
        messageEn: 'This item is not available in the current mode.',
      };
    }

    if (!size || !product.sizes.includes(size)) {
      return {
        ok: false,
        messageFr: 'Veuillez sélectionner une taille disponible.',
        messageEn: 'Please select an available size.',
      };
    }

    const color = product.colors.find((c) => c.id === colorId);
    if (!color) {
      return {
        ok: false,
        messageFr: 'Veuillez sélectionner un coloris disponible.',
        messageEn: 'Please select an available color.',
      };
    }

    const availableStock = getVariantStock(product, size, colorId);
    if (availableStock <= 0) {
      return {
        ok: false,
        messageFr: 'Cette variante (taille / couleur) est actuellement indisponible.',
        messageEn: 'This variant (size / color) is currently out of stock.',
      };
    }

    const existing = storedLines.find(
      (l) =>
        l.productId === productId && l.size === size && l.colorId === colorId
    );
    const currentQty = existing ? existing.quantity : 0;
    const requestedTotal = currentQty + Math.max(1, Math.floor(quantity));
    const maxAllowed = Math.min(MAX_PER_VARIANT, availableStock);

    if (requestedTotal > maxAllowed) {
      return {
        ok: false,
        messageFr: `Quantité maximale atteinte pour cette variante (${maxAllowed} disponible(s)).`,
        messageEn: `Maximum quantity reached for this variant (${maxAllowed} available).`,
      };
    }

    setStoredLines((prev) => {
      const idx = prev.findIndex(
        (l) =>
          l.productId === productId && l.size === size && l.colorId === colorId
      );
      if (idx === -1) {
        return [
          ...prev,
          {
            productId,
            size,
            colorId,
            quantity: Math.max(1, Math.floor(quantity)),
          },
        ];
      }
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: requestedTotal };
      return next;
    });

    return {
      ok: true,
      messageFr: `Ajouté à la sélection : ${product.nameFr} (${size} · ${color.labelFr})`,
      messageEn: `Added to selection: ${product.nameEn} (${size} · ${color.labelEn})`,
    };
  };

  const updateQuantity = (lineKey: string, nextQuantity: number) => {
    const [productId, size, colorId] = lineKey.split('::');
    if (nextQuantity <= 0) {
      removeItem(lineKey);
      return;
    }

    const product = visibleProducts.find((p) => p.id === productId);
    const maxStock = product ? getVariantStock(product, size, colorId) : MAX_PER_VARIANT;
    const clamped = Math.min(
      MAX_PER_VARIANT,
      Math.max(1, maxStock > 0 ? Math.min(nextQuantity, maxStock) : 1)
    );

    setStoredLines((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.colorId === colorId
          ? { ...item, quantity: clamped }
          : item
      )
    );
  };

  const removeItem = (lineKey: string) => {
    const [productId, size, colorId] = lineKey.split('::');
    setStoredLines((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.colorId === colorId
          )
      )
    );
  };

  const clearCart = () => setStoredLines([]);

  const revalidateCartOrder = async (
    shippingZoneId: string
  ): Promise<ServerCartValidationResult> => {
    // 1. Tentative de revalidation côté serveur (/api/shop/validate-cart)
    try {
      const response = await fetch('/api/shop/validate-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          environmentMode,
          shippingZoneId,
          items: storedLines,
        }),
      });
      if (response.ok) {
        const data = (await response.json()) as ServerCartValidationResult;
        return data;
      }
    } catch {
      // Fallback déterministe local si le serveur API n'est pas joignable
    }

    // 2. Revalidation déterministe stricte à partir des fichiers de référence
    const issuesFr: string[] = [];
    const issuesEn: string[] = [];
    let recalculatedSubtotalXAF = 0;

    for (const item of storedLines) {
      const product = visibleProducts.find((p) => p.id === item.productId);
      if (!product) {
        issuesFr.push(`Article introuvable ou retiré : ${item.productId}`);
        issuesEn.push(`Item not found or unpublished: ${item.productId}`);
        continue;
      }
      const stock = getVariantStock(product, item.size, item.colorId);
      if (stock < item.quantity) {
        issuesFr.push(
          `Stock insuffisant pour ${product.nameFr} (${item.size}) : ${stock} disponible(s).`
        );
        issuesEn.push(
          `Insufficient stock for ${product.nameEn} (${item.size}): ${stock} available.`
        );
      }
      recalculatedSubtotalXAF += product.price * item.quantity;
    }

    const zone =
      shippingZonesData.find((z) => z.id === shippingZoneId) ||
      shippingZonesData[0];
    const shippingFeeXAF = zone ? zone.feeXAF : null;

    return {
      valid: issuesFr.length === 0 && storedLines.length > 0,
      verifiedAtISO: new Date().toISOString(),
      recalculatedSubtotalXAF,
      shippingFeeXAF,
      shippingFeeNoteFr: zone
        ? zone.feeLabelFr
        : 'Frais de livraison à confirmer',
      shippingFeeNoteEn: zone
        ? zone.feeLabelEn
        : 'Shipping fees to be confirmed',
      recalculatedTotalXAF:
        recalculatedSubtotalXAF + (shippingFeeXAF !== null ? shippingFeeXAF : 0),
      issuesFr,
      issuesEn,
      mode: 'assisted_inquiry',
    };
  };

  return (
    <CartContext.Provider
      value={{
        lines,
        totalQuantity,
        subtotalXAF,
        isCartOpen,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        revalidateCartOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};
