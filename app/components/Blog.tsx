"use client";

import { useTranslation } from "../i18n/LanguageProvider";

const GREEN = "#007468";

type Loc = { tr: string; en: string };
type Post = {
  id: number;
  label: Loc;
  title: Loc;
  desc: Loc;
  href: string;
  img: string;
};

const POSTS: Post[] = [
  {
    id: 1,
    label: { tr: "Makale", en: "Article" },
    title: {
      tr: "Duvar paneli mi, duvar boyası mı: hangisi daha ekonomik ve dayanıklı?",
      en: "Wall panels or wall paint: which is more cost-effective and durable?",
    },
    desc: {
      tr: "MDF duvar panelleri toplam maliyette boyaya göre daha avantajlı — hazırlık gerektirmez, 1-2 günde kurulur ve 15-20 yıl dayanır.",
      en: "MDF wall panels beat paint on total cost — no prep needed, installed in 1–2 days and lasting 15–20 years.",
    },
    href: "https://stella-ist.com/blog/articles/wall-panels-or-painting-walls-which-are-more-cost-effective-practical-and-durable/",
    img: "/images/blog/1.webp",
  },
  {
    id: 2,
    label: { tr: "Makale", en: "Article" },
    title: {
      tr: "Akustik panellerin kullanılabileceği 10 yer",
      en: "Top 10 places to use acoustic panels",
    },
    desc: {
      tr: "İyi mekânlar göründüğü kadar iyi duyulur. Akustik panellerin huzur, stil ve işlevi bir araya getirdiği 10 pratik alan.",
      en: "Great spaces sound as good as they look. 10 practical areas where acoustic panels bring calm, style and function together.",
    },
    href: "https://stella-ist.com/blog/articles/top-10-places-to-use-acoustic-panels/",
    img: "/images/blog/2.png",
  },
];

const TX = {
  tr: {
    eyebrow: "Blog",
    h1: "Son",
    h2: "Yazılar",
    desc: ["Tasarım ilhamı, akustik bilgi", "ve sektör içgörüleri."],
    all: "Tümünü Gör",
  },
  en: {
    eyebrow: "Blog",
    h1: "Latest",
    h2: "Insights",
    desc: ["Design inspiration, acoustic know-how", "and industry insights."],
    all: "View All",
  },
};

/**
 * Blog card image. A panel scene is the base; the real blog photo
 * (/images/blog/<n>.jpg) fades in on top once it's added.
 */
function PostImage({ id, img }: { id: number; img: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/products/big${id}.png`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
      />
    </>
  );
}

export default function Blog() {
  const { lang } = useTranslation();
  const t = TX[lang];
  return (
    <section
      id="blog"
      className="w-full px-8 py-24 md:px-14 md:py-32"
      style={{ background: "#f3eee3" }}
    >
      <div className="mx-auto max-w-[1500px]">
        {/* header row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="block h-px w-10" style={{ background: GREEN }} />
              <span
                className="text-[11px] uppercase tracking-[0.3em]"
                style={{ color: GREEN }}
              >
                {t.eyebrow}
              </span>
            </div>
            <h2
              className="font-serif font-light leading-[0.95] tracking-tight"
              style={{ color: GREEN, fontSize: "clamp(44px,5.5vw,92px)" }}
            >
              {t.h1}
              <br />
              {t.h2}
            </h2>
            <p className="mt-5 max-w-xs text-[14px] leading-[1.6] text-charcoal/65">
              {t.desc[0]}
              <br />
              {t.desc[1]}
            </p>
          </div>

          <a
            href="https://stella-ist.com/blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-4 self-start rounded-full border px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 hover:bg-charcoal hover:text-warm md:mt-2"
            style={{ borderColor: "rgba(17,17,17,0.25)", color: "#1c1c1c" }}
          >
            {t.all}
            <span className="text-base leading-none">→</span>
          </a>
        </div>

        {/* cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2">
          {POSTS.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-[22px] bg-warm shadow-[0_30px_60px_-40px_rgba(24,40,28,0.45)] transition-shadow duration-500 hover:shadow-[0_44px_80px_-44px_rgba(24,40,28,0.55)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <PostImage id={p.id} img={p.img} />
              </div>
              <div className="p-7 md:p-9">
                <div className="text-[11px] uppercase tracking-[0.22em] text-charcoal/45">
                  {p.label[lang]}
                </div>
                <span className="mt-3 block h-px w-6 bg-charcoal/20" />
                <h3
                  className="mt-5 font-serif text-[26px] leading-[1.15] tracking-tight text-charcoal md:text-[30px]"
                  style={{ minHeight: "2.3em" }}
                >
                  {p.title[lang]}
                </h3>
                <div className="mt-5 flex items-end justify-between gap-6">
                  <p className="max-w-[300px] text-[13.5px] leading-[1.6] text-charcoal/60">
                    {p.desc[lang]}
                  </p>
                  <span className="shrink-0 text-[20px] text-charcoal transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
