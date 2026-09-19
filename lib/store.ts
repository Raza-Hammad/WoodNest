"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((value) => value !== id)
            : [...state.ids, id],
        })),
      remove: (id) =>
        set((state) => ({ ids: state.ids.filter((value) => value !== id) })),
      clear: () => set({ ids: [] }),
    }),
    { name: "woodnest-wishlist" },
  ),
);

/** True once the persisted store has rehydrated on the client. */
export function useWishlistReady() {
  return useSyncExternalStore(
    (onChange) => useWishlist.persist.onFinishHydration(onChange),
    () => useWishlist.persist.hasHydrated(),
    () => false,
  );
}

type UIState = {
  mobileNavOpen: boolean;
  wishlistOpen: boolean;
  inquiryOpen: boolean;
  inquiryProductSlug: string | null;
  inquiryProductName: string | null;
  toast: string | null;
  setMobileNav: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  openInquiry: (payload?: { slug?: string; name?: string }) => void;
  closeInquiry: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
};

export const useUI = create<UIState>((set) => ({
  mobileNavOpen: false,
  wishlistOpen: false,
  inquiryOpen: false,
  inquiryProductSlug: null,
  inquiryProductName: null,
  toast: null,
  setMobileNav: (open) => set({ mobileNavOpen: open }),
  setWishlistOpen: (open) => set({ wishlistOpen: open }),
  openInquiry: (payload) =>
    set({
      inquiryOpen: true,
      inquiryProductSlug: payload?.slug ?? null,
      inquiryProductName: payload?.name ?? null,
    }),
  closeInquiry: () => set({ inquiryOpen: false }),
  showToast: (message) => set({ toast: message }),
  clearToast: () => set({ toast: null }),
}));
