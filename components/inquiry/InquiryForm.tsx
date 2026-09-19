"use client";

import { Check, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type State = "idle" | "sending" | "sent" | "error";

export function InquiryForm({
  productName,
  onSent,
}: {
  productName?: string | null;
  onSent?: () => void;
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("sending");
    setError(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          message: data.get("message"),
          product: productName ?? null,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Something went wrong");
      }

      setState("sent");
      form.reset();
      onSent?.();
    } catch (cause) {
      setState("error");
      setError(cause instanceof Error ? cause.message : "Something went wrong");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-forest-500/15 text-forest-700">
          <Check size={22} />
        </span>
        <div>
          <p className="font-serif text-2xl">Message sent</p>
          <p className="mt-2 text-sm text-sand-600">
            We will get back to you within one working day with pricing and
            availability.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setState("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {productName ? (
        <div className="rounded-2xl border border-line bg-sand-50 px-4 py-3 text-sm">
          <span className="text-sand-500">About: </span>
          <span className="font-medium text-ink">{productName}</span>
        </div>
      ) : null}

      <Field label="Your name" name="name" required placeholder="Ayesha Khan" />
      <Field
        label="Phone / WhatsApp"
        name="phone"
        type="tel"
        required
        placeholder="+92 300 000 0000"
      />
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@email.com"
      />

      <div>
        <label
          htmlFor="inquiry-message"
          className="mb-1.5 block text-xs font-medium tracking-wide text-sand-600 uppercase"
        >
          Message
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          placeholder="Tell us about your space, sizes or timelines…"
          className="w-full resize-none rounded-2xl border border-line bg-cream px-4 py-3 text-sm outline-none transition placeholder:text-sand-400 focus:border-clay-400"
        />
      </div>

      {error ? (
        <p className="text-sm text-clay-700" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={state === "sending"}
      >
        {state === "sending" ? (
          <Loader2 size={17} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {state === "sending" ? "Sending…" : "Request price & availability"}
      </Button>

      <p className="text-center text-xs text-sand-500">
        No spam. We only reply to your enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const id = `inquiry-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium tracking-wide text-sand-600 uppercase"
      >
        {label}
        {required ? <span className="text-clay-600"> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-line bg-cream px-4 text-sm outline-none transition placeholder:text-sand-400 focus:border-clay-400"
      />
    </div>
  );
}
