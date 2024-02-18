/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      logoBackground: "url('/src/assets/back.png')"
    },
  },
  plugins: [],
}

