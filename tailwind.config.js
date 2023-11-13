/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        IBM: ["IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [],
});
