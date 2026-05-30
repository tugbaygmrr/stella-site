"use client";

import { useTranslation } from "../i18n/LanguageProvider";

const GREEN = "#007468";

type Lang = "tr" | "en";

const COLUMNS: { title: Record<Lang, string>; items: Record<Lang, string[]> }[] = [
  {
    title: { tr: "Ürünler", en: "Products" },
    items: {
      tr: [
        "Çıtalı Ahşap Paneller",
        "Akustik Keçe Paneller",
        "Özel Çözümler",
        "Yüzeyler & Malzemeler",
        "Aksesuarlar",
      ],
      en: [
        "Slatted Wood Panels",
        "Acoustic Felt Panels",
        "Custom Solutions",
        "Surfaces & Materials",
        "Accessories",
      ],
    },
  },
  {
    title: { tr: "İlham", en: "Inspiration" },
    items: {
      tr: ["Projeler", "Blogdan", "Malzeme Kütüphanesi", "Bakım & Temizlik"],
      en: ["Projects", "From the Blog", "Material Library", "Care & Cleaning"],
    },
  },
  {
    title: { tr: "Kurumsal", en: "Company" },
    items: {
      tr: ["Hakkımızda", "Sürdürülebilirlik", "Mimarlar İçin", "İletişim"],
      en: ["About Us", "Sustainability", "For Architects", "Contact"],
    },
  },
];

const TX = {
  tr: {
    eyebrow: "İlham veren mekânlar için",
    h: ["Mekânınızı", "birlikte", "yükseltelim."],
    ctaDesc:
      "İster mimar, ister tasarımcı olun ya da sıra dışı bir şey inşa edin — vizyonunuzu hayata geçirmek için buradayız.",
    contact: "İletişime Geç",
    explore: "Malzemelerimizi Keşfet",
    brandSub: "ACOUSTIC PANELS",
    brandDesc:
      "Mekânları güzellik ve sesle dönüştüren, özenle tasarlanmış akustik paneller.",
    connect: "Bize Ulaşın",
    connectDesc: ["Aklınızda bir proje mi var?", "Sizden haber almak isteriz."],
    rights: "© 2024 Stella Acoustic Panels. Tüm hakları saklıdır.",
    legal: ["Gizlilik Politikası", "Şartlar & Koşullar", "Çerez Politikası"],
  },
  en: {
    eyebrow: "For spaces that inspire",
    h: ["Let's elevate", "your space", "together."],
    ctaDesc:
      "Whether you're an architect, a designer or building something extraordinary — we're here to bring your vision to life.",
    contact: "Get in Touch",
    explore: "Explore Our Materials",
    brandSub: "ACOUSTIC PANELS",
    brandDesc:
      "Thoughtfully designed acoustic panels that transform spaces with beauty and sound.",
    connect: "Get in Touch",
    connectDesc: ["Have a project in mind?", "We'd love to hear from you."],
    rights: "© 2024 Stella Acoustic Panels. All rights reserved.",
    legal: ["Privacy Policy", "Terms & Conditions", "Cookie Policy"],
  },
};

function Social({ label, d }: { label: string; d: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-warm/30 text-warm/80 transition-colors duration-300 hover:bg-warm hover:text-[#007468]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={d} />
      </svg>
    </a>
  );
}

/** CTA image — /images/cta.png, falling back to a product scene. */
function CtaImage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/products/big1.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cta.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </>
  );
}

