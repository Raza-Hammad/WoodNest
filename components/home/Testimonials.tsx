import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const QUOTES = [
  {
    quote:
      "The Marlow sofa has survived two toddlers and a golden retriever. The fabric still looks new and the frame hasn't creaked once.",
    name: "Hina Raza",
    detail: "Marlow 3-Seater · Lahore",
  },
  {
    quote:
      "I used the AR view to check the dining table would actually fit before ordering. It arrived exactly the size I'd measured in my kitchen.",
    name: "Bilal Ahmed",
    detail: "Rook Dining Table · Karachi",
  },
  {
    quote:
      "You can feel the joinery. Nothing about it feels like flat-pack furniture pretending to be an heirloom.",
    name: "Sana Iqbal",
    detail: "Ashcroft Bed Frame · Islamabad",
  },
];

export function Testimonials() {
  return (
    <section className="container-x py-24">
      <SectionHeading
        align="center"
        eyebrow="From the people who live with it"
        title="Bought once, kept for years"
        description="Over 1,900 pieces delivered, and a returns rate under two percent."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {QUOTES.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <figure className="flex h-full flex-col rounded-4xl border border-line bg-sand-50 p-7">
              <div className="flex gap-0.5 text-clay-500" aria-hidden>
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={15} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-sand-700">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-5">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="mt-0.5 text-xs text-sand-500">{item.detail}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
