import { Bestsellers } from "@/components/home/Bestsellers";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { RoomShowcase } from "@/components/home/RoomShowcase";
import { Spotlight3D } from "@/components/home/Spotlight3D";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <CategoryGrid />
      <Bestsellers />
      <Spotlight3D />
      <RoomShowcase />
      <Testimonials />
      <CtaBand />
    </>
  );
}
