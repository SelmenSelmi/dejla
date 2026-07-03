"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { Section } from "./Section";
import { LuxurySections } from "./LuxurySections";

const Scene = dynamic(() => import("./Scene").then((module) => module.Scene), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#120d08]" />,
});

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    eyebrow: "01 / Private arrival",
    title: "Luxury real estate as a cinematic journey",
    body: "A sculptural waterfront estate floats in warm dusk light while the camera circles like a private architectural film.",
    align: "left",
  },
  {
    eyebrow: "02 / Architectural detail",
    title: "Scroll closer into glass, stone, and water",
    body: "The camera moves into a macro viewing path to reveal reflective glazing, layered volumes, the pool edge, and premium material contrast.",
    align: "right",
  },
  {
    eyebrow: "03 / Atmosphere",
    title: "Golden particles drift through the estate",
    body: "Seeds become dust, city lights, and sunset particles swirling around the property to make the listing feel alive and collectible.",
    align: "left",
  },
  {
    eyebrow: "04 / The story",
    title: "The home moves aside for the lifestyle pitch",
    body: "The estate shifts into editorial composition while the copy explains privacy, wellness, concierge service, and investment-grade location.",
    align: "right",
  },
  {
    eyebrow: "05 / Private viewing",
    title: "End on a premium hero composition",
    body: "The camera pulls back to a poster-like final frame designed for high-end reels, launch videos, and lead-generating landing pages.",
    align: "center",
  },
];

export function ScrollTimeline() {
  useEffect(() => {
    const copies = gsap.utils.toArray(".section-copy");

    copies.forEach((copy) => {
      gsap.fromTo(
        copy,
        { autoAlpha: 0, y: 80, filter: "blur(18px)", scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: copy.closest("section"),
            start: "top 62%",
            end: "center 26%",
            scrub: true,
          },
        },
      );

      gsap.to(copy, {
        autoAlpha: 0,
        y: -70,
        filter: "blur(14px)",
        scale: 0.98,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: copy.closest("section"),
          start: "center 28%",
          end: "bottom 18%",
          scrub: true,
        },
      });
    });

    gsap.to(".film-grain-line", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-stage",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <>
      <main
        id="scroll-stage"
        className="relative min-h-[500vh] overflow-clip bg-[#120d08] text-white"
      >
        <Scene />

        <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-10">
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.42em] text-amber-100 backdrop-blur-xl">
            Dejla Estates
          </div>
          <a
            href="#final"
            className="rounded-full border border-amber-200/25 bg-amber-300/10 px-5 py-3 text-sm font-semibold text-amber-100 backdrop-blur-xl transition hover:bg-amber-200 hover:text-[#120d08]"
          >
            Private viewing
          </a>
        </header>

        <div className="fixed left-5 top-1/2 z-30 hidden h-56 w-px -translate-y-1/2 overflow-hidden bg-white/10 md:block">
          <div className="film-grain-line h-full origin-top scale-y-0 bg-gradient-to-b from-amber-200 to-amber-600" />
        </div>

        <div className="pointer-events-none relative z-10">
          {sections.map((section, index) => (
            <Section key={section.eyebrow} index={index} {...section} />
          ))}
        </div>

        <section
          id="final"
          className="relative z-20 flex min-h-screen items-end px-5 pb-12 md:px-10"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-6 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.42em] text-amber-200">
                Ultra-prime waterfront villa
              </p>
              <h3 className="mt-3 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
                A scroll-driven architectural presentation built to make a
                listing unforgettable.
              </h3>
            </div>
            <button className="rounded-full bg-amber-200 px-8 py-4 text-sm font-bold text-[#120d08] transition hover:scale-105 hover:bg-white">
              Schedule a tour
            </button>
          </div>
        </section>
      </main>
      <LuxurySections />
    </>
  );
}
