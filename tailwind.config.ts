import type { Config } from "tailwindcss";

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
      },
      colors: {
        primaryColor: "#CAA89E",
        primaryColor80: "rgba(202,168,158,0.8)",
        secondaryColor: "#b9e6f7"

      },
      maxWidth: {
        primaryMaxWidth: "1020px", 
        primaryMaxWidthLg: "1150px" 
      }
    },
  },
  plugins: [],
};
export default config;
