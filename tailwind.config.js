/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        clip: "vote 1s ease-in-out",
      },
      keyframes: {
        vote: {
          "0%, 100%": {
            transform: "scale(100%)",
          },
          "25%": {
            transform: "scale(150%)",
          },
          "75%": {
            transform: "scale(100%)",
          },
        },
      },
    },
  },
  plugins: [],
};
