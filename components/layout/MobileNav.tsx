"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { getCategories } from "@/lib/products";
import { useUI } from "@/lib/store";

export function MobileNav() {
  const open = useUI((state) => state.mobileNavOpen);
  const setOpen = useUI((state) => state.setMobileNav);
  const openInquiry = useUI((state) => state.openInquiry);
  const categories = getCategories();

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      title="Menu"
      side="left"
    >
      <nav className="space-y-1">
        <Link
          href="/products"
          onClick={() => setOpen(false)}
          className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg transition hover:bg-sand-100"
        >
          Shop all
          <ArrowRight size={17} className="text-clay-600" />
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg transition hover:bg-sand-100"
          >
            {category.name}
            <ArrowRight size={17} className="text-clay-600" />
          </Link>
        ))}
      </nav>

      <div className="my-6 h-px bg-line" />

      <nav className="space-y-1">
        {[
          { href: "/rooms", label: "Rooms" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="block rounded-2xl px-4 py-3 text-base text-sand-700 transition hover:bg-sand-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => {
          setOpen(false);
          openInquiry();
        }}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-medium text-cream"
      >
        <Phone size={16} />
        Book a showroom visit
      </button>
    </Drawer>
  );
}
