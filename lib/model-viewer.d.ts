import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        poster?: string;
        ar?: boolean;
        "ar-modes"?: string;
        "ar-scale"?: string;
        "ar-placement"?: string;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        "auto-rotate-delay"?: number;
        "rotation-per-second"?: string;
        "shadow-intensity"?: number | string;
        "shadow-softness"?: number | string;
        exposure?: number | string;
        "tone-mapping"?: string;
        "environment-image"?: string;
        "camera-orbit"?: string;
        "camera-target"?: string;
        "field-of-view"?: string;
        "touch-action"?: string;
        "interaction-prompt"?: string;
        loading?: "auto" | "lazy" | "eager";
        "xr-environment"?: boolean;
        "disable-tap"?: boolean;
        "disable-pan"?: boolean;
        "min-field-of-view"?: string;
        "max-field-of-view"?: string;
        "interpolation-decay"?: number;
      };
    }
  }
}

export {};
