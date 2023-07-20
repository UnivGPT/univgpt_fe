// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'gpt-green': '#6FCACD',
        'gpt-blue': '#5082A5',
        'gpt-red': '#E3625A',
        'gpt-indigo': '#48466D',
      },
    },
  },
  plugins: [],
};

export default colors;