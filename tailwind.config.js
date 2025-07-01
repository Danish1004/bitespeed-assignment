const { colors } = require("./src/utils/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
};
