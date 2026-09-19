"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Box } from "lucide-react";
import { ProductImage } from "@/components/art/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { getProductBySlug } from "@/lib/products";

const STATS = [
  { value: "16", label: "Pieces in the range" },
  { value: "38 yrs", label: "In the workshop" },
  { value: "10 yr", label: "Frame warranty" },
];

export function Hero() {
  const sofa = getProductBySlug("marlow-3-seater-sofa");
  const lamp = getProductBySlug("farrow-arc-floor-lamp");
  const chair = getProductBySlug("bramble-accent-chair");

  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 size-[34rem] rounded-full bg-clay-200/45 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-32 size-[26rem] rounded-full bg-forest-500/15 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-cream/70 px-4 py-2 text-xs tracking-wide text-sand-600 backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-forest-500" />
            Made in our own workshop, not a warehouse
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Furniture you&apos;ll want to{" "}
            <span className="italic text-clay-600">hand down</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-base leading-relaxed text-sand-600 sm:text-lg"
          >
            Solid oak, ash and teak — plus fabrics you actually want to touch.
            Rotate any piece in 3D, then place it in your own room with AR before
            you spend a rupee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/products" size="lg">
              Shop the collection
              <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink href="/products?sort=featured" size="lg" variant="outline">
              <Box size={17} />
              See a piece in 3D &amp; AR
            </ButtonLink>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-3xl tracking-tight">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-sand-500">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-4/5 overflow-hidden rounded-5xl border border-line shadow-soft"
          >
            <ProductImage
              src={sofa?.images?.[0]}
              art={sofa?.art ?? { kind: "sofa", tone: 0 }}
              alt={sofa?.name ?? "Solid-wood sofa"}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-6 -left-6 w-32 overflow-hidden rounded-4xl border-4 border-cream shadow-lift sm:w-40"
          >
            <div className="aspect-square">
              <ProductImage
                src={lamp?.images?.[0]}
                art={lamp?.art ?? { kind: "lamp", tone: 4 }}
                alt={lamp?.name ?? "Floor lamp"}
                sizes="160px"
              />
            </div>
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            className="absolute -top-5 -right-5 w-28 overflow-hidden rounded-4xl border-4 border-cream shadow-lift sm:w-36"
          >
            <div className="aspect-square">
              <ProductImage
                src={chair?.images?.[0]}
                art={chair?.art ?? { kind: "armchair", tone: 5 }}
                alt={chair?.name ?? "Accent chair"}
                sizes="144px"
              />
            </div>
          </motion.div>

          <div className="absolute -right-2 bottom-16 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-medium text-cream shadow-lift">
            <Box size={14} />
            Drag any piece to rotate
          </div>
        </div>
      </div>
    </section>
  );
}
