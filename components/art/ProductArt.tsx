import { cn } from "@/lib/cn";
import type { ArtKind } from "@/lib/types";

export type Palette = {
  wall: string;
  wall2: string;
  floor: string;
  object: string;
  accent: string;
  glow: string;
};

export const PALETTES: Palette[] = [
  {
    wall: "#efe7dc",
    wall2: "#e3d8c8",
    floor: "#d8cab6",
    object: "#6b7a5a",
    accent: "#414d37",
    glow: "#fff4e0",
  },
  {
    wall: "#f4ede3",
    wall2: "#e9dccb",
    floor: "#dfd0bb",
    object: "#cbb79a",
    accent: "#8f8477",
    glow: "#fff6ea",
  },
  {
    wall: "#f2e7d8",
    wall2: "#e5d2b9",
    floor: "#d9c2a4",
    object: "#b97547",
    accent: "#7e482b",
    glow: "#fff0dd",
  },
  {
    wall: "#eceff0",
    wall2: "#dce1e2",
    floor: "#cdd3d4",
    object: "#8f8477",
    accent: "#564e45",
    glow: "#f7fbff",
  },
  {
    wall: "#f6ebdd",
    wall2: "#eddac1",
    floor: "#e0c9a8",
    object: "#b08d57",
    accent: "#7e5a2f",
    glow: "#fff3da",
  },
  {
    wall: "#eddfd2",
    wall2: "#dcc4ad",
    floor: "#cbac90",
    object: "#8a5a3b",
    accent: "#5a3a24",
    glow: "#ffeeda",
  },
  {
    wall: "#e9e6e1",
    wall2: "#d6d0c7",
    floor: "#c4bdb3",
    object: "#3b352f",
    accent: "#1b1815",
    glow: "#fff2e2",
  },
  {
    wall: "#f1e0d5",
    wall2: "#e3c5b0",
    floor: "#d3b198",
    object: "#a4472a",
    accent: "#6d2c19",
    glow: "#ffead9",
  },
];

export function getPalette(tone = 0) {
  return PALETTES[((tone % PALETTES.length) + PALETTES.length) % PALETTES.length];
}

/** Wall, floor and gradients. Render inside an <svg> before any furniture. */
export function RoomBackdrop({
  tone,
  uid,
  height = 480,
}: {
  tone: number;
  uid: string;
  height?: number;
}) {
  const p = getPalette(tone);

  return (
    <>
      <defs>
        <linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={p.wall} />
          <stop offset={`${(350 / height) * 100}%`} stopColor={p.wall} />
          <stop offset="100%" stopColor={p.wall2} />
        </linearGradient>
        <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.95" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height={height} fill={`url(#${uid}-wall)`} />
      <rect y="350" width="400" height={height - 350} fill={p.floor} />
    </>
  );
}

/**
 * A single furniture silhouette drawn in the 400x480 scene space, sitting on
 * the y=350 floor line. Wrap in a transform to place it inside a room.
 */
export function FurniturePiece({
  kind,
  tone,
  uid,
}: {
  kind: ArtKind;
  tone: number;
  uid: string;
}) {
  return <>{renderKind(kind, getPalette(tone), uid)}</>;
}

export function ProductArt({
  kind,
  tone = 0,
  seed = 0,
  className,
}: {
  kind: ArtKind;
  tone?: number;
  seed?: number;
  className?: string;
}) {
  const uid = `art-${kind}-${tone}-${seed}`;
  const shift = (seed % 3) * 8 - 8;

  return (
    <svg
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <RoomBackdrop tone={tone} uid={uid} />
      <g transform={`translate(${shift} 0)`}>
        <FurniturePiece kind={kind} tone={tone} uid={uid} />
      </g>
    </svg>
  );
}

function Ground({ p, rx = 140 }: { p: Palette; rx?: number }) {
  return (
    <ellipse cx="200" cy="352" rx={rx} ry="11" fill={p.accent} opacity="0.16" />
  );
}

