# WoodNest — interactive furniture store

A highly interactive furniture-store catalogue built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. The headline feature is a real **3D product viewer with AR** — customers rotate a piece, then place it on their own floor at full scale before they buy.

This is a **catalogue + enquiry** store: no cart, no online payment. Customers browse, save pieces to a wishlist, and send an enquiry (or message on WhatsApp).

> Demo data. Product names, prices and copy are illustrative; brand name is a placeholder.

---

## Getting started

Requires **Node.js 20.9+**.

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run lint                 # ESLint (next lint was removed in Next 16)
npx tsc --noEmit             # type check
```

---

## What's interactive

**3D & AR (the flagship)**
- Products with a 3D model (7 of 16 today) open on a draggable, zoomable `<model-viewer>` canvas with auto-rotate, reset, and a loading progress ring. The rest fall back to the photo gallery.
- **"View in your room"** launches AR — WebXR / Scene Viewer on Android, Quick Look on iOS (needs USDZ).
- On desktop, where AR isn't available, the button switches to a **QR code** that opens the same page on a phone.
- Variant swatches can swap the 3D model and the price live.
- The 3D library (~1 MB) is **lazily imported** so it never lands in the main bundle, and the viewer only mounts on scroll.
- If a model fails to load, it falls back to the image gallery.

**Shoppable room scenes** — `/rooms` draws each room from individual furniture pieces and pins hotspot dots using the same scene coordinates as the artwork, so markers always land on the right item. Click a dot to jump to that product.

**Catalogue** — instant client-side search, filters (category, price range, material, colour, availability), five sort modes, removable filter chips, URL-synced state (shareable links) and an empty state.

**Wishlist** — persisted in `localStorage` via Zustand, with a header count and a slide-in drawer.

**Enquiries** — a drawer form that POSTs to `app/api/inquiry/route.ts` (validated, currently logged — swap in email/CRM later) plus a floating WhatsApp deep link.

**Motion** — parallax hero, scroll reveals, hover lift on cards, page transitions, animated drawers and accordion, an infinite marquee. All of it respects `prefers-reduced-motion`.

---

## Project structure

```
app/
  layout.tsx              root layout, fonts, metadata, header/footer/overlays
  template.tsx            page-transition wrapper
  page.tsx                home
  products/               catalogue + product detail (3D/AR)
  categories/[slug]/      category listing
  rooms/ about/ contact/  content pages
  api/inquiry/route.ts    enquiry endpoint
components/
  art/       generated SVG product artwork + room scenes
  home/      hero, category grid, bestsellers, 3D spotlight, rooms, testimonials, CTA
  products/  card, grid, catalog browser, filter panel, gallery, detail
  three/     ModelViewer, AR prompt (QR)
  layout/    header, footer, mobile nav, overlays, toast
  inquiry/   form, drawer, WhatsApp FAB
  ui/        button, badge, drawer, accordion, rating, reveal, skeleton
data/        products.json, categories.json, rooms.json
lib/         types, products, filters, format, store, cn, model-viewer types
```

---

## Data

Everything comes from three JSON files in `data/` read through `lib/products.ts` — no database. To move to a CMS or API, change only that module:

- `products.json` — 16 products across 6 categories; `model3d` and `images` are optional.
- `categories.json` — the six collections.
- `rooms.json` — scene layout: each room declares `tone` (backdrop palette) and `pieces[]` with `x` (scene centre), `scale`, `dy` and `hotY` (hotspot position). All in a 400×500 scene space with the floor at `y=350`.

### Product photos

All 16 products ship with real photos in `public/images/products/<slug>/`, downloaded from
**Unsplash** (free tier — `premium`/Unsplash+ results are filtered out, since those come back
watermarked). The [Unsplash License](https://unsplash.com/license) allows commercial use without
attribution. The catalog cover image is not committed anywhere else, so everything works offline.

`components/art/ProductImage.tsx` renders `product.images[0]` through `next/image` and falls back
to the generated SVG artwork when a product has no photo — so swapping in your own photography is
just a matter of replacing files in that folder. Generated artwork is still used for decorative
places (room scenes, category tiles without a product).

### 3D assets

`public/models/` ships seven CC0 models from the [Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets), so the viewer and AR path work out of the box:

| Product | Model |
|---|---|
| Marlow 3-Seater Sofa | `GlamVelvetSofa.glb` |
| Cove Modular Sofa | `SheenWoodLeatherSofa.glb` |
| Halden Lounge Chair | `SheenChair.glb` |
| Juniper Armchair | `ChairDamaskPurplegold.glb` |
| Farrow Arc Floor Lamp | `AnisotropyBarnLamp.glb` |
| Solis Pendant Light | `IridescenceLamp.glb` |
| Tide Table Lamp | `LightsPunctualLamp.glb` |

**These are stand-ins, not the actual products.** Free furniture models that match a specific
catalogue item don't exist, so the model is the nearest available chair / sofa / lamp. Products
without a model fall back to the photo gallery. To ship real 3D you would either model each piece,
or generate a mesh from the product photo with a service such as Tripo / Meshy / Rodin.

For production 3D:

1. Drop `.glb` files in `public/models/` and reference them as `model3d.glb`.
2. Keep them small — `npx @gltf-transform/cli optimize in.glb out.glb --compress draco` took one of
   these from 9.9 MB to 1.1 MB with no visible quality loss. Draco is decoded by `model-viewer`.
3. Add a `.usdz` sibling and set `model3d.usdz` — **without it, iOS AR Quick Look will not launch**.
4. AR requires HTTPS on a real device. Use a tunnel (`ngrok`, `cloudflared`) when testing locally.

---

## Notes

- `params` and `searchParams` are Promises in Next 16 and are awaited with the global `PageProps<"/route">` helper.
- `app/products` is dynamic (it reads `searchParams`); category and product pages are statically generated via `generateStaticParams`.
- `ssr: false` dynamic imports are only allowed inside Client Components — that's why `ModelViewer` is a client component that imports `@google/model-viewer` in an effect.
- Enquiry submissions are logged to the server console; wire up email or a CRM in `app/api/inquiry/route.ts` before going live.
