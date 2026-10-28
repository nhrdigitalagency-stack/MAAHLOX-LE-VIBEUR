import express from 'express';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { productsData, getVariantStock } from './src/data/products';
import { shippingZonesData } from './src/data/shipping';

const app = express();
app.use(express.json({ limit: '64kb' }));

/**
 * In-memory atomic store for Mode B QR ticket verification demo & idempotency keys.
 * In production, replace with a transactional database (PostgreSQL / Firestore).
 */
const ticketLedger = new Map<
  string,
  {
    token: string;
    orderRef: string;
    categoryName: string;
    status: 'VALID' | 'ALREADY_USED' | 'CANCELLED';
    scannedAt: string | null;
  }
>([
  [
    'MLV-TKT-8F92A4C1-90E2',
    {
      token: 'MLV-TKT-8F92A4C1-90E2',
      orderRef: 'ORD-DEMO-2025-001',
      categoryName: 'Accès Standard (Démo Mode B)',
      status: 'VALID',
      scannedAt: null,
    },
  ],
]);

const processedWebhookEventIds = new Set<string>();

/**
 * 1. SERVER-SIDE CART & ORDER VALIDATION ENDPOINT
 * Never trusts client-submitted unit prices; recalculates everything from canonical `productsData`.
 */
app.post('/api/shop/validate-cart', (req, res) => {
  try {
    const { items, shippingZoneId, customer } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        valid: false,
        error: 'Panier vide ou format invalide.',
      });
    }

    const shippingZone =
      shippingZonesData.find((z) => z.id === shippingZoneId) ||
      shippingZonesData[0];

    let subtotalXAF = 0;
    const validatedLines: Array<{
      productId: string;
      nameFr: string;
      selectedSize: string;
      selectedColorName: string;
      quantity: number;
      canonicalUnitPriceXAF: number;
      lineTotalXAF: number;
      publicationStatus: string;
    }> = [];

    for (const rawItem of items) {
      const product = productsData.find((p) => p.id === rawItem.productId);
      if (!product) {
        return res.status(400).json({
          valid: false,
          error: `Produit introuvable : ${String(rawItem.productId)}`,
        });
      }

      const qty = Math.max(1, Math.min(10, Math.floor(Number(rawItem.quantity) || 1)));
      const available = getVariantStock(
        product,
        String(rawItem.selectedSize || ''),
        String(rawItem.selectedColorId || '')
      );

      if (available < qty) {
        return res.status(409).json({
          valid: false,
          error: `Stock insuffisant pour ${product.nameFr} (${rawItem.selectedSize}). Disponible : ${available}.`,
        });
      }

      const colorObj = product.colors.find((c) => c.id === rawItem.selectedColorId);
      const lineTotal = product.price * qty;
      subtotalXAF += lineTotal;

      validatedLines.push({
        productId: product.id,
        nameFr: product.nameFr,
        selectedSize: String(rawItem.selectedSize),
        selectedColorName: colorObj ? colorObj.labelFr : String(rawItem.selectedColorId),
        quantity: qty,
        canonicalUnitPriceXAF: product.price,
        lineTotalXAF: lineTotal,
        publicationStatus: product.publicationStatus,
      });
    }

    const shippingFeeXAF = shippingZone.feeXAF ?? 0;
    const grandTotalXAF = subtotalXAF + shippingFeeXAF;

    return res.json({
      valid: true,
      mode: 'PREVIEW_DEMONSTRATION_NO_REAL_CHARGE',
      currency: 'XAF',
      validatedLines,
      subtotalXAF,
      shippingZone: {
        id: shippingZone.id,
        nameFr: shippingZone.nameFr,
        feeXAF: shippingZone.feeXAF,
        feeLabelFr: shippingZone.feeLabelFr,
      },
      grandTotalXAF,
      customerSummary: customer
        ? {
            fullName: String(customer.fullName || '').slice(0, 120),
            cityCountry: String(customer.cityCountry || '').slice(0, 120),
          }
        : null,
      validatedAtISO: new Date().toISOString(),
    });
  } catch {
    return res.status(500).json({
      valid: false,
      error: 'Erreur interne lors de la validation du panier.',
    });
  }
});

/**
 * 2. MODE B — ATOMIC QR TICKET SCAN VERIFICATION ENDPOINT
 * Guarantees a QR token can only transition from VALID -> ALREADY_USED once.
 */
app.post('/api/tickets/verify-qr', (req, res) => {
  const { token, action } = req.body || {};

  if (action === 'reset_demo') {
    ticketLedger.set('MLV-TKT-8F92A4C1-90E2', {
      token: 'MLV-TKT-8F92A4C1-90E2',
      orderRef: 'ORD-DEMO-2025-001',
      categoryName: 'Accès Standard (Démo Mode B)',
      status: 'VALID',
      scannedAt: null,
    });
    return res.json({
      reset: true,
      ticket: ticketLedger.get('MLV-TKT-8F92A4C1-90E2'),
    });
  }

  const cleanToken = String(token || '').trim();
  const record = ticketLedger.get(cleanToken);

  if (!record) {
    return res.status(404).json({
      outcome: 'INVALID_TOKEN',
      message: 'Token QR inconnu ou signature invalide.',
    });
  }

  if (record.status === 'ALREADY_USED') {
    return res.status(409).json({
      outcome: 'REJECTED_ALREADY_SCANNED',
      message: `Entrée refusée : ce billet a déjà été validé à ${record.scannedAt}.`,
      ticket: record,
    });
  }

  if (record.status === 'CANCELLED') {
    return res.status(403).json({
      outcome: 'CANCELLED',
      message: 'Entrée refusée : billet annulé.',
      ticket: record,
    });
  }

  // Atomic state transition
  const nowISO = new Date().toISOString();
  record.status = 'ALREADY_USED';
  record.scannedAt = nowISO;
  ticketLedger.set(cleanToken, record);

  return res.json({
    outcome: 'ACCEPTED_FIRST_SCAN',
    message: 'Entrée autorisée. Statut verrouillé sur ALREADY_USED.',
    ticket: record,
  });
});

/**
 * 3. PAYMENT WEBHOOK ENDPOINT (HMAC SIGNATURE + IDEMPOTENCY SKELETON)
 * Ready to connect to Stripe / CinetPay / Flutterwave.
 */
app.post('/api/webhooks/payment', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(503).json({
      received: false,
      reason: 'PAYMENT_WEBHOOK_SECRET non configuré (Mode préproduction).',
    });
  }

  if (typeof signature !== 'string') {
    return res.status(401).json({
      received: false,
      reason: 'Signature HMAC manquante.',
    });
  }

  const payloadString = JSON.stringify(req.body || {});
  const expectedSig = crypto
    .createHmac('sha256', webhookSecret)
    .update(payloadString)
    .digest('hex');

  if (signature !== expectedSig) {
    return res.status(401).json({
      received: false,
      reason: 'Signature HMAC invalide.',
    });
  }

  const eventId = String(req.body?.eventId || '');
  if (eventId && processedWebhookEventIds.has(eventId)) {
    return res.status(200).json({
      received: true,
      idempotentReplay: true,
    });
  }

  if (eventId) {
    processedWebhookEventIds.add(eventId);
  }

  return res.status(200).json({
    received: true,
    idempotentReplay: false,
  });
});

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
