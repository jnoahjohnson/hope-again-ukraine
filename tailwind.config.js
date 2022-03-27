module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  mode: "jit",
  theme: {
    extend: {
      keyframes: {
        "to-yellow": {
          "0%": { color: "white" },
          "100%": { color: "#ffd400" },
        },
        "to-blue": {
          "0%": { color: "white" },
          "100%": { color: "hsl(209, 100%, 48%)" },
        },
      },
      animation: {
        "to-yellow": "to-yellow 500ms ease-in forwards",
        "to-blue": "to-blue 500ms ease-in forwards",
      },
      colors: {
        "primary-blue": {
          DEFAULT: "#0059b5",
          light: "hsl(209, 100%, 48%)",
        },
        "primary-yellow": {
          DEFAULT: "#ffd400",
          dark: "hsl(50, 100%, 42%)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
