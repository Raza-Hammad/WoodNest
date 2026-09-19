"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFab({ phone = "923000000000" }: { phone?: string }) {
  const message = encodeURIComponent(
    "Hi WoodNest! I'd like to ask about a piece from your collection.",
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-90 flex items-center gap-2 rounded-full bg-forest-600 px-4 py-3.5 text-sm font-medium text-cream shadow-lift transition hover:-translate-y-0.5 hover:bg-forest-700"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
