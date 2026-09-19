import type { Metadata } from "next";
import { Move3d } from "lucide-react";
import { ShoppableRoom } from "@/components/home/ShoppableRoom";
import { Reveal } from "@/components/ui/Reveal";
import { getRooms } from "@/lib/products";

export const metadata: Metadata = {
  title: "Room inspiration",
  description:
    "Real rooms furnished with WoodNest pieces. Tap any dot to shop the exact item you can see, in the finish shown.",
};

export default function RoomsPage() {
  const rooms = getRooms();

  return (
    <div className="container-x pt-14 pb-24">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-medium tracking-[0.28em] text-clay-600 uppercase">
          Room inspiration
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
          Tap a dot. Shop the room.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-sand-600">
          Four rooms we have actually furnished, with every piece labelled. Hover
          or tap the markers to jump straight to the item and its 3D view.
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-sand-500">
        <Move3d size={14} className="text-clay-600" />
        Markers point to the exact piece in the shot
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {rooms.map((room, index) => (
          <Reveal key={room.id} delay={index * 0.06}>
            <ShoppableRoom room={room} className="aspect-4/5" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
