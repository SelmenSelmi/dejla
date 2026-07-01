"use client";

export function Section({ eyebrow, title, body, index, align = "left" }) {
  const alignment = align === "right" ? "items-end text-right ml-auto" : align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <section className="relative flex min-h-screen items-center px-5 py-24 md:px-12" data-section={index}>
      <div className={`section-copy pointer-events-auto flex max-w-xl flex-col ${alignment}`}>
        <div className="mb-6 inline-flex rounded-full border border-amber-300/25 bg-white/[0.06] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.42em] text-amber-200/90 backdrop-blur-xl">
          {eyebrow}
        </div>
        <h2 className="text-5xl font-semibold leading-[0.9] tracking-[-0.07em] text-white md:text-7xl lg:text-8xl">
          {title}
        </h2>
        <p className="mt-6 max-w-md text-base leading-8 text-white/62 md:text-lg">
          {body}
        </p>
      </div>
    </section>
  );
}
