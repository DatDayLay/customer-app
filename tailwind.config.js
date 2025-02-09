/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./formkit.theme.mjs",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "serif"],
        roboto: ["Roboto", "serif"],
        manrope: ["Manrope", "serif"],
        zain: ["Zain", "serif"],
        kellySlab: ["Kelly Slab", "serif"],
        cabin: ["Cabin", "serif"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-bullets": theme("colors.pink.500"),
            li: {
              p: {
                margin: 0,
              },
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
