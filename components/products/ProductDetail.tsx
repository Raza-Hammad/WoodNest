"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Box,
  Camera,
  Check,
  Leaf,
  Ruler,
  ShieldCheck,
  Share2,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { ModelViewer } from "@/components/three/ModelViewer";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/cn";
import {
  discountPercent,
  formatDimensions,
  formatPrice,
  productPrice,
} from "@/lib/format";
import { useUI } from "@/lib/store";
import type { Product } from "@/lib/types";
import { ImageGallery } from "./ImageGallery";
import { WishlistButton } from "./WishlistButton";

const PROMISES = [
  { icon: Truck, label: "Free city delivery" },
  { icon: ShieldCheck, label: "10-year frame warranty" },
  { icon: Leaf, label: "FSC-certified timber" },
];

export function ProductDetail({ product }: { product: Product }) {
  const has3D = Boolean(product.model3d);
  const [mode, setMode] = useState<"3d" | "photos">(has3D ? "3d" : "photos");
  const [variantId, setVariantId] = useState<string | null>(
    product.variants?.[0]?.id ?? null,
  );

  const showToast = useUI((state) => state.showToast);
  const openInquiry = useUI((state) => state.openInquiry);

  const variant =
    product.variants?.find((item) => item.id === variantId) ?? null;
  const tone = variant?.tone ?? product.art.tone;
  const glb = variant?.model ?? product.model3d?.glb;

  const delta = variant?.priceDelta ?? 0;
  const price = productPrice(product.price, product.salePrice) + delta;
  const wasPrice = product.salePrice ? product.price + delta : undefined;
  const discount = discountPercent(product.price, product.salePrice);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Could not share this link");
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        {has3D ? (
          <div className="mb-4 inline-flex rounded-full border border-line bg-sand-50 p-1">
            {(
              [
                { key: "3d", label: "3D & AR", icon: Box },
                { key: "photos", label: "Photos", icon: Camera },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setMode(tab.key)}
                aria-pressed={mode === tab.key}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                  mode === tab.key
                    ? "bg-ink text-cream"
                    : "text-sand-600 hover:text-ink",
                )}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        ) : null}

        <AnimatePresence mode="wait" initial={false}>
          {mode === "3d" && glb ? (
            <motion.div
              key={`3d-${glb}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ModelViewer
                key={glb}
                glb={glb}
                usdz={product.model3d?.usdz}
                cameraOrbit={product.model3d?.cameraOrbit}
                cameraTarget={product.model3d?.cameraTarget}
                fieldOfView={product.model3d?.fieldOfView}
                hotspots={product.model3d?.hotspots}
                poster={{ kind: product.art.kind, tone }}
                posterImage={product.images?.[0]}
                alt={product.name}
                className="aspect-4/5"
              />
            </motion.div>
          ) : (
            <motion.div
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ImageGallery
                art={product.art}
                tone={tone}
                alt={product.name}
                images={product.images}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {PROMISES.map((promise) => (
            <div
              key={promise.label}
              className="flex items-center gap-2.5 rounded-2xl border border-line px-4 py-3"
            >
              <promise.icon size={16} className="shrink-0 text-clay-600" />
              <span className="text-xs text-sand-700">{promise.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="clay">{product.subcategory ?? product.category}</Badge>
          {discount > 0 ? <Badge tone="sale">−{discount}% this month</Badge> : null}
          {!product.inStock ? (
            <Badge tone="neutral">Made to order</Badge>
          ) : null}
        </div>

        <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <StarRating
            rating={product.rating}
            reviews={product.reviewsCount}
            size={16}
          />
        </div>

        <div className="mt-6 flex items-end gap-3">
          <p className="text-3xl font-medium tracking-tight">
            {formatPrice(price, product.currency)}
          </p>
          {wasPrice ? (
            <p className="pb-1 text-base text-sand-500 line-through">
              {formatPrice(wasPrice, product.currency)}
            </p>
          ) : null}
        </div>
        <p className="mt-1.5 text-xs text-sand-500">
          Includes delivery within the city. Custom sizes quoted on request.
        </p>

        <p className="mt-7 text-[15px] leading-relaxed text-sand-700">
          {product.shortDescription}
        </p>

        {product.variants?.length ? (
          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-medium tracking-[0.2em] text-sand-500 uppercase">
                Finish
              </p>
              <p className="text-sm text-sand-700">
                {variant?.label}
                {variant && variant.priceDelta !== 0 ? (
                  <span className="ml-2 text-xs text-sand-500">
                    {variant.priceDelta > 0 ? "+" : "−"}
                    {formatPrice(Math.abs(variant.priceDelta), product.currency)}
                  </span>
                ) : null}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-3">
              {product.variants.map((item) => {
                const active = item.id === variantId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVariantId(item.id)}
                    aria-pressed={active}
                    title={item.label}
                    className={cn(
                      "relative grid size-10 place-items-center rounded-full border transition",
                      active
                        ? "border-ink ring-2 ring-ink/20 ring-offset-2 ring-offset-cream"
                        : "border-ink/10 hover:scale-105",
                    )}
                    style={{ backgroundColor: item.hex }}
                  >
                    {active ? (
                      <Check
                        size={15}
                        strokeWidth={3}
                        className="text-cream mix-blend-difference"
                      />
                    ) : null}
                    <span className="sr-only">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            className="flex-1 sm:flex-none"
            onClick={() =>
              openInquiry({ slug: product.slug, name: product.name })
            }
          >
            Request price &amp; availability
          </Button>
          <WishlistButton
            productId={product.id}
            productName={product.name}
            variant="outline"
          />
          <button
            type="button"
            onClick={share}
            aria-label="Share this piece"
            className="grid size-11 place-items-center rounded-full border border-line transition hover:border-ink"
          >
            <Share2 size={16} />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sand-600">
          <span className="flex items-center gap-2">
            <Ruler size={15} className="text-clay-600" />
            {formatDimensions(product.dimensions)}
          </span>
          <span className="flex items-center gap-2">
            <Box size={15} className="text-clay-600" />
            {product.materials.slice(0, 2).join(" · ")}
          </span>
        </div>

        <div className="mt-10">
          <Accordion
            items={[
              {
                title: "Description",
                content: (
                  <div className="space-y-4">
                    <p>{product.description}</p>
                    {product.story ? (
                      <p className="text-ink/80 italic">{product.story}</p>
                    ) : null}
                  </div>
                ),
              },
              {
                title: "Dimensions & materials",
                content: (
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <Row label="Size" value={formatDimensions(product.dimensions)} />
                    <Row label="Materials" value={product.materials.join(", ")} />
                    <Row label="Colours" value={product.colors.join(", ")} />
                    <Row
                      label="Availability"
                      value={product.inStock ? "In stock" : "Made to order"}
                    />
                  </dl>
                ),
              },
              {
                title: "Delivery & assembly",
                content: (
                  <ul className="space-y-2">
                    {[
                      "Free delivery within the city on every order.",
                      "Nationwide delivery in 5–9 working days.",
                      "Two-person assembly included at no extra cost.",
                      "We take away all packaging for recycling.",
                    ].map((line) => (
                      <li key={line} className="flex gap-2.5">
                        <Check size={15} className="mt-0.5 shrink-0 text-forest-600" />
                        {line}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                title: "Care & warranty",
                content: (
                  <ul className="space-y-2">
                    {[
                      "Wipe solid wood with a dry cloth; refresh with hard-wax oil yearly.",
                      "Fabric covers are removable and machine washable at 30°C.",
                      "10-year warranty on frames, 5 years on upholstery.",
                    ].map((line) => (
                      <li key={line} className="flex gap-2.5">
                        <Check size={15} className="mt-0.5 shrink-0 text-forest-600" />
                        {line}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-wide text-sand-500 uppercase">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{value}</dd>
    </div>
  );
}
