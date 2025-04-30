/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // ✅ Add this!
      },
      colors: {
        purple: {
          700: "#7b4397",
          800: "#6c3a85",
        },
        red: {
          500: "#dc2430",
          600: "#c6202b",
        },
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
