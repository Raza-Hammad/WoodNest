import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.6 21v-7.7h2.62l.4-3.04H13.6V8.3c0-.88.24-1.48 1.5-1.48h1.6V4.1c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.93 1.42-3.93 4.04v2.24H7.8v3.04h2.6V21h3.2Z" />
    </svg>
  );
}
