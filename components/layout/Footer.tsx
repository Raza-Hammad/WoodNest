import Link from "next/link";
import {
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getCategories } from "@/lib/products";
import { NewsletterForm } from "./NewsletterForm";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

const PROMISES = [
  { icon: Truck, title: "Free city delivery", copy: "On orders over Rs 50,000" },
  { icon: ShieldCheck, title: "10-year warranty", copy: "On all solid-wood frames" },
  { icon: Leaf, title: "FSC timber", copy: "Responsibly sourced, always" },
];

export function Footer() {
  const categories = getCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-sand-50">
      <div className="container-x">
        <div className="grid gap-4 border-b border-line py-10 sm:grid-cols-3">
          {PROMISES.map((promise) => (
            <div key={promise.title} className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-clay-100 text-clay-700">
                <promise.icon size={19} />
              </span>
              <div>
                <p className="text-sm font-medium">{promise.title}</p>
                <p className="text-xs text-sand-600">{promise.copy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-ink font-serif text-lg text-cream">
                W
              </span>
              <span className="font-serif text-xl tracking-tight">
                Wood<span className="text-clay-600">Nest</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand-600">
              Solid-wood furniture made in our own workshop, designed to be handed
              down rather than replaced.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[InstagramIcon, FacebookIcon].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="Social profile"
                  className="grid size-10 place-items-center rounded-full border border-line text-sand-700 transition hover:border-ink hover:text-ink"
                >
                  <Icon width={17} height={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.24em] text-sand-500 uppercase">
              Collections
            </p>
            <ul className="mt-5 space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-sm text-sand-700 transition hover:text-ink"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.24em] text-sand-500 uppercase">
              Company
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/products", label: "Shop all" },
                { href: "/rooms", label: "Room inspiration" },
                { href: "/about", label: "Our workshop" },
                { href: "/contact", label: "Visit a showroom" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-sand-700 transition hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.24em] text-sand-500 uppercase">
              Stay in the loop
            </p>
            <p className="mt-5 text-sm text-sand-600">
              New pieces, workshop notes and early access. One email a month.
            </p>
            <NewsletterForm />

            <ul className="mt-7 space-y-3 text-sm text-sand-700">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-clay-600" />
                +92 300 000 0000
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-clay-600" />
                hello@woodnest.pk
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-clay-600" />
                <span>Gulberg III, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-7 text-xs text-sand-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} WoodNest Furniture. All rights reserved.</p>
          <p>
            This is a demo store — products and prices are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
