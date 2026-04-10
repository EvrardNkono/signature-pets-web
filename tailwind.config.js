/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-terracotta': '#E2725B',
        'brand-gold': '#D4AF37',
      },
    },
  },
  plugins: [],
}