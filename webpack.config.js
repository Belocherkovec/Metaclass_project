const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { watchFile } = require("fs");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.join(srcPath, "index.js"),
  target: !isProd ? "web" : "browserslist",
  output: {
    path: buildPath,
    filename: "bundle.js",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, "index.html"), // путь до нашего шаблона
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?/,
        use: "babel-loader",
      },
    ],
  },
  devServer: {
    host: "127.0.0.1", // хост нашего сервера
    port: 3000, // порт, по которому к нему можно обращаться
    watchFiles: [path.join(srcPath, "/**/*")], // фиксит отсутствие автообновления
    hot: true,
    historyApiFallback: true,
  },
};
