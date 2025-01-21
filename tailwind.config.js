/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
};
