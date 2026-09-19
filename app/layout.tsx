import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Overlays } from "@/components/layout/Overlays";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://woodnest.example.com"),
  title: {
    default: "WoodNest — Solid-wood furniture, made to be handed down",
    template: "%s | WoodNest",
  },
  description:
    "Sofas, chairs, tables, beds, storage and lighting in solid wood and honest fabrics. Explore every piece in 3D and see it in your own room with AR.",
  keywords: [
    "furniture store",
    "solid wood furniture",
    "sofa",
    "dining table",
    "3D furniture viewer",
    "AR furniture",
  ],
  openGraph: {
    title: "WoodNest — Solid-wood furniture",
    description:
      "Explore every piece in 3D and place it in your room with AR before you buy.",
    type: "website",
    siteName: "WoodNest",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Overlays />
      </body>
    </html>
  );
}
