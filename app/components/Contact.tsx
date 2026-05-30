"use client";

import { useTranslation } from "../i18n/LanguageProvider";

const GREEN = "#007468";

const ICONS: Record<string, string> = {
  pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3 2",
  phone:
    "M6.5 3.5 9 3l1.5 4-2 1.5a12 12 0 0 0 5 5L15 11l4 1.5-.5 2.5A2 2 0 0 1 16.5 17 13 13 0 0 1 4 4.5 2 2 0 0 1 6.5 3.5Z",
  mail: "M3.5 5.5h17v13h-17z M4 6l8 6 8-6",
};

function Icon({ k }: { k: keyof typeof ICONS }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={ICONS[k]} />
    </svg>
  );
}

type Lang = "tr" | "en";

const DETAILS: { k: keyof typeof ICONS; label: Record<Lang, string>; lines: Record<Lang, string[]> }[] = [
  {
    k: "pin",
    label: { tr: "Adres", en: "Address" },
    lines: {
      tr: [
        "Dilovası Organize Sanayi Bölgesi",
        "Karasu Cad. 135 Ada 5 Parsel",
        "D4009, 41455 Gebze / Kocaeli, Türkiye",
      ],
      en: [
        "Dilovası Organized Industrial Zone",
        "Karasu Cad. 135 Ada 5 Parsel",
        "D4009, 41455 Gebze / Kocaeli, Türkiye",
      ],
    },
  },
  {
    k: "clock",
    label: { tr: "Çalışma Saatleri", en: "Working Hours" },
    lines: {
      tr: ["Pazartesi – Cuma", "08:30 – 17:30", "Cumartesi & Salı kapalı"],
      en: ["Monday – Friday", "08:30 – 17:30", "Closed Saturday & Sunday"],
    },
  },
  {
    k: "phone",
    label: { tr: "Telefon", en: "Phone" },
    lines: { tr: ["+90 533 969 42 63"], en: ["+90 533 969 42 63"] },
  },
  {
    k: "mail",
    label: { tr: "E-posta", en: "Email" },
    lines: { tr: ["sale@stella-ist.com"], en: ["sale@stella-ist.com"] },
  },
];

const TX = {
  tr: {
    eyebrow: "İletişim",
    h1: "Stüdyomuzu",
    h2: "Ziyaret Edin",
    desc: "Projeniz hakkında konuşmayı ve birlikte sıra dışı bir şey yaratmayı çok isteriz.",
    cta: "Projene Başla",
    write: "Mesaj yaz",
    cardSub: "ACOUSTIC DESIGN",
    cardDesc:
      "Stüdyomuz doğal malzemeleri, özenli tasarımı ve akustik uzmanlığı bir araya getirerek mekânları dönüştürür.",
  },
  en: {
    eyebrow: "Contact",
    h1: "Visit Our",
    h2: "Studio",
    desc: "We'd love to talk about your project and create something extraordinary together.",
    cta: "Start Your Project",
    write: "Write a message",
    cardSub: "ACOUSTIC DESIGN",
    cardDesc:
      "Our studio transforms spaces by bringing together natural materials, considered design and acoustic expertise.",
  },
};

/** Interactive Google map of the studio location (zoom + pan). */
function StudioMap() {
  return (
    <iframe
      title="Stella Studio"
      src="https://yandex.com/map-widget/v1/?ll=29.5267%2C40.7956&z=12&pt=29.5267%2C40.7956%2Cpm2rdm&l=map"
      className="absolute inset-0 h-full w-full border-0"
      style={{
        filter: "grayscale(0.2) sepia(0.28) saturate(0.85) brightness(1.03)",
        pointerEvents: "auto",
      }}
      allowFullScreen
    />
  );
}

export default function Contact() {
  const { lang } = useTranslation();
  const t = TX[lang];
  return (
    <section
      id="contact"
      className="w-full px-8 py-24 md:px-14 md:py-28"
      style={{ background: "#f3eee3" }}
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ── left ── */}
        <div className="flex flex-col">
          <div className="mb-6 flex items-center gap-4">
            <span
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ color: GREEN }}
            >
              {t.eyebrow}
            </span>
            <span className="block h-px w-12" style={{ background: "#8a9b8c" }} />
          </div>

          <h2
            className="font-serif font-light leading-[0.95] tracking-tight"
            style={{ color: GREEN, fontSize: "clamp(44px,5.2vw,88px)" }}
          >
            {t.h1}
            <br />
            {t.h2}
          </h2>

          <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-charcoal/65">
            {t.desc}
          </p>

          <div className="mt-10 space-y-6">
            {DETAILS.map((d, i) => (
              <div
                key={d.label}
                className="flex items-start gap-5 pt-6"
                style={{ borderTop: i > 0 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(0,0,0,0.04)", color: GREEN }}
                >
                  <Icon k={d.k} />
                </span>
                <div>
                  <div className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-charcoal/45">
                    {d.label[lang]}
                  </div>
                  {d.lines[lang].map((l) => (
                    <div key={l} className="text-[14px] leading-[1.55] text-charcoal/80">
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a
              href="#"
              className="group inline-flex items-center gap-4 rounded-full px-8 py-4 text-warm transition-colors duration-300 hover:bg-charcoal"
              style={{ background: GREEN }}
            >
              <span className="text-[12px] font-medium uppercase tracking-[0.18em]">
                {t.cta}
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={`mailto:sale@stella-ist.com`}
              className="group inline-flex items-center gap-3 border-b border-charcoal/40 pb-1 text-[13px] font-medium text-charcoal"
            >
              {t.write}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* ── right: map + studio card ── */}
        <div className="relative z-20 min-h-[440px] lg:min-h-0">
          <div className="relative h-full min-h-[440px] overflow-hidden rounded-[28px] shadow-[0_50px_100px_-50px_rgba(20,40,28,0.5)]">
            <StudioMap />
          </div>

          {/* studio card */}
          <div
            className="absolute left-4 top-6 w-[clamp(220px,26vw,330px)] rounded-[22px] p-7 shadow-[0_30px_60px_-30px_rgba(0,90,80,0.6)] md:left-7"
            style={{ background: GREEN }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero/StellaLogo.svg"
              alt="Stella"
              className="h-9 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <div className="mt-3 text-[9px] tracking-[0.28em]" style={{ color: "#c9a96a" }}>
              {t.cardSub}
            </div>
            <p className="mt-5 text-[13.5px] leading-[1.6] text-warm/85">
              {t.cardDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
