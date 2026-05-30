import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: "#F8FAF7",
        forest: "#007468",
        sage: "#8EA38F",
        charcoal: "#111111",
        oak: {
          50: "#F3E9D6",
          100: "#E8D3A8",
          200: "#D9B97A",
          300: "#C29A55",
          400: "#A47B3C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.04em",
        wider: "0.12em",
        widest: "0.24em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.65, 0, 0.05, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
