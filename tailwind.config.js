// tailwind.config.js
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gpt-green": "#6FCACD",
        "gpt-blue": "#5082A5",
        "gpt-red": "#E3625A",
        "gpt-indigo": "#48466D",
      },
    },
    fontFamily: {
      notosanskr: ["Noto Sans KR"],
      PretendardRegular: ["Pretendard-Regular"],
    },
  },
  plugins: [],
};

export default colors;
