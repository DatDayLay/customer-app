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
        sans: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
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
