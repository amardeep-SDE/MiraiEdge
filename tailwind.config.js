/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",   // <-- ⚡ REQUIRED FOR DARK MODE
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
