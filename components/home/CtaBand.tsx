"use client";

import { CalendarClock, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUI } from "@/lib/store";

export function CtaBand() {
  const openInquiry = useUI((state) => state.openInquiry);

  return (
    <section className="container-x py-24">
      <div className="relative overflow-hidden rounded-5xl bg-ink px-8 py-16 text-cream md:px-16 md:py-20">
        <div className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-clay-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-10 size-72 rounded-full bg-forest-500/25 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs tracking-[0.28em] text-clay-300 uppercase">
              Not sure it will fit?
            </p>
            <h2 className="font-serif text-3xl leading-[1.08] tracking-tight text-balance sm:text-4xl md:text-5xl">
              Send us your room measurements — we&apos;ll tell you what fits.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/70">
              One of our makers will reply with sizes, fabric options and a
              delivery date. No showroom pressure, no upselling.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full bg-cream text-ink hover:bg-clay-100 hover:text-ink"
              onClick={() => openInquiry()}
            >
              <CalendarClock size={17} />
              Book a showroom visit
            </Button>
            <a
              href="tel:+923000000000"
              className="flex h-13 w-full items-center justify-center gap-2 rounded-full border border-cream/25 text-sm font-medium transition hover:bg-cream/10"
            >
              <Phone size={16} />
              Call the workshop
            </a>
            <p className="flex items-center justify-center gap-2 text-xs text-cream/55">
              <MessageCircle size={13} />
              Or message us on WhatsApp — usually a reply within an hour.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
