/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js}", 
    "./src/**/*",
    "./index.html",
    "./app.js",

  ],
  theme: {
    extend: {
      fontFamily: {
        Minnie: ['Minnie', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

