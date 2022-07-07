//config-override.js
const {
  addBabelPresets,
  addBabelPlugin,
  override,
  addWebpackResolve,
} = require("customize-cra");

const webpackConfig = require("./webpack.config");

module.exports = {
  webpack: override(
    ...addBabelPresets([
      "@babel/preset-react",
      { runtime: "automatic", importSource: "@emotion/react" },
    ]),
    addBabelPlugin("@emotion/babel-plugin"),
    addWebpackResolve(webpackConfig.resolve)
  ),
};
