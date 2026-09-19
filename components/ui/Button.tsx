import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "dark";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-clay-600 text-cream shadow-[0_14px_34px_-16px_rgba(158,93,54,0.9)] hover:bg-clay-700 hover:-translate-y-0.5",
  secondary:
    "bg-forest-600 text-cream hover:bg-forest-700 hover:-translate-y-0.5",
  outline:
    "border border-line bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-cream",
  ghost: "text-ink hover:bg-sand-100",
  dark: "bg-ink text-cream hover:bg-sand-800 hover:-translate-y-0.5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
  icon: "size-10",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
