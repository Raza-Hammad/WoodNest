import { RoomScene } from "@/components/art/RoomScene";
import { cn } from "@/lib/cn";
import type { Room } from "@/lib/types";

export function ShoppableRoom({
  room,
  className,
}: {
  room: Room;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/room relative overflow-hidden rounded-4xl border border-line",
        className,
      )}
    >
      <RoomScene room={room} />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/75 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
        <h3 className="font-serif text-2xl tracking-tight text-cream md:text-3xl">
          {room.name}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/75">
          {room.description}
        </p>
      </div>
    </div>
  );
}
