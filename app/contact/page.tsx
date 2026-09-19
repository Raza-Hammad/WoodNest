import { Clock, Mail, MapPin, ParkingCircle, Phone } from "lucide-react";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Visit or contact us",
  description:
    "Book a showroom visit in Lahore, request a quote, or ask us whether a piece will fit your room. We reply within one working day.",
};

const DETAILS = [
  {
    icon: MapPin,
    label: "Showroom",
    value: "24-C Main Boulevard, Gulberg III, Lahore",
  },
  { icon: Phone, label: "Phone", value: "+92 300 000 0000" },
  { icon: Mail, label: "Email", value: "hello@woodnest.pk" },
  { icon: Clock, label: "Open", value: "Mon–Sun, 11:00am – 9:00pm" },
  { icon: ParkingCircle, label: "Parking", value: "Free on-site, 20 spaces" },
];

export default function ContactPage() {
  return (
    <div className="container-x pt-14 pb-24">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-medium tracking-[0.28em] text-clay-600 uppercase">
            Say hello
          </p>
          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
            Tell us about the room you&apos;re furnishing
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-sand-600">
            Send measurements, a floor plan, or just a photo of the space. One of
            our makers will come back with sizes, finishes and a realistic
            delivery date.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            <Badge tone="forest">Replies in 1 working day</Badge>
            <Badge tone="clay">Free size consultation</Badge>
            <Badge tone="neutral">Nationwide delivery</Badge>
          </div>

          <dl className="mt-12 space-y-6">
            {DETAILS.map((detail) => (
              <div key={detail.label} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sand-100 text-clay-700">
                  <detail.icon size={17} />
                </span>
                <div>
                  <dt className="text-xs tracking-[0.18em] text-sand-500 uppercase">
                    {detail.label}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{detail.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-12 overflow-hidden rounded-4xl border border-line">
            <div className="relative h-44 bg-linear-to-br from-sand-200 via-sand-100 to-clay-100 grain">
              <div className="absolute inset-0 opacity-70">
                <svg viewBox="0 0 400 176" className="h-full w-full" aria-hidden>
                  <path
                    d="M0 120 L400 96"
                    stroke="#b3a899"
                    strokeWidth="10"
                    fill="none"
                  />
                  <path
                    d="M120 176 L150 0"
                    stroke="#d5ccc0"
                    strokeWidth="8"
                    fill="none"
                  />
                  <path
                    d="M0 40 L400 24"
                    stroke="#d5ccc0"
                    strokeWidth="5"
                    fill="none"
                  />
                </svg>
              </div>
              <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-clay-600 text-cream shadow-lift">
                <MapPin size={20} />
              </span>
            </div>
          </div>
        </div>

        <div className="lg:pt-16">
          <div className="rounded-5xl border border-line bg-sand-50 p-7 shadow-soft md:p-9">
            <InquiryForm />
          </div>
          <p className="mt-5 px-2 text-xs text-sand-500">
            Prefer to talk? The workshop phone is answered by whoever is at the
            bench — usually within three rings.
          </p>
        </div>
      </div>
    </div>
  );
}
