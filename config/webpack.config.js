const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resolvePathName = path => resolve(__dirname, path);

module.exports = {
  entry: resolvePathName("../src/js/index"),
  devtool: "inline-source-map",
  output: {
    path: resolvePathName("../dist"),
    filename: "app.bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: [/\.ts?$/],
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    hot: true,
    host: "0.0.0.0",
    port: 8080,
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    stats: "errors-only",
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    open: false
  },
  context: resolvePathName("../src"),
  plugins: [
    new HtmlWebpackPlugin({
      template: "../src/index.html",
      filename: "index.html"
    })
  ]
};
