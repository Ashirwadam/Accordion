const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
    },
    extensions: [".js", ".jsx"],
  },
};
