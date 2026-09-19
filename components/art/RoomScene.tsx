import Link from "next/link";
import type { Room } from "@/lib/types";
import { FurniturePiece, RoomBackdrop } from "./ProductArt";

const SCENE_WIDTH = 400;
const SCENE_HEIGHT = 500;
const FLOOR = 350;

/**
 * A styled room drawn from individual furniture pieces, with shoppable hotspots
 * positioned from the same scene coordinates so they always land on the piece.
 */
export function RoomScene({ room }: { room: Room }) {
  const uid = `room-${room.id}`;

  return (
    <div className="absolute inset-0">
      <svg
        viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden
      >
        <RoomBackdrop tone={room.tone} uid={uid} height={SCENE_HEIGHT} />
        {room.pieces.map((piece, index) => (
          <g
            key={`${piece.slug}-${index}`}
            transform={`translate(${piece.x - 200 * piece.scale} ${
              FLOOR * (1 - piece.scale) + (piece.dy ?? 0)
            }) scale(${piece.scale})`}
          >
            <FurniturePiece kind={piece.kind} tone={piece.tone} uid={uid} />
          </g>
        ))}
      </svg>

      {room.pieces.map((piece, index) => (
        <Link
          key={`${piece.slug}-${index}`}
          href={`/products/${piece.slug}`}
          aria-label={`Shop the ${piece.label}`}
          style={{
            left: `${(piece.x / SCENE_WIDTH) * 100}%`,
            top: `${(piece.hotY / SCENE_HEIGHT) * 100}%`,
          }}
          className="group/hotspot absolute z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="relative grid size-7 place-items-center rounded-full border-2 border-cream bg-ink/70 shadow-soft backdrop-blur-sm transition duration-300 group-hover/hotspot:scale-110">
            <span className="size-2 rounded-full bg-clay-400" />
            <span className="absolute inset-0 animate-ping rounded-full border-2 border-cream/50" />
          </span>
          <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 scale-95 rounded-full bg-cream px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-ink opacity-0 shadow-soft transition duration-300 group-hover/hotspot:scale-100 group-hover/hotspot:opacity-100">
            {piece.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
