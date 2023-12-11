/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js}", 
    "./src/**/*",
    "./index.html",
    "./app.js",

  ],
  theme: {
    fontSize: {
      sm: '0.6rem',
      base: '0.75rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      fontFamily: {
        Minnie: ['Minnie', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

