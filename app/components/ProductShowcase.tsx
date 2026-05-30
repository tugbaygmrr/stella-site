"use client";

import { useState } from "react";
import { useTranslation } from "../i18n/LanguageProvider";

const GREEN = "#007468";

const TX = {
  tr: {
    eyebrow: "KOLEKSİYONLAR",
    h: "Panellerimiz",
    desc: ["Modern iç mekânlar için üretilmiş", "premium akustik duvar panelleri."],
    details: "Detayları Gör",
    prev: "Önceki",
    next: "Sonraki",
    badges: {
      nrc: "Akustik Performans",
      ce: "Avrupa Standartlarında Sertifikalı",
      sus: "Çevre Dostu Malzemeler",
    },
    sustainable: "Sürdürülebilir",
  },
  en: {
    eyebrow: "COLLECTIONS",
    h: "Our Panels",
    desc: ["Premium acoustic wall panels crafted", "for modern interiors."],
    details: "View Details",
    prev: "Previous",
    next: "Next",
    badges: {
      nrc: "Acoustic Performance",
      ce: "Certified to European Standards",
      sus: "Eco-Friendly Materials",
    },
    sustainable: "Sustainable",
  },
};

/** Card rectangles measured from podium-bg.png (% of the background). */
const CARDS = [
  { cx: 14, w: 9, top: 18, bottom: 16 },
  { cx: 26, w: 9, top: 18, bottom: 16 },
  { cx: 38, w: 9, top: 18, bottom: 16 },
  { cx: 49.5, w: 9, top: 18, bottom: 16 },
  { cx: 61, w: 9, top: 18, bottom: 16 },
  { cx: 81, w: 17, top: 8, bottom: 14 }, // tall featured card
];

