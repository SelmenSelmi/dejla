"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabaseClient";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowUp,
  FaStar,
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: "Amelia Laurent",
    place: "Paris, France",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    text: "Dejla Estates made our waterfront purchase feel effortless. Every viewing, document, and private detail was handled with exceptional taste.",
  },
  {
    name: "Omar Ben Youssef",
    place: "Dubai, UAE",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    text: "The team understood investment value and lifestyle equally well. Their Tunisia market insight helped us secure a rare villa before it went public.",
  },
  {
    name: "Sofia Ricci",
    place: "Milan, Italy",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    text: "From the first call to the final signature, the experience felt like a five-star concierge service rather than a traditional agency.",
  },
  {
    name: "James Whitmore",
    place: "London, UK",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    text: "Their presentation quality is outstanding. We could understand the architecture, neighborhood, and rental potential before flying in.",
  },
  {
    name: "Nadia Haddad",
    place: "Doha, Qatar",
    avatar:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=160&q=80",
    text: "Elegant, discreet, and precise. Dejla found us a private coastal retreat that matched our family’s standards perfectly.",
  },
  {
    name: "Marc Schneider",
    place: "Zurich, Switzerland",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&q=80",
    text: "The due diligence support was as refined as the properties. I felt protected, informed, and never rushed.",
  },
  {
    name: "Leila Mansour",
    place: "Tunis, Tunisia",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    text: "A truly premium experience. Their eye for design and negotiation turned a complex search into something inspiring.",
  },
  {
    name: "Hiro Tanaka",
    place: "Tokyo, Japan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    text: "The virtual tour, local guidance, and after-sale introductions were world class. Tunisia now feels like home.",
  },
];

const destinations = [
  [
    "🏖",
    "Hammamet",
    "Luxury beaches, serene marinas, and resort living along golden Mediterranean shores.",
    "/images/Hammamet.webp",
    "https://en.wikipedia.org/wiki/Hammamet,_Tunisia",
  ],
  [
    "🏛",
    "Carthage",
    "Ancient Roman ruins, UNESCO heritage, and timeless coastal prestige near Tunis.",
    "/images/Carthage.webp",
    "https://en.wikipedia.org/wiki/Carthage",
  ],
  [
    "🌊",
    "Sidi Bou Said",
    "A white-and-blue Mediterranean village filled with galleries, sea views, and charm.",
    "/images/Sidi Bou Said.webp",
    "https://en.wikipedia.org/wiki/Sidi_Bou_Said",
  ],
  [
    "🏜",
    "tataouine",
    "Luxury desert camps, cinematic dunes, starlit dinners, and private adventures.",
    "/images/Sahara Desert.webp",
    "https://en.wikipedia.org/wiki/tataouine",
  ],
  [
    "🕌",
    "Kairouan",
    "Historic Islamic architecture, artisanal heritage, and spiritual depth in every street.",
    "/images/kairoan.webp",
    "https://en.wikipedia.org/wiki/Kairouan",
  ],
  [
    "🌴",
    "Djerba",
    "Island lifestyle, crystal-clear beaches, boutique retreats, and year-round sunshine.",
    "/images/Djerba.webp",
    "https://en.wikipedia.org/wiki/Djerba",
  ],
];

function Stars() {
  return (
    <div className="flex gap-1 text-amber-200">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} />
      ))}
    </div>
  );
}

