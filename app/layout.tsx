import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dejla Estates | Cinematic 3D Luxury Real Estate",
  description:
    "A premium WebGL luxury real estate landing page with scroll-driven camera movement, cinematic villa presentation, golden atmosphere, and immersive architectural storytelling.",
  keywords: [
    "WebGL",
    "Three.js",
    "React Three Fiber",
    "GSAP ScrollTrigger",
    "3D landing page",
    "luxury real estate",
    "cinematic villa",
    "architectural visualization",
  ],
  openGraph: {
    title: "Dejla Estates | Cinematic 3D Luxury Real Estate",
    description:
      "A premium scroll-driven 3D villa presentation built with Next.js, R3F, Drei, and GSAP.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
