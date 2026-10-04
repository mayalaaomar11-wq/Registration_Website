/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1c2b52', 600: '#2f4478', 700: '#243665', 900: '#111b36' },
        copper: { DEFAULT: '#b87555', light: '#d9a589', dark: '#8f5a40' },
        cream: { DEFAULT: '#f6f1ea', 50: '#fcfaf6' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { fadeIn: 'fadeIn 0.35s ease-out' },
    },
  },
  plugins: [],
};