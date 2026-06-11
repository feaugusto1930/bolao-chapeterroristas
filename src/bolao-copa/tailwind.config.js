/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0C10',
        card: '#1F2833',
        gold: '#C5A059',
        light: '#C5C6C7',
      },
    },
  },
  plugins: [],
}
