import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryGreen: "#417F2A",
        forestGreen: "#3A5E4D",
        darkOlive: "#333333",
        mossGreen: "#3B7F2A",
        slateSteel: "#404852",
        charcoal: "#4C4C4C",
        coralRed: "#8B1C1C",
        richBlack: "#191919",
        softBeige: "#0072BC1A",
        lightGray: "#F7F7F7",
        vibrantOrange: "#F26822",
      },
    },
  },
  plugins: [],
};
export default config;
