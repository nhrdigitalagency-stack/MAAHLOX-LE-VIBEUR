# MAAHLOX LE VIBEUR — Concept de Portfolio Musical, Billetterie & Merchandising

> **Statut éditorial et juridique :** Ce projet est un **concept de portfolio, billetterie et boutique en attente de validation par l’artiste et son management**. Il ne s’affiche jamais comme « site officiel » ni « boutique officielle » tant que cette autorisation explicite n’a pas été fournie.

---

## 1. Architecture & Configuration Centralisée (`src/data/`)

Toutes les données éditoriales, les feature flags et les modes d'environnement sont centralisés dans `src/data/` :

- **`src/data/siteConfig.ts`** :
  - Mode d'environnement (`environmentMode: 'preview' | 'production'`) commutable en temps réel dans l'interface pour inspecter le comportement de préproduction vs production.
  - Feature flags : `enableTickets`, `enableShop`, `enableCheckout`, `enableSocialSection`.
  - Navigation du Header Bubble (`#univers`, `#biographie`, `#musique`, `#clips`, `#concerts`, `#boutique`, `#booking`).
- **`src/data/socials.ts`** :
  - Structure typée (`platform`, `label`, `url`, `verificationStatus`, `enabled`, `displayOrder`).
  - **Facebook** (`https://www.facebook.com/MaahloxOfficiel/`) — activé.
  - **YouTube** (`https://www.youtube.com/channel/UCat6V_NP3w_cFCnmqJeJ7Qg`) — activé + carte dédiée dans la section Clips.
  - **SoundCloud** (`https://soundcloud.com/maahlox`) — activé avec mention de lien historique à revalider.
  - **Instagram** (`https://www.instagram.com/maahlox_officiel/` vs historique `https://www.instagram.com/maahloxofficiel/`) — désactivé en production tant que le compte actif n'est pas tranché par le management.
  - **TikTok** — aucune URL confirmée (icône jamais affichée).
- **`src/data/events.ts`** :
  - Schéma complet à 18 champs (`id`, `slug`, `title`, `artist`, `date`, `doorsOpen`, `city`, `country`, `venue`, `address`, `status`, `ticketMode`, `externalTicketUrl`, `ticketCategories`, `currency`, `posterImage`, `description`, `published`).
  - Aucun concert fictif n'est publié (`published: true` vide par défaut). État vide sobre : *« Les prochaines dates seront annoncées ici. »*
  - En mode `preview`, simulateur d'architecture pour le **Mode A** (redirection billetterie externe) et le **Mode B** (billet QR à token opaque unique + contrôle d'entrée atomique via `POST /api/tickets/verify-qr`).
- **`src/data/products.ts` & `src/data/shipping.ts`** :
  - Schéma complet à 16 champs (`id`, `slug`, `name`, `category`, `status`, `price`, `currency`, `images`, `colors`, `sizes`, `stockByVariant`, `shortDescription`, `fullDescription`, `careInstructions`, `shippingNote`, `featured`).
  - 4 concepts visuels en mode `preview` (*T-shirt Oversize « Ça sort comme ça sort »*, *Hoodie « Le Vibeur »*, *Casquette « 237 Vibe »*, *Affiche Typographique « La Vibration en Grand »*), tous marqués **« Concept — non disponible à la vente »**.
  - En mode `production`, les concepts non validés sont automatiquement masqués (`getVisibleProducts('production')` renvoie `[]`).

---

## 2. Endpoints Backend (`server.ts`)

Le serveur Express + Vite (`server.ts`) expose trois routes de sécurité et de validation côté serveur :

1. **`POST /api/shop/validate-cart`** : Recalcule les prix unitaires et le sous-total à partir de `src/data/products.ts` sans jamais faire confiance aux montants envoyés par le navigateur, et vérifie la disponibilité par variante (`stockByVariant`).
2. **`POST /api/tickets/verify-qr`** : Vérifie atomiquement un token QR opaque (`MLV-TKT-8F92A4C1-90E2`) et verrouille son état de `VALID` à `ALREADY_USED` dès le premier scan.
3. **`POST /api/webhooks/payment`** : Squelette de vérification de signature HMAC (`x-webhook-signature`) et d'idempotence prêt à recevoir les webhooks Stripe, CinetPay ou Flutterwave.

---

## 3. Commandes de développement & vérification

```bash
# Démarrer le serveur full-stack (Express + Vite) sur le port 3000
npm run dev

# Vérifier le typage TypeScript
npm run lint

# Compiler le bundle de production
npm run build
```
