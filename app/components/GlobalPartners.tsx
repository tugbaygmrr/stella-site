"use client";

import { motion } from "framer-motion";
import { useTranslation } from "../i18n/LanguageProvider";

/** Approximate coordinates on a 1000x500 canvas (Mercator-ish). */
const ISTANBUL = { x: 575, y: 215, name: "Istanbul" };
const cities = [
  { x: 430, y: 175, name: "London" },
  { x: 470, y: 200, name: "Paris" },
  { x: 505, y: 175, name: "Berlin" },
  { x: 495, y: 145, name: "Copenhagen" },
  { x: 510, y: 120, name: "Stockholm" },
  { x: 472, y: 175, name: "Amsterdam" },
  { x: 500, y: 230, name: "Milan" },
  { x: 460, y: 250, name: "Barcelona" },
  { x: 540, y: 195, name: "Vienna" },
  { x: 555, y: 245, name: "Athens" },
  { x: 350, y: 220, name: "Dublin" },
  { x: 410, y: 245, name: "Lisbon" },
];

/** Curved arc path between two points. */
function arc(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curvature = 0.35
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const nx = -dy;
  const ny = dx;
  const len = Math.sqrt(nx * nx + ny * ny) || 1;
  const cx = mx + (nx / len) * curvature * Math.abs(dx + dy);
  const cy = my + (ny / len) * curvature * Math.abs(dx + dy) * 0.4 - 30;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/** Deterministic pseudo-random — keeps server and client output identical. */
function rand(x: number, y: number, salt = 0) {
  const s = Math.sin(x * 12.9898 + y * 78.233 + salt * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

/** Sparse dot field that suggests continents (Europe + N. Africa + Türkiye region) */
const dotField = (() => {
  const pts: { x: number; y: number; o: number }[] = [];
  for (let x = 320; x < 680; x += 10) {
    for (let y = 80; y < 320; y += 10) {
      const r1 = rand(x, y, 1);
      const r2 = rand(x, y, 2);
      const inUK = x < 450 && y > 130 && y < 200 && r1 > 0.4;
      const inMain = x > 430 && x < 580 && y > 130 && y < 260 && r1 > 0.35;
      const inScand = x > 470 && x < 540 && y < 160 && r1 > 0.5;
      const inIberia = x < 470 && x > 380 && y > 220 && y < 270 && r1 > 0.5;
      const inMed = x > 470 && x < 580 && y > 240 && y < 280 && r1 > 0.6;
      const inTR = x > 560 && x < 640 && y > 200 && y < 240 && r1 > 0.3;
      const inNAfr = x > 410 && x < 580 && y > 280 && y < 310 && r1 > 0.6;
      if (inUK || inMain || inScand || inIberia || inMed || inTR || inNAfr) {
        pts.push({ x, y, o: 0.25 + r2 * 0.45 });
      }
    }
  }
  return pts;
})();

export default function GlobalPartners() {
  const { t } = useTranslation();

  return (
    <section
      id="partners"
      className="relative py-32 md:py-40 bg-warm overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-forest" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-forest">
                {t.partners.eyebrow}
              </span>
            </div>
            <h2 className="font-serif font-light text-[48px] md:text-[96px] leading-[0.95] tracking-tightest text-charcoal">
              {t.partners.line1}
              <br />
              <span className="italic text-forest">{t.partners.line2}</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-charcoal/70 text-[15px] leading-[1.75]">
              {t.partners.description}
            </p>
          </div>
        </div>

        <div className="relative rounded-[6px] border border-charcoal/10 bg-warm overflow-hidden">
          <svg
            viewBox="0 0 1000 400"
            className="w-full h-auto block"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* sage glow under Istanbul */}
            <defs>
              <radialGradient id="ist-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8EA38F" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#8EA38F" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#183524" stopOpacity="0.0" />
                <stop offset="50%" stopColor="#183524" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#183524" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* dot field continents */}
            {dotField.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="1.2"
                fill="#111111"
                opacity={p.o}
              />
            ))}

            {/* Istanbul glow */}
            <circle
              cx={ISTANBUL.x}
              cy={ISTANBUL.y}
              r="50"
              fill="url(#ist-glow)"
            />

            {/* arcs */}
            {cities.map((c, i) => (
              <motion.path
                key={c.name}
                d={arc(ISTANBUL.x, ISTANBUL.y, c.x, c.y)}
                fill="none"
                stroke="url(#line-grad)"
                strokeWidth="1"
                className="path-dash"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: 0.4 + i * 0.08,
                  duration: 1.6,
                  ease: [0.65, 0, 0.05, 1],
                }}
              />
            ))}

            {/* city dots */}
            {cities.map((c, i) => (
              <motion.g
                key={c.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.6 }}
              >
                <circle cx={c.x} cy={c.y} r="3" fill="#183524" />
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="7"
                  fill="none"
                  stroke="#183524"
                  strokeOpacity="0.2"
                />
                <text
                  x={c.x + 10}
                  y={c.y + 3}
                  fontSize="9"
                  fill="#111111"
                  opacity="0.7"
                  style={{
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.name}
                </text>
              </motion.g>
            ))}

            {/* Istanbul (origin) */}
            <motion.g
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.05, 1] }}
              style={{ transformOrigin: `${ISTANBUL.x}px ${ISTANBUL.y}px` }}
            >
              <circle cx={ISTANBUL.x} cy={ISTANBUL.y} r="5" fill="#8EA38F" />
              <circle cx={ISTANBUL.x} cy={ISTANBUL.y} r="12" fill="none" stroke="#8EA38F" strokeOpacity="0.4" />
              <circle cx={ISTANBUL.x} cy={ISTANBUL.y} r="20" fill="none" stroke="#8EA38F" strokeOpacity="0.2" />
              <text
                x={ISTANBUL.x + 14}
                y={ISTANBUL.y - 10}
                fontSize="11"
                fill="#183524"
                style={{
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {t.partners.origin}
              </text>
              <text
                x={ISTANBUL.x + 14}
                y={ISTANBUL.y + 2}
                fontSize="8"
                fill="#111111"
                opacity="0.5"
                style={{
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {t.partners.originMeta}
              </text>
            </motion.g>
          </svg>

          {/* footer strip on the map card */}
          <div className="flex flex-wrap items-center justify-between gap-6 px-8 py-6 border-t border-charcoal/10 text-[11px] tracking-[0.22em] uppercase text-charcoal/55">
            <span>{t.partners.footStrip1}</span>
            <span className="flex items-center gap-3">
              <span className="block w-1.5 h-1.5 rounded-full bg-sage" />
              {t.partners.footStrip2}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