export function LuxurySections() {
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".luxury-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 72, filter: "blur(18px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          },
        );
      });
      gsap.fromTo(
        ".stagger-card",
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stagger-wrap", start: "top 78%" },
        },
      );
      gsap.to(".particle", {
        y: -42,
        x: 18,
        repeat: -1,
        yoyo: true,
        duration: 4.5,
        ease: "sine.inOut",
        stagger: 0.4,
      });
      gsap.to(".parallax-soft", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-soft",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.fromTo(
        ".map-zoom",
        { scale: 0.92, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".map-zoom", start: "top 78%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const submit = async (event) => {
    event.preventDefault();

    const form = formRef.current;

    if (!form?.checkValidity()) {
      form?.reportValidity();
      return;
    }

    setStatus("loading");

    try {
      const formData = new FormData(form);
      const inquiry = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        inquiry_subject: formData.get("inquiry_subject"),
        message: formData.get("message"),
      };

      const [web3FormsResponse, supabaseResponse] = await Promise.all([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        }).then((response) => response.json()),
        supabase.from("contacts").insert(inquiry),
      ]);

      if (web3FormsResponse.success && !supabaseResponse.error) {
        setStatus("success");
        form.reset();
        return;
      }

      if (supabaseResponse.error) {
        console.error(
          "Supabase contact insert failed:",
          supabaseResponse.error,
        );
      }

      setStatus("error");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#120d08] text-[#fff8ea]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(244,207,123,.16),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(234,184,92,.10),transparent_28%),linear-gradient(180deg,#120d08,#080604)]" />
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="particle pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-amber-200/30 blur-[1px]"
          style={{ left: `${8 + i * 8}%`, top: `${8 + (i % 5) * 18}%` }}
        />
      ))}

      <section className="luxury-reveal relative z-10 px-5 py-28 md:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.42em] text-amber-200/80">
            Trusted by global buyers
          </p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] md:text-7xl">
            What Our Clients Say
          </h2>
          <div className="carousel-viewport mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="testimonial-track flex w-max gap-6 hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className="w-[330px] rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 text-left shadow-[0_0_45px_rgba(244,207,123,.08)] backdrop-blur-2xl transition duration-500 hover:-translate-y-3 hover:border-amber-200/35 hover:shadow-[0_0_70px_rgba(244,207,123,.18)] md:w-[410px]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-14 w-14 rounded-full border border-amber-200/40 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-white/50">{item.place}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Stars />
                  </div>
                  <p className="mt-5 leading-7 text-white/68">“{item.text}”</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="luxury-reveal relative z-10 px-5 py-24 md:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="parallax-soft">
            <p className="text-xs font-bold uppercase tracking-[0.42em] text-amber-200/80">
              Private consultation
            </p>
            <h2 className="mt-4 text-5xl font-semibold leading-[.9] tracking-[-0.07em] md:text-7xl">
              Begin your luxury property journey
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/62">
              Speak with our discreet advisory team for curated villas,
              waterfront residences, and investment-grade opportunities across
              Tunisia.
            </p>
            <div className="mt-10 grid gap-4 text-white/74">
              {[
                [FaPhoneAlt, "+216 71 555 900"],
                [FaEnvelope, "concierge@dejla-estates.com"],
                [FaMapMarkerAlt, "Avenue Habib Bourguiba, Tunis 1000, Tunisia"],
                [FaClock, "Mon–Sat · 9:00–19:00"],
              ].map(([Icon, text]) => (
                <div
                  key={text}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl"
                >
                  <Icon className="text-amber-200" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <form
            ref={formRef}
            onSubmit={submit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_0_80px_rgba(244,207,123,.10)] backdrop-blur-2xl md:p-8"
          >
            <input
              type="hidden"
              name="access_key"
              value="df5c7780-de89-49fc-ae67-e20b1403f074"
            />
            <input
              type="hidden"
              name="subject"
              value="New luxury property inquiry from Dejla Estates"
            />
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
            />
            <div className="grid gap-5 md:grid-cols-2">
              {[
                ["Full Name", "name", "text"],
                ["Email Address", "email", "email"],
                ["Phone Number", "phone", "tel"],
                ["Subject", "inquiry_subject", "text"],
              ].map(([label, name, type]) => (
                <label key={label} className="group relative">
                  <input
                    required
                    name={name}
                    type={type}
                    placeholder=" "
                    className="peer w-full rounded-2xl border border-white/10 bg-black/20 px-5 pb-3 pt-6 text-white outline-none transition focus:border-amber-200/70 focus:shadow-[0_0_30px_rgba(244,207,123,.12)]"
                  />
                  <span className="pointer-events-none absolute left-5 top-4 text-sm text-white/45 transition peer-focus:top-2 peer-focus:text-xs peer-focus:text-amber-200 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    {label}
                  </span>
                </label>
              ))}
            </div>
            <label className="relative mt-5 block">
              <textarea
                required
                name="message"
                placeholder=" "
                rows="5"
                className="peer w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-5 pb-3 pt-6 text-white outline-none transition focus:border-amber-200/70 focus:shadow-[0_0_30px_rgba(244,207,123,.12)]"
              />
              <span className="pointer-events-none absolute left-5 top-4 text-sm text-white/45 transition peer-focus:top-2 peer-focus:text-xs peer-focus:text-amber-200 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Message
              </span>
            </label>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "loading"}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-amber-200 via-[#f4cf7b] to-amber-500 px-8 py-4 font-black uppercase tracking-[0.22em] text-[#120d08] shadow-[0_18px_55px_rgba(244,207,123,.20)] transition hover:shadow-[0_24px_75px_rgba(244,207,123,.32)]"
            >
              {status === "loading"
                ? "Sending..."
                : status === "success"
                  ? "Request Received ✓"
                  : status === "error"
                    ? "Try Again"
                    : "Send Inquiry"}
            </motion.button>
            {status === "success" && (
              <p className="mt-4 text-center text-sm font-semibold text-amber-100">
                Thank you. Our private advisory team will contact you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-sm font-semibold text-red-200">
                Something went wrong. Please check your details and try again.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="luxury-reveal relative z-10 px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.42em] text-amber-200/80">
              Visit Our Office
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
              Avenue Habib Bourguiba, Tunis
            </h2>
          </div>
          <div className="map-zoom overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_0_90px_rgba(0,0,0,.45)] backdrop-blur-2xl">
            <iframe
              title="Dejla Estates office map"
              src="https://www.google.com/maps?q=Avenue%20Habib%20Bourguiba%20Tunis%20Tunisia&output=embed"
              className="h-[420px] w-full rounded-[1.5rem] grayscale invert-[.9] hue-rotate-180 saturate-50"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-28 md:px-10">
        <div className="mx-auto max-w-7xl text-center luxury-reveal">
          <p className="text-xs font-bold uppercase tracking-[0.42em] text-amber-200/80">
            Discover Tunisia
          </p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] md:text-7xl">
            Experience the Beauty of Tunisia
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/62">
            From Mediterranean beaches to ancient history, discover why Tunisia
            is the perfect destination to invest, live, and explore.
          </p>
        </div>
        <div className="stagger-wrap mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map(([emoji, title, desc, image, link]) => (
            <article
              key={title}
              className="stagger-card group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-2xl"
            >
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120d08] via-[#120d08]/40 to-transparent" />
              <div className="absolute bottom-0 p-7 text-left">
                <span className="text-5xl">{emoji}</span>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-white/68">{desc}</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex rounded-full border border-amber-200/35 bg-amber-200/10 px-5 py-3 text-sm font-bold text-amber-100 backdrop-blur-xl transition hover:bg-amber-200 hover:text-[#120d08]"
                >
                  Learn More
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black/25 px-5 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.42em] text-amber-100 backdrop-blur-xl">
              Dejla Estates
            </div>
            <p className="mt-6 max-w-sm leading-7 text-white/58">
              Cinematic luxury real estate advisory for waterfront villas,
              private estates, and refined investment opportunities in Tunisia.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-amber-100">Contact</h4>
            <p className="mt-4 text-white/58">
              Avenue Habib Bourguiba
              <br />
              Tunis 1000, Tunisia
            </p>
            <p className="mt-3 text-white/58">
              +216 71 555 900
              <br />
              concierge@dejla-estates.com
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-amber-100">Quick Links</h4>
            <div className="mt-4 grid gap-3 text-white/58">
              {["Home", "Properties", "About", "Contact"].map((x) => (
                <a
                  key={x}
                  href={x === "Contact" ? "#contact" : "#scroll-stage"}
                  className="transition hover:translate-x-1 hover:text-amber-200"
                >
                  {x}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-amber-100">Newsletter</h4>
            <div className="mt-4 flex rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl">
              <input
                aria-label="Newsletter email"
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent px-4 outline-none placeholder:text-white/35"
              />
              <button className="rounded-full bg-amber-200 px-5 py-3 text-sm font-bold text-[#120d08]">
                Subscribe
              </button>
            </div>
            <div className="mt-6 flex gap-3">
              {[
                FaFacebookF,
                FaInstagram,
                FaLinkedinIn,
                FaTiktok,
                FaYoutube,
              ].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 transition hover:-translate-y-1 hover:border-amber-200/50 hover:text-amber-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Dejla Estates. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-amber-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-200">
              Terms & Conditions
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="grid h-10 w-10 place-items-center rounded-full bg-amber-200 text-[#120d08] transition hover:scale-110"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
