/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(0 72.2% 50.6%)",
        foreground: "hsl(222.2 84% 4.9%)",
        background: "hsl(0 0% 100%)",
        "muted-foreground": "hsl(215.4 16.3% 46.9%)",
        muted: "hsl(215.4 16.3% 46.9%)",
        border: "hsl(214.3 31.8% 91.4%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
