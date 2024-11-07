const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@ui": path.resolve(__dirname, "src/UI-kit"),
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@store": path.resolve(__dirname, "src/store"),
    },
  },
};

export {};