function Leg({
  x,
  y = 318,
  h = 34,
  w = 11,
  color,
}: {
  x: number;
  y?: number;
  h?: number;
  w?: number;
  color: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={4} fill={color} />;
}

function renderKind(kind: ArtKind, p: Palette, uid: string) {
  const halo = `url(#${uid}-halo)`;

  switch (kind) {
    case "sofa":
      return (
        <>
          <Ground p={p} rx={148} />
          <rect x="60" y="196" width="280" height="92" rx="24" fill={p.object} />
          <rect x="44" y="240" width="44" height="92" rx="18" fill={p.accent} />
          <rect x="312" y="240" width="44" height="92" rx="18" fill={p.accent} />
          <rect x="86" y="252" width="228" height="62" rx="16" fill={p.object} />
          <rect x="98" y="262" width="98" height="42" rx="12" fill={p.accent} opacity="0.28" />
          <rect x="204" y="262" width="98" height="42" rx="12" fill={p.accent} opacity="0.28" />
          <Leg x={72} color={p.accent} />
          <Leg x={317} color={p.accent} />
        </>
      );

    case "armchair":
      return (
        <>
          <Ground p={p} rx={108} />
          <rect x="106" y="200" width="188" height="102" rx="30" fill={p.object} />
          <rect x="92" y="248" width="38" height="86" rx="17" fill={p.accent} />
          <rect x="270" y="248" width="38" height="86" rx="17" fill={p.accent} />
          <rect x="122" y="258" width="156" height="58" rx="15" fill={p.object} />
          <rect x="132" y="266" width="136" height="40" rx="12" fill={p.accent} opacity="0.26" />
          <Leg x={116} color={p.accent} />
          <Leg x={272} color={p.accent} />
        </>
      );

    case "chair":
      return (
        <>
          <Ground p={p} rx={78} />
          <rect x="146" y="168" width="10" height="142" rx="5" fill={p.accent} />
          <rect x="244" y="168" width="10" height="142" rx="5" fill={p.accent} />
          <rect x="144" y="190" width="112" height="34" rx="10" fill={p.object} />
          <rect x="146" y="232" width="108" height="13" rx="6.5" fill={p.object} opacity="0.85" />
          <rect x="126" y="256" width="148" height="48" rx="12" fill={p.object} />
          <rect x="134" y="266" width="132" height="28" rx="9" fill={p.accent} opacity="0.22" />
          <Leg x={134} y={304} h={48} color={p.accent} />
          <Leg x={256} y={304} h={48} color={p.accent} />
        </>
      );

    case "table":
      return (
        <>
          <Ground p={p} rx={140} />
          <rect x="56" y="238" width="288" height="22" rx="11" fill={p.object} />
          <rect x="74" y="260" width="252" height="12" rx="6" fill={p.accent} opacity="0.55" />
          <rect x="86" y="272" width="12" height="80" rx="5" fill={p.accent} />
          <rect x="302" y="272" width="12" height="80" rx="5" fill={p.accent} />
          <rect x="176" y="272" width="10" height="80" rx="4" fill={p.accent} opacity="0.75" />
          <rect x="214" y="272" width="10" height="80" rx="4" fill={p.accent} opacity="0.75" />
        </>
      );

    case "bed":
      return (
        <>
          <Ground p={p} rx={148} />
          <rect x="70" y="160" width="260" height="128" rx="22" fill={p.accent} />
          <rect x="58" y="282" width="284" height="46" rx="14" fill={p.object} />
          <rect x="66" y="326" width="268" height="18" rx="8" fill={p.accent} />
          <rect x="92" y="264" width="94" height="30" rx="13" fill={p.wall} />
          <rect x="200" y="264" width="94" height="30" rx="13" fill={p.wall} />
          <Leg x={78} y={342} h={12} color={p.accent} />
          <Leg x={311} y={342} h={12} color={p.accent} />
        </>
      );

    case "cabinet":
      return (
        <>
          <Ground p={p} rx={140} />
          <rect x="66" y="192" width="268" height="140" rx="16" fill={p.object} />
          <rect x="80" y="206" width="118" height="112" rx="10" fill={p.accent} opacity="0.22" />
          <rect x="202" y="206" width="118" height="112" rx="10" fill={p.accent} opacity="0.22" />
          <rect x="193" y="206" width="4" height="112" rx="2" fill={p.accent} opacity="0.5" />
          <rect x="170" y="252" width="16" height="5" rx="2.5" fill={p.accent} />
          <rect x="214" y="252" width="16" height="5" rx="2.5" fill={p.accent} />
          <Leg x={78} y={332} h={18} color={p.accent} />
          <Leg x={310} y={332} h={18} color={p.accent} />
        </>
      );

    case "shelf":
      return (
        <>
          <Ground p={p} rx={104} />
          <rect x="118" y="150" width="164" height="200" rx="10" fill={p.accent} />
          <rect x="130" y="162" width="140" height="176" rx="6" fill={p.wall} />
          <rect x="130" y="162" width="140" height="10" fill={p.object} />
          <rect x="130" y="216" width="140" height="10" fill={p.object} />
          <rect x="130" y="270" width="140" height="10" fill={p.object} />
          <rect x="130" y="324" width="140" height="10" fill={p.object} />
          <rect x="142" y="180" width="12" height="36" rx="3" fill={p.object} />
          <rect x="158" y="186" width="10" height="30" rx="3" fill={p.accent} opacity="0.7" />
          <rect x="172" y="176" width="14" height="40" rx="3" fill={p.object} opacity="0.8" />
          <rect x="200" y="236" width="16" height="34" rx="3" fill={p.object} />
          <rect x="220" y="242" width="12" height="28" rx="3" fill={p.accent} opacity="0.7" />
          <rect x="148" y="292" width="60" height="32" rx="4" fill={p.object} opacity="0.75" />
        </>
      );

    case "lamp":
      return (
        <>
          <circle cx="200" cy="168" r="96" fill={halo} />
          <Ground p={p} rx={80} />
          <ellipse cx="200" cy="344" rx="52" ry="12" fill={p.accent} />
          <rect x="195" y="150" width="9" height="196" rx="4" fill={p.accent} />
          <path d="M146 150 L254 150 L236 96 L164 96 Z" fill={p.object} />
          <ellipse cx="200" cy="150" rx="54" ry="12" fill={p.object} />
          <ellipse cx="200" cy="149" rx="44" ry="9" fill={p.glow} />
        </>
      );

    case "pendant":
      return (
        <>
          <circle cx="200" cy="250" r="110" fill={halo} />
          <rect x="197" y="0" width="6" height="150" fill={p.accent} />
          <path d="M126 178 Q200 122 274 178 L262 236 Q200 262 138 236 Z" fill={p.object} />
          <ellipse cx="200" cy="234" rx="62" ry="14" fill={p.glow} />
          <ellipse cx="200" cy="234" rx="62" ry="14" fill={p.accent} opacity="0.12" />
        </>
      );

    default:
      return <Ground p={p} />;
  }
}
