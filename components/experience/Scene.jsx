"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const INTRO_SKIP_PROGRESS = 0.18;
const END_PADDING_SECONDS = 0.04;

export function Scene({ src = "/videos/video.mp4" }) {
  const videoRef = useRef(null);
  const targetTime = useRef(0);
  const smoothTime = useRef(0);
  const frameRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let scrollTrigger;
    let parallaxTween;
    let destroyed = false;

    const getVideoRange = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const start = duration * INTRO_SKIP_PROGRESS;
      const end = Math.max(duration - END_PADDING_SECONDS, start);

      return { start, end };
    };

    const seekToFirstFrame = () => {
      const { start } = getVideoRange();
      targetTime.current = start;
      smoothTime.current = start;
      video.currentTime = start;
    };

    const renderFrame = () => {
      if (destroyed) return;

      const { start, end } = getVideoRange();
      const nextTime = clamp(targetTime.current, start, end);

      smoothTime.current += (nextTime - smoothTime.current) * 0.22;

      if (
        video.readyState >= 2 &&
        Math.abs(video.currentTime - smoothTime.current) > 0.002
      ) {
        video.currentTime = smoothTime.current;
      }

      frameRef.current = requestAnimationFrame(renderFrame);
    };

    const setupTimeline = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      seekToFirstFrame();

      const showFirstFrame = () => setIsReady(true);
      if (video.readyState >= 2 && !video.seeking) {
        showFirstFrame();
      } else {
        video.addEventListener("seeked", showFirstFrame, { once: true });
      }

      scrollTrigger = ScrollTrigger.create({
        trigger: "#scroll-stage",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const { start, end } = getVideoRange();
          targetTime.current = start + self.progress * (end - start);
        },
      });

      parallaxTween = gsap.to(video, {
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: "#scroll-stage",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      frameRef.current = requestAnimationFrame(renderFrame);
      ScrollTrigger.refresh();
    };

    video.pause();
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    if (video.readyState >= 1) {
      setupTimeline();
    } else {
      video.addEventListener("loadedmetadata", setupTimeline, { once: true });
    }

    return () => {
      destroyed = true;
      video.removeEventListener("loadedmetadata", setupTimeline);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      scrollTrigger?.kill();
      parallaxTween?.scrollTrigger?.kill();
      parallaxTween?.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#120d08]">
      <video
        ref={videoRef}
        className={`h-full w-full scale-[1.02] object-cover transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {!isReady && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(244,207,123,0.16),rgba(18,13,8,0.92)_62%)]" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0,rgba(0,0,0,0.04)_42%,rgba(0,0,0,0.34)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      <div className="cinematic-noise pointer-events-none absolute inset-0" />
    </div>
  );
}
