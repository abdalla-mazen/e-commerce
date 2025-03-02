const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#0aad0a',
        'light-color': '#f0f3f2'

      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
  darkMode: 'class', 
}

