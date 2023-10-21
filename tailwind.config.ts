import type { Config } from "tailwindcss";
const { violet, blackA, green } = require("@radix-ui/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "logo-gradient":
          "linear-gradient(0deg, rgba(173,173,173,1) 0%, rgba(136,136,136,1) 22%, rgba(41,41,41,1) 100%)",
      },
      fontFamily: {
        assistant: "'Assistant', sans-serif",
        yuji: "'Yuji Hentaigana Akari', cursive",
      },
      colors: {
        ...violet,
        ...green,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
