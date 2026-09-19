"use client";

import { Drawer } from "@/components/ui/Drawer";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { useUI } from "@/lib/store";

export function InquiryDrawer() {
  const open = useUI((state) => state.inquiryOpen);
  const close = useUI((state) => state.closeInquiry);
  const productName = useUI((state) => state.inquiryProductName);

  return (
    <Drawer
      open={open}
      onClose={close}
      title={productName ? "Ask about this piece" : "Book a visit"}
      description={
        productName
          ? "Send us a note and we will reply with pricing, lead time and fabric options."
          : "Tell us what you are looking for and we will get back to you."
      }
    >
      <InquiryForm productName={productName} />
    </Drawer>
  );
}