/** A product panel that pops/grows in 3D on hover. */
function Panel({
  n,
  left,
  bottom,
  width,
}: {
  n: number;
  left: number;
  bottom: number;
  width: number;
}) {
  return (
    <div
      className="absolute z-20"
      style={{
        left: `${left}%`,
        bottom: `${bottom}%`,
        width: `${width}%`,
        transform: "translateX(-50%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/products/card${n}.png`}
        alt=""
        className="block w-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(.34,1.4,.5,1)] drop-shadow-[0_14px_16px_rgba(24,40,28,0.28)] hover:-translate-y-2 hover:scale-[1.14] hover:drop-shadow-[0_30px_34px_rgba(24,40,28,0.42)]"
        style={{ transformOrigin: "bottom center" }}
      />
    </div>
  );
}

const PRODUCTS = [
  { n: 1, name: "Acoustic Panels", cat: "Comfort 9" },
  { n: 2, name: "Interior Slats MDF", cat: "MDF 6" },
  { n: 3, name: "Skirting Board MDF", cat: "Light" },
  { n: 4, name: "Wall Panels MDF", cat: "Beats" },
  { n: 5, name: "Samples Boxes", cat: "Stella" },
];

function OliveSprig({ className = "" }: { className?: string }) {
  const L = (x: number, y: number, r: number, c: string, s = 1) => (
    <ellipse cx={x} cy={y} rx={5 * s} ry={12 * s} fill={c} transform={`rotate(${r} ${x} ${y})`} />
  );
  return (
    <svg viewBox="0 0 140 230" className={className} fill="none" aria-hidden>
      <path d="M70 228 C66 180 62 140 70 96 C76 62 86 38 96 8" stroke="#5f6e44" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M70 150 C84 138 96 128 110 124" stroke="#5f6e44" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M67 108 C54 100 44 92 33 90" stroke="#5f6e44" strokeWidth="1.8" strokeLinecap="round" />
      {L(96, 8, 18, "#8a9a5e")}
      {L(86, 24, 32, "#7c8c52")}
      {L(101, 30, -16, "#94a36b")}
      {L(78, 46, 44, "#71814a")}
      {L(96, 56, -28, "#869761")}
      {L(72, 72, 52, "#7c8c52")}
      {L(110, 122, -36, "#94a36b", 0.95)}
      {L(120, 132, -18, "#7c8c52", 0.9)}
      {L(33, 90, 58, "#869761", 0.95)}
      {L(24, 100, 40, "#71814a", 0.9)}
      {L(68, 100, 40, "#7c8c52")}
      {L(74, 124, -40, "#8a9a5e")}
      {L(66, 140, 46, "#71814a")}
    </svg>
  );
}

function SpecIcon({ kind }: { kind: "nrc" | "ce" | "sus" }) {
  const c = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    width: "100%",
    height: "100%",
  };
  if (kind === "nrc")
    return (
      <svg {...c} aria-hidden>
        <path d="M3 12h2M19 12h2" />
        <path d="M7 8v8M11 5v14M15 8v8" />
      </svg>
    );
  if (kind === "ce")
    return (
      <svg {...c} aria-hidden>
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  return (
    <svg {...c} aria-hidden>
      <path d="M12 21c-5 0-8-3-8-8 0-5 4-9 8-9s8 4 8 9c0 5-3 8-8 8z" />
      <path d="M12 21V8M12 12l3.5-3.5M12 14l-3-3" />
    </svg>
  );
}

/** Big photo: the uploaded scene (/images/products/big<n>.png) or, until that
 *  exists, the cut panel standing on a CSS podium with an olive sprig. */
function FeaturedPhoto({ n }: { n: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/products/big${n}.png`}
      alt=""
      className="absolute inset-0 h-full w-full object-contain"
    />
  );
}

/** Right-hand detail card (green), cycled by the arrows. */
function Featured({ idx }: { idx: number }) {
  const { lang } = useTranslation();
  const t = TX[lang];
  const p = PRODUCTS[idx];
  const badges = [
    { k: "nrc" as const, v: "NRC 0.4", l: t.badges.nrc },
    { k: "ce" as const, v: "CE", l: t.badges.ce },
    { k: "sus" as const, v: t.sustainable, l: t.badges.sus },
  ];
  return (
    <>
    <div
      className="absolute z-20 flex flex-col"
      style={{
        left: "72.5%",
        top: "9%",
        width: "17.4%",
        bottom: "23%",
      }}
    >
      {/* title */}
      <div className="shrink-0">
        <div style={{ color: "#1c1c1c", fontWeight: 700, fontSize: "clamp(11px,1.2vw,22px)", letterSpacing: "0.03em" }}>
          {p.name}
        </div>
        <div
          style={{
            color: "#8a8275",
            fontSize: "clamp(7px,0.7vw,12px)",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            marginTop: 3,
          }}
        >
          {p.cat}
        </div>
      </div>

      {/* panel photo — widened toward the card edges */}
      <div
        className="relative my-[3%] flex-1"
        style={{ minHeight: 0, marginLeft: "-23%", marginRight: "-40%", borderRadius: "clamp(6px,0.7vw,14px)", overflow: "hidden" }}
      >
        <FeaturedPhoto n={p.n} />
      </div>

      {/* badges — vertical list */}
      <div className="shrink-0 flex flex-col">
        {badges.map((b, i) => (
          <div
            key={b.k}
            className="flex items-center"
            style={{
              gap: "clamp(6px,0.8vw,15px)",
              padding: "clamp(5px,0.7vw,12px) 0",
              borderTop: i > 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
            }}
          >
            <span
              className="flex shrink-0 items-center justify-center rounded-full"
              style={{
                width: "clamp(22px,2.3vw,42px)",
                height: "clamp(22px,2.3vw,42px)",
                background: "rgba(0,0,0,0.045)",
                color: "#1c1c1c",
              }}
            >
              <span style={{ width: "50%", height: "50%" }}>
                <SpecIcon kind={b.k} />
              </span>
            </span>
            <div>
              <div style={{ color: "#1c1c1c", fontWeight: 600, fontSize: "clamp(8px,0.85vw,15px)", lineHeight: 1.1 }}>
                {b.v}
              </div>
              <div style={{ color: "#8a8275", fontSize: "clamp(6px,0.6vw,11px)", lineHeight: 1.2, marginTop: 1 }}>
                {b.l}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>

    {/* button — on the floor, below the podium */}
    <a
      href="https://stella-ist.com/catalog/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute z-20 flex items-center justify-between rounded-full"
      style={{
        left: "81.2%",
        bottom: "13.5%",
        width: "17.5%",
        transform: "translateX(-50%)",
        background: GREEN,
        color: "#fff",
        padding: "clamp(5px,0.62vw,13px) clamp(11px,1.2vw,24px)",
        boxShadow: "0 16px 30px -14px rgba(20,40,28,0.55)",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: "clamp(9px,0.88vw,16px)" }}>{t.details}</span>
      <span
        className="flex items-center justify-center rounded-full"
        style={{
          width: "clamp(19px,1.95vw,38px)",
          height: "clamp(19px,1.95vw,38px)",
          border: "1px solid rgba(255,255,255,0.55)",
          color: "#fff",
          fontSize: "clamp(10px,1vw,18px)",
        }}
      >
        ↗
      </span>
    </a>
    </>
  );
}

export default function ProductShowcase() {
  const { lang } = useTranslation();
  const t = TX[lang];
  const [active, setActive] = useState(0);
  const go = (d: number) =>
    setActive((i) => (i + d + PRODUCTS.length) % PRODUCTS.length);

  return (
    <section
      id="collections"
      className="w-full overflow-hidden"
      style={{ background: "#efe6d8" }}
    >
      <div className="relative w-full" style={{ aspectRatio: "1638 / 960" }}>
        {/* background render */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/products/podium-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* product panels — hover to pop / grow (3D feel) */}
        <Panel n={1} left={15.6} bottom={19} width={8.5} />
        <Panel n={2} left={26.8} bottom={19} width={3.6} />
        <Panel n={3} left={37.8} bottom={18.2} width={8.5} />
        <Panel n={4} left={49.5} bottom={18.2} width={8.5} />
        <Panel n={5} left={61} bottom={18.2} width={10} />

        {/* card labels (name + sub), top of each card */}
        {[
          { left: 11.5, top: 40.3, name: "Acoustic Panels", sub: "Comfort 9" },
          { left: 22.5, top: 37.5, name: "Interior Slats MDF", sub: "MDF 6" },
          { left: 34, top: 36.2, name: "Skirting Board MDF", sub: "Light" },
          { left: 45.5, top: 35.2, name: "Wall Panels MDF", sub: "Beats" },
          { left: 57.3, top: 33, name: "Samples Boxes", sub: "Stella" },
        ].map((lab) => (
          <div
            key={lab.name}
            className="absolute z-10 text-left"
            style={{ left: `${lab.left}%`, top: `${lab.top}%`, width: "16%" }}
          >
            <div
              className="font-semibold leading-tight"
              style={{
                color: "#1c1c1c",
                fontSize: "clamp(8px,0.92vw,16px)",
                whiteSpace: "nowrap",
              }}
            >
              {lab.name}
            </div>
            <div
              style={{
                color: "#8a8275",
                fontSize: "clamp(6px,0.66vw,11px)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginTop: 3,
              }}
            >
              {lab.sub}
            </div>
            <span
              className="mt-1.5 block h-px"
              style={{ width: "clamp(14px,1.4vw,26px)", background: "rgba(0,0,0,0.18)" }}
            />
          </div>
        ))}

        {/* podium numbers 01–05 — centered on each podium */}
        {[14, 25, 36.5, 48, 59].map((px, i) => (
          <div
            key={`num-${i}`}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              left: `${px}%`,
              top: "82.6%",
              transform: "translate(-50%, -50%)",
              width: "clamp(22px,2.2vw,42px)",
              height: "clamp(22px,2.2vw,42px)",
              border: "1px solid rgba(95,95,95,0.35)",
              background: "rgba(255,255,255,0.18)",
              color: "#6a6a6a",
              fontSize: "clamp(9px,0.85vw,15px)",
              letterSpacing: "0.04em",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
        ))}

        {/* right-hand green detail card — cycled by the arrows */}
        <Featured idx={active} />

        {/* heading + arrows */}
        <div className="absolute left-[3.5%] top-[5%] z-20 max-w-[46%]">
          <div className="mb-3 flex items-center gap-4">
            <span
              className="font-semibold"
              style={{ color: GREEN, fontSize: "clamp(13px,1.3vw,26px)" }}
            >
              02
            </span>
            <span
              style={{
                color: GREEN,
                fontSize: "clamp(10px,0.95vw,18px)",
                letterSpacing: "0.18em",
              }}
            >
              {t.eyebrow}
            </span>
            <span
              className="h-px w-[clamp(40px,7vw,120px)]"
              style={{ background: "#809383" }}
            />
          </div>

          <h2
            className="font-serif font-medium"
            style={{
              color: "#007468",
              fontSize: "clamp(40px,6vw,110px)",
              lineHeight: 0.92,
            }}
          >
            {t.h}
          </h2>

          <p
            className="mt-3"
            style={{
              color: "#2d2d2d",
              fontSize: "clamp(11px,1.1vw,20px)",
              lineHeight: 1.5,
            }}
          >
            {t.desc[0]}
            <br />
            {t.desc[1]}
          </p>
        </div>

        {/* arrows — each centered exactly on its dot in the background */}
        <button
          onClick={() => go(-1)}
          aria-label={t.prev}
          className="absolute z-30 flex items-center justify-center bg-transparent transition-transform duration-300 hover:scale-110"
          style={{
            left: "4.4%",
            top: "35.08%",
            transform: "translate(-50%, -50%)",
            width: "clamp(24px,2.6vw,46px)",
            height: "clamp(24px,2.6vw,46px)",
            color: GREEN,
            fontSize: "clamp(12px,1.2vw,22px)",
          }}
        >
          ←
        </button>
        <button
          onClick={() => go(1)}
          aria-label={t.next}
          className="absolute z-30 flex items-center justify-center bg-transparent text-white transition-transform duration-300 hover:scale-110"
          style={{
            left: "8.53%",
            top: "35.08%",
            transform: "translate(-50%, -50%)",
            width: "clamp(24px,2.6vw,46px)",
            height: "clamp(24px,2.6vw,46px)",
            fontSize: "clamp(12px,1.2vw,22px)",
          }}
        >
          →
        </button>
      </div>
    </section>
  );
}
