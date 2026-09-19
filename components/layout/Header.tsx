"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, Menu, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { getCategories } from "@/lib/products";
import { useUI, useWishlist, useWishlistReady } from "@/lib/store";

const NAV = [
  { href: "/products", label: "Shop all" },
  { href: "/rooms", label: "Rooms" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const categories = getCategories();
  const wishlistCount = useWishlist((state) => state.ids.length);
  const wishlistReady = useWishlistReady();
  const setMobileNav = useUI((state) => state.setMobileNav);
  const setWishlistOpen = useUI((state) => state.setWishlistOpen);
  const openInquiry = useUI((state) => state.openInquiry);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-cream/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-18 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileNav(true)}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full transition hover:bg-sand-100 lg:hidden"
          >
            <Menu size={19} />
          </button>

          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-ink font-serif text-lg text-cream">
              W
            </span>
            <span className="font-serif text-xl tracking-tight">
              Wood<span className="text-clay-600">Nest</span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCollectionsOpen((value) => !value)}
              aria-expanded={collectionsOpen}
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm text-sand-700 transition hover:bg-sand-100 hover:text-ink"
            >
              Collections
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform duration-300",
                  collectionsOpen && "rotate-180",
                )}
              />
            </button>

            <div
              className={cn(
                "absolute top-full left-0 w-64 pt-3 transition-all duration-200",
                collectionsOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0",
              )}
            >
              <div className="overflow-hidden rounded-3xl border border-line bg-cream p-2 shadow-lift">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    onClick={() => setCollectionsOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition hover:bg-sand-100"
                  >
                    <span>
                      <span className="block text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="block text-xs text-sand-500">
                        {category.tagline}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm transition hover:bg-sand-100",
                pathname === item.href
                  ? "text-ink"
                  : "text-sand-700 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/products"
            aria-label="Search furniture"
            className="grid size-10 place-items-center rounded-full transition hover:bg-sand-100"
          >
            <Search size={18} />
          </Link>

          <button
            type="button"
            onClick={() => setWishlistOpen(true)}
            aria-label="Open wishlist"
            className="relative grid size-10 place-items-center rounded-full transition hover:bg-sand-100"
          >
            <Heart size={18} />
            {wishlistReady && wishlistCount > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-clay-600 text-[10px] font-semibold text-cream">
                {wishlistCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => openInquiry()}
            className="ml-1 hidden h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-cream transition hover:bg-sand-800 sm:inline-flex"
          >
            Book a visit
          </button>
        </div>
      </div>
    </header>
  );
}
