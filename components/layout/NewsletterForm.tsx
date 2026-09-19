"use client";

import { Check, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center gap-2 rounded-full border border-line bg-cream p-1.5 focus-within:border-clay-400">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-sand-400"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-cream transition hover:bg-sand-800"
        >
          {done ? <Check size={16} /> : <Send size={15} />}
        </button>
      </div>
      <p className="mt-2 h-4 text-xs text-forest-600">
        {done ? "Thanks — you are on the list." : ""}
      </p>
    </form>
  );
}
