/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#07aef4",
        secondary: "#ff3998",
        "primary-light": "#e0f5fe",
        "secondary-light": "#ffe8f0",
        link: "#f5f8fd",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
