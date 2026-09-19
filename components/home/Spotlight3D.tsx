"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Move3d } from "lucide-react";
import { ProductImage } from "@/components/art/ProductImage";
import { ModelViewer } from "@/components/three/ModelViewer";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { formatDimensions, formatPrice, productPrice } from "@/lib/format";
import { getProductsWithModels } from "@/lib/products";

export function Spotlight3D() {
  const products = getProductsWithModels();
  const [activeId, setActiveId] = useState(products[0]?.id ?? null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const active = products.find((item) => item.id === activeId) ?? products[0];
  if (!active) return null;

  const model = active.model3d;
  const price = productPrice(active.price, active.salePrice);

  return (
    <section ref={sectionRef} className="border-y border-line bg-sand-50">
      <div className="container-x py-24">
        <SectionHeading
          eyebrow="Try before you buy"
          title="Turn it around. Then put it in your room."
          description="Every 3D piece opens with real materials and true proportions. On a phone, tap through to AR and place it on your own floor at full scale."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            {inView && model ? (
              <ModelViewer
                key={active.id}
                glb={model.glb}
                usdz={model.usdz}
                cameraOrbit={model.cameraOrbit}
                cameraTarget={model.cameraTarget}
                hotspots={model.hotspots}
                poster={active.art}
                alt={active.name}
                className="aspect-square"
              />
            ) : (
              <div className="relative aspect-square overflow-hidden rounded-4xl border border-line">
                <ProductImage
                  src={active.images?.[0]}
                  art={active.art}
                  alt={active.name}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 grid place-items-center bg-cream/40 backdrop-blur-[1px]">
                  <span className="flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2.5 text-xs font-medium">
                    <Box size={14} className="text-clay-600" />
                    Loading 3D viewer…
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-sand-500 uppercase">
              <Move3d size={14} className="text-clay-600" />
              Drag, spin, zoom
            </div>

            <h3 className="mt-5 font-serif text-3xl tracking-tight">
              {active.name}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-sand-600">
              {active.shortDescription}
            </p>
            <p className="mt-4 text-2xl font-medium tracking-tight">
              {formatPrice(price, active.currency)}
            </p>
            <p className="mt-2 text-xs text-sand-500">
              {formatDimensions(active.dimensions)} ·{" "}
              {active.materials.slice(0, 2).join(" · ")}
            </p>

            <div className="mt-8 space-y-2">
              {products.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-3xl border p-3 text-left transition",
                    item.id === active.id
                      ? "border-ink bg-cream shadow-soft"
                      : "border-line hover:border-sand-400",
                  )}
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl">
                    <ProductImage
                      src={item.images?.[0]}
                      art={item.art}
                      alt={item.name}
                      sizes="56px"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-sand-500">
                      {formatPrice(
                        productPrice(item.price, item.salePrice),
                        item.currency,
                      )}
                    </span>
                  </span>
                  <Box
                    size={16}
                    className={cn(
                      "shrink-0",
                      item.id === active.id ? "text-clay-600" : "text-sand-400",
                    )}
                  />
                </button>
              ))}
            </div>

            <ButtonLink
              href={`/products/${active.slug}`}
              variant="outline"
              size="lg"
              className="mt-8 w-full sm:w-auto"
            >
              Open the full 3D &amp; AR view
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
