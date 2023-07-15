/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      colors:{
        'dark-gray':'rgba(35, 35, 35, 1)', 
      }
    },
  },
  plugins: [],
}

