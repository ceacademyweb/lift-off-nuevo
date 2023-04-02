/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#010101",
        white: "#fefefe",
      }
    },
    screens: {
      'mobil': {'max': '639px'},
      'tablet': {'max': '1023px'},
      'laptop': {'max': '1279'},
      'desktop': '1535px'
    },
  },
  plugins: [],
}
