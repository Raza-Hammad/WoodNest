"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Maximize2,
  Move3d,
  Pause,
  Play,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import type { ModelViewerElement } from "@google/model-viewer";
import { ProductImage } from "@/components/art/ProductImage";
import { cn } from "@/lib/cn";
import type { ModelHotspot, ProductArt as ProductArtData } from "@/lib/types";
import { ARPrompt } from "./ARPrompt";

const DEFAULT_ORBIT = "35deg 68deg auto";

type Status = "loading" | "ready" | "error";

export function ModelViewer({
  glb,
  usdz,
  cameraOrbit,
  cameraTarget,
  fieldOfView,
  hotspots,
  poster,
  posterImage,
  alt,
  className,
}: {
  glb: string;
  usdz?: string;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  hotspots?: ModelHotspot[];
  poster: ProductArtData;
  posterImage?: string;
  alt: string;
  className?: string;
}) {
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [defined, setDefined] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const [progress, setProgress] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [canAR, setCanAR] = useState(false);
  const [arPromptOpen, setArPromptOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setDefined(true);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const element = viewerRef.current;
    if (!element || !defined) return;

    const handleLoad = () => {
      setStatus("ready");
      setProgress(1);
    };
    const handleError = () => setStatus("error");
    const handleProgress = (event: Event) => {
      const detail = (event as CustomEvent<{ totalProgress?: number }>).detail;
      if (typeof detail?.totalProgress === "number") {
        setProgress(detail.totalProgress);
      }
    };
    const handleArStatus = () => setCanAR(Boolean(element.canActivateAR));

    element.addEventListener("load", handleLoad);
    element.addEventListener("error", handleError);
    element.addEventListener("progress", handleProgress);
    element.addEventListener("ar-status", handleArStatus);

    if (element.loaded) handleLoad();
    setCanAR(Boolean(element.canActivateAR));

    return () => {
      element.removeEventListener("load", handleLoad);
      element.removeEventListener("error", handleError);
      element.removeEventListener("progress", handleProgress);
      element.removeEventListener("ar-status", handleArStatus);
    };
  }, [defined]);

  const handleReset = useCallback(() => {
    const element = viewerRef.current;
    if (!element) return;
    element.cameraOrbit = cameraOrbit ?? DEFAULT_ORBIT;
    element.fieldOfView = fieldOfView ?? "auto";
    element.resetTurntableRotation?.(0);
  }, [cameraOrbit, fieldOfView]);

  const handleAr = useCallback(() => {
    const element = viewerRef.current;
    if (!element) return;
    if (element.canActivateAR) {
      void element.activateAR();
    } else {
      setArPromptOpen(true);
    }
  }, []);

  const showOverlay = status === "loading";

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-4xl border border-line bg-linear-to-b from-sand-100 via-sand-50 to-sand-200",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-out",
          status === "ready" ? "opacity-0" : "opacity-100",
        )}
      >
        <ProductImage
          src={posterImage}
          art={poster}
          alt={alt}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {defined ? (
        <model-viewer
          ref={viewerRef}
          src={glb}
          ios-src={usdz}
          alt={alt}
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          ar-placement="floor"
          xr-environment
          camera-controls
          touch-action="pan-y"
          auto-rotate={autoRotate}
          auto-rotate-delay={1200}
          rotation-per-second="18deg"
          interaction-prompt="none"
          shadow-intensity="1"
          shadow-softness="0.85"
          exposure="1"
          environment-image="neutral"
          camera-orbit={cameraOrbit ?? DEFAULT_ORBIT}
          camera-target={cameraTarget}
          field-of-view={fieldOfView}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          style={{ opacity: status === "ready" ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          {hotspots?.map((hotspot) => (
            <button
              key={hotspot.slot}
              slot={`hotspot-${hotspot.slot}`}
              data-position={hotspot.position}
              data-normal={hotspot.normal ?? "0m 1m 0m"}
              type="button"
              className="group/hotspot relative grid size-6 place-items-center rounded-full border-2 border-cream bg-clay-600 shadow-lg"
              aria-label={hotspot.label}
            >
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[11rem] -translate-x-1/2 scale-95 rounded-xl bg-ink px-3 py-2 text-left text-[11px] leading-snug text-cream opacity-0 transition group-hover/hotspot:scale-100 group-hover/hotspot:opacity-100">
                <span className="block font-medium">{hotspot.label}</span>
                {hotspot.detail ? (
                  <span className="mt-0.5 block text-cream/70">{hotspot.detail}</span>
                ) : null}
              </span>
            </button>
          ))}
        </model-viewer>
      ) : null}

      {showOverlay ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-cream/85 px-6 py-5 text-center backdrop-blur-sm">
            <span className="relative grid size-11 place-items-center text-clay-600">
              <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.15"
                  strokeWidth="3"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={119.4}
                  strokeDashoffset={119.4 * (1 - Math.max(progress, 0.06))}
                  style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
              </svg>
              <Box size={18} />
            </span>
            <p className="text-xs font-medium tracking-wide text-sand-600">
              {defined ? "Loading 3D model…" : "Preparing 3D viewer…"}
            </p>
          </div>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="absolute inset-x-4 bottom-20 flex items-center gap-3 rounded-2xl bg-cream/95 px-4 py-3 text-xs text-sand-700 shadow-soft">
          <TriangleAlert size={16} className="shrink-0 text-clay-600" />
          <span>
            3D preview couldn&apos;t load. Browse the photos instead — everything
            else still works.
          </span>
        </div>
      ) : null}

      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-cream/85 px-3 py-1.5 text-[11px] font-medium tracking-wide text-sand-700 backdrop-blur-sm">
        <Move3d size={13} className="text-clay-600" />
        Drag to rotate · scroll to zoom
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setAutoRotate((value) => !value)}
          aria-label={autoRotate ? "Pause rotation" : "Play rotation"}
          className="grid size-10 place-items-center rounded-full bg-cream/85 text-ink backdrop-blur-sm transition hover:bg-cream"
        >
          {autoRotate ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset view"
          className="grid size-10 place-items-center rounded-full bg-cream/85 text-ink backdrop-blur-sm transition hover:bg-cream"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="absolute inset-x-4 bottom-4">
        <button
          type="button"
          onClick={handleAr}
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-cream shadow-lift transition hover:bg-sand-800 active:scale-[0.99]"
        >
          <Maximize2 size={16} />
          {canAR ? "View in your room (AR)" : "Scan to view in your room"}
        </button>
      </div>

      <ARPrompt
        open={arPromptOpen}
        onClose={() => setArPromptOpen(false)}
        productName={alt}
      />
    </div>
  );
}
