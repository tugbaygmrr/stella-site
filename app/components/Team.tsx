"use client";

import { useTranslation } from "../i18n/LanguageProvider";

const GREEN = "#007468";

type Member = {
  id: number;
  name: string;
  roleKey: "senior" | "account";
  img: string;
};

const TEAM: Member[] = [
  { id: 1, name: "Dogukan Sahin", roleKey: "senior", img: "/images/team/1.webp" },
  { id: 2, name: "Igor Kozariychuk", roleKey: "senior", img: "/images/team/2.webp" },
  { id: 3, name: "Deniz Hakkı İnşaatçı", roleKey: "account", img: "/images/team/3.webp" },
];

const TX = {
  tr: {
    eyebrow: "Ekibimiz",
    h1: "Ekibimizle",
    h2: "Tanışın",
    desc: "Her projede yanınızda olan, çok dilli ve deneyimli hesap yöneticilerimizle tanışın.",
    senior: "Kıdemli Hesap Yöneticisi",
    account: "Hesap Yöneticisi",
  },
  en: {
    eyebrow: "Our Team",
    h1: "Meet the",
    h2: "Team",
    desc: "Meet our multilingual and experienced account managers — by your side on every project.",
    senior: "Senior Account Executive",
    account: "Account Executive",
  },
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/** Member photo — /images/team/<id>.jpg (b&w), with an initials placeholder. */
function MemberPhoto({ name, img }: { name: string; img: string }) {
  // Initials placeholder as the base; the photo covers it once decoded.
  return (
    <>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "linear-gradient(180deg,#dcd5c8,#c3bba9)" }}
      >
        <span
          className="font-serif"
          style={{ color: "#8a8273", fontSize: "clamp(40px,5vw,84px)" }}
        >
          {initials(name)}
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "grayscale(1) contrast(1.02)" }}
      />
    </>
  );
}

export default function Team() {
  const { lang } = useTranslation();
  const t = TX[lang];
  return (
    <section
      id="team"
      className="w-full px-8 py-12 md:px-14 md:py-14"
      style={{ background: "#f3eee3" }}
    >
      <div className="mx-auto max-w-[1500px]">
        {/* header */}
        <div className="mb-8 max-w-xl md:mb-10">
          <div className="mb-4 flex items-center gap-4">
            <span
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ color: GREEN }}
            >
              {t.eyebrow}
            </span>
            <span className="block h-px w-16" style={{ background: "#8a9b8c" }} />
          </div>
          <h2
            className="font-serif font-light leading-[0.92] tracking-tight"
            style={{ color: GREEN, fontSize: "clamp(32px,3.8vw,62px)" }}
          >
            {t.h1}
            <br />
            {t.h2}
          </h2>
          <p className="mt-4 max-w-md text-[13.5px] leading-[1.6] text-charcoal/65">
            {t.desc}
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {TEAM.map((m) => (
            <div
              key={m.id}
              className="flex flex-col overflow-hidden rounded-[26px] bg-warm shadow-[0_40px_80px_-44px_rgba(24,40,28,0.5)]"
            >
              <div className="relative aspect-[3/4]">
                <MemberPhoto name={m.name} img={m.img} />
              </div>
              <div className="px-7 pb-8 pt-6 md:px-8">
                <h3 className="font-serif text-[26px] leading-none tracking-tight text-charcoal md:text-[30px]">
                  {m.name}
                </h3>
                <span className="mt-4 block h-px w-7 bg-charcoal/25" />
                <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-charcoal/55">
                  {t[m.roleKey]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
