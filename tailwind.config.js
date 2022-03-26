module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "primary-blue": {
          DEFAULT: "#0059b5",
          light: "hsl(209, 100%, 48%)",
        },
        "primary-yellow": {
          DEFAULT: "#ffd400",
        },
      },
    },
  },
  plugins: [],
};
