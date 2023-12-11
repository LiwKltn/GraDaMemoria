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
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      backgroundImage: {
        'backImage': "url('https://img.freepik.com/free-photo/3d-rendering-optical-illusion_23-2150854149.jpg?w=740&t=st=1702051950~exp=1702052550~hmac=3efef74efb1008d874039b2e42742c44d824c70af120fd7d428e7bd6a06a36b7')",
      }
    },
  },
  plugins: [],
}