export default function Footer() {
  const { lang } = useTranslation();
  const t = TX[lang];
  return (
    <footer id="footer">
      {/* ───────── CTA ───────── */}
      <section className="relative overflow-hidden" style={{ background: "#f3eee3" }}>
        <div className="absolute inset-0">
          <CtaImage />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,rgba(243,238,227,0.96) 0%,rgba(243,238,227,0.82) 40%,rgba(243,238,227,0.25) 70%,rgba(243,238,227,0) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-[1500px] px-8 py-24 md:px-14 md:py-36">
          <div className="max-w-xl">
          <span
            className="mb-7 text-[11px] uppercase tracking-[0.28em]"
            style={{ color: GREEN }}
          >
            {t.eyebrow}
          </span>
          <h2
            className="font-serif font-light leading-[1.02] tracking-tight"
            style={{ color: GREEN, fontSize: "clamp(40px,4.6vw,76px)" }}
          >
            {t.h[0]}
            <br />
            {t.h[1]}
            <br />
            {t.h[2]}
          </h2>
          <p className="mt-7 max-w-md text-[15px] leading-[1.7] text-charcoal/65">
            {t.ctaDesc}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-8">
            <a
              href="#"
              className="group inline-flex items-center gap-4 rounded-full px-7 py-4 text-warm transition-colors duration-300 hover:bg-charcoal"
              style={{ background: GREEN }}
            >
              <span className="text-[13px] font-medium tracking-wide">
                {t.contact}
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#collections"
              className="group inline-flex items-center gap-3 border-b border-charcoal/40 pb-1 text-[13px] font-medium text-charcoal"
            >
              {t.explore}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <div className="text-warm" style={{ background: GREEN }}>
        <div className="mx-auto max-w-[1500px] px-8 py-16 md:px-14 md:py-20">
          <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-12 lg:gap-10">
            {/* brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-4 lg:pr-10">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero/StellaLogo.svg"
                  alt="Stella"
                  className="h-10 w-auto"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <span className="mt-2 block text-[9px] tracking-[0.3em] text-warm/55">
                  {t.brandSub}
                </span>
              </div>
              <p className="mt-6 max-w-[280px] text-[13.5px] leading-[1.7] text-warm/65">
                {t.brandDesc}
              </p>
              <div className="mt-7 flex items-center gap-3">
                <Social
                  label="Instagram"
                  d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5.01-4.74.07-.9.04-1.38.2-1.7.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.28.8-.32 1.7C3.21 8.5 3.2 8.86 3.2 12s.01 3.5.07 4.74c.04.9.2 1.38.32 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.28 1.7.32 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.2 1.7-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.28-.8.32-1.7.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.2-1.38-.32-1.7a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.12-.8-.28-1.7-.32C15.5 4.01 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8A3.14 3.14 0 1 0 12 15.14 3.14 3.14 0 0 0 12 8.86Zm5.13-2.16a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"
                />
                <Social
                  label="LinkedIn"
                  d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9V9Z"
                />
                <Social
                  label="Pinterest"
                  d="M12 2.2a9.8 9.8 0 0 0-3.57 18.92c-.05-.8-.1-2.04.02-2.92.1-.78.7-3.0.7-3.0s-.18-.36-.18-.9c0-.85.5-1.48 1.1-1.48.52 0 .77.39.77.86 0 .52-.33 1.3-.5 2.03-.15.6.3 1.1.9 1.1 1.08 0 1.9-1.14 1.9-2.78 0-1.45-1.04-2.47-2.53-2.47-1.72 0-2.73 1.29-2.73 2.62 0 .52.2 1.08.45 1.38.05.06.06.11.04.17l-.17.7c-.03.11-.09.14-.2.08-.76-.35-1.23-1.45-1.23-2.34 0-1.9 1.38-3.65 3.98-3.65 2.09 0 3.71 1.49 3.71 3.48 0 2.08-1.31 3.75-3.13 3.75-.61 0-1.18-.32-1.38-.69l-.38 1.43c-.13.53-.49 1.19-.74 1.6A9.8 9.8 0 1 0 12 2.2Z"
                />
              </div>
            </div>

            {/* link columns */}
            {COLUMNS.map((col) => (
              <div key={col.title.en} className="lg:col-span-2">
                <div className="mb-5 text-[11px] uppercase tracking-[0.22em] text-warm/55">
                  {col.title[lang]}
                </div>
                <ul className="space-y-3.5 text-[14px] text-warm/85">
                  {col.items[lang].map((it) => (
                    <li key={it}>
                      <a href="#" className="transition-colors hover:text-warm">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* connect */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-2">
              <div className="mb-5 text-[11px] uppercase tracking-[0.22em] text-warm/55">
                {t.connect}
              </div>
              <p className="text-[14px] leading-[1.6] text-warm/75">
                {t.connectDesc[0]}
                <br />
                {t.connectDesc[1]}
              </p>
              <a
                href="#"
                className="group mt-6 inline-flex items-center gap-4 rounded-full border border-warm/30 px-6 py-3 text-[12px] tracking-wide transition-colors duration-300 hover:bg-warm hover:text-[#007468]"
              >
                {t.contact}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-warm/15 pt-8 text-[12px] text-warm/55 md:flex-row md:items-center">
            <span>{t.rights}</span>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#" className="transition-colors hover:text-warm">
                {t.legal[0]}
              </a>
              <span className="text-warm/25">|</span>
              <a href="#" className="transition-colors hover:text-warm">
                {t.legal[1]}
              </a>
              <span className="text-warm/25">|</span>
              <a href="#" className="transition-colors hover:text-warm">
                {t.legal[2]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
