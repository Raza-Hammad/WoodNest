"use client";

import { InquiryDrawer } from "@/components/inquiry/InquiryDrawer";
import { WhatsAppFab } from "@/components/inquiry/WhatsAppFab";
import { MobileNav } from "@/components/layout/MobileNav";
import { Toast } from "@/components/layout/Toast";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";

export function Overlays() {
  return (
    <>
      <MobileNav />
      <WishlistDrawer />
      <InquiryDrawer />
      <Toast />
      <WhatsAppFab />
    </>
  );
}
