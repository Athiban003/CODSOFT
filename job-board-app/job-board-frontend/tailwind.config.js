/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "1px 2px 9px 1px rgb(0 0 0 / 0.3)",
        // horizontal vertical blurRadius spreadRadius color
      },
    },
  },
  plugins: [],
};
