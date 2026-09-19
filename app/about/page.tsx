import Link from "next/link";
import { Box, Compass, Hammer, HeartHandshake, Leaf, Ruler } from "lucide-react";
import { ProductImage } from "@/components/art/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getCategories, getProductBySlug } from "@/lib/products";

export const metadata = {
  title: "Our workshop",
  description:
    "WoodNest builds solid-wood furniture in Lahore — with a 10-year frame warranty, FSC-certified timber and a 3D preview for every piece.",
};

const VALUES = [
  {
    icon: Hammer,
    title: "Built, not assembled",
    copy: "Mortise-and-tenon joints, kiln-dried hardwood and finishes that can be repaired instead of replaced.",
  },
  {
    icon: Leaf,
    title: "Timber with a paper trail",
    copy: "Every board is FSC-certified and milled within 400km of the workshop. Offcuts become stools and samples.",
  },
  {
    icon: Ruler,
    title: "Made to your measurements",
    copy: "Send us your room dimensions and we will resize almost any piece — usually at no extra cost.",
  },
  {
    icon: Box,
    title: "See it before you buy",
    copy: "Every piece has a real 3D model with true proportions, plus AR so you can stand it in your own room.",
  },
];

const TIMELINE = [
  { year: "1988", text: "A two-man joinery shop opens on a side street in Lahore." },
  { year: "2004", text: "We stop importing frames and build every one ourselves." },
  { year: "2016", text: "The first AR preview goes live — customers stop guessing on sizes." },
  { year: "Today", text: "38 makers, one workshop, and a 10-year warranty on every frame." },
];

export default function AboutPage() {
  const categories = getCategories();
  const sideboard = getProductBySlug("vale-sideboard");
  const bench = getProductBySlug("wren-dining-chair");

  return (
    <div className="pb-24">
      <section className="container-x pt-14">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.28em] text-clay-600 uppercase">
              Since 1988
            </p>
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
              We build furniture the slow way, on purpose.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-sand-600">
              WoodNest started as a two-man joinery shop. Four decades later we
              still cut, joint, sand and finish everything under one roof — which
              is why the oak in your table matches the oak in your shelf, and why
              we can promise a frame for ten years.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/products" size="lg">
                Shop the collection
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outline">
                Visit the showroom
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-5xl border border-line shadow-soft">
              <ProductImage
                src={sideboard?.images?.[0]}
                art={sideboard?.art ?? { kind: "cabinet", tone: 2 }}
                alt={sideboard?.name ?? "Solid-wood sideboard"}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-36 overflow-hidden rounded-4xl border-4 border-cream shadow-lift">
              <div className="aspect-square">
                <ProductImage
                  src={bench?.images?.[0]}
                  art={bench?.art ?? { kind: "chair", tone: 3 }}
                  alt={bench?.name ?? "Wooden chair"}
                  sizes="144px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-28">
        <div className="grid gap-4 border-y border-line py-12 md:grid-cols-4">
          {[
            { value: "38", label: "Makers on the floor" },
            { value: "1,900+", label: "Pieces delivered" },
            { value: "10 yr", label: "Frame warranty" },
            { value: "1.8%", label: "Return rate" },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <div>
                <p className="font-serif text-4xl tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs tracking-wide text-sand-500 uppercase">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x mt-24">
        <h2 className="max-w-2xl font-serif text-3xl tracking-tight text-balance sm:text-4xl">
          Four promises we put in writing
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.06}>
              <div className="flex h-full gap-5 rounded-4xl border border-line bg-sand-50 p-7">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-clay-100 text-clay-700">
                  <value.icon size={19} />
                </span>
                <div>
                  <h3 className="text-base font-medium">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand-600">
                    {value.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x mt-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              How we got here
            </h2>
            <p className="mt-5 text-base leading-relaxed text-sand-600">
              No investors, no franchising, no flat-pack. Just a workshop that got
              better at one thing.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-sand-600">
              <Compass size={16} className="text-clay-600" />
              Gulberg III, Lahore — open daily, 11am to 9pm
            </div>
          </div>

          <ol className="relative border-l border-line pl-8">
            {TIMELINE.map((entry) => (
              <li key={entry.year} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] grid size-5 place-items-center rounded-full border border-line bg-cream">
                  <span className="size-1.5 rounded-full bg-clay-600" />
                </span>
                <p className="font-serif text-xl tracking-tight">{entry.year}</p>
                <p className="mt-2 text-sm leading-relaxed text-sand-600">
                  {entry.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x mt-24">
        <div className="flex flex-col gap-6 rounded-5xl border border-line bg-sand-50 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-serif text-3xl tracking-tight">
              Come and sit on it
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-sand-600">
              The showroom has every piece in every finish. Bring your floor plan
              and we will help you lay it out.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/products" size="lg" variant="outline">
              Browse the range
            </ButtonLink>
            <ButtonLink href="/contact" size="lg">
              <HeartHandshake size={17} />
              Plan a visit
            </ButtonLink>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="rounded-full border border-line px-4 py-2 text-xs text-sand-700 transition hover:border-ink hover:text-ink"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
