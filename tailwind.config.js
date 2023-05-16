/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      colors:{
        primary:{
          "100":"#000000"
        }
      }
    },
  },
  plugins: [],
}

