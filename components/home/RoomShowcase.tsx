import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getRooms } from "@/lib/products";
import { ShoppableRoom } from "./ShoppableRoom";

export function RoomShowcase() {
  const rooms = getRooms();

  return (
    <section className="container-x py-24">
      <SectionHeading
        eyebrow="Rooms we've furnished"
        title="Tap a dot to shop the room"
        description="Real layouts, real proportions. Every piece you can see is one you can order in the finish shown."
        action={
          <Link
            href="/rooms"
            className="text-sm text-sand-600 underline underline-offset-4 transition hover:text-ink"
          >
            All room inspiration
          </Link>
        }
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rooms.map((room, index) => (
          <Reveal key={room.id} delay={index * 0.06}>
            <ShoppableRoom room={room} className="aspect-4/5" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
