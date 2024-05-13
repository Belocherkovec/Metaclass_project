const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const autoprefixer = require('autoprefixer');
// const { watchFile, open } = require("fs");
// const loader = require("sass-loader");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
  return [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 
  !withModules ? "css-loader" : {
    loader: "css-loader",
    options: { // added modules in project
      modules: {
        localIdentName: !isProd ? "[path][name]__[local]" : "[hash:base64]",
        namedExport: false,
      }
    }
  },{
    loader: "postcss-loader", // added vendor prefixes
    options: {
      postcssOptions: {
        plugins: ["autoprefixer"] // use "browserslist": ["> 1%", "last 4 versions"] in package.json
      }
    }
  }, "sass-loader"]
}

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
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
    isProd && new MiniCssExtractPlugin({
      filename: '[name]-[hash].css'
    }),
    new TsCheckerPlugin()
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
              maxSize: 10 * 1024 // < 10 kb equal to base64
          }
      }
      },
    ],
  },
  devServer: {
    host: "127.0.0.1", // server host
    port: 3001, // server port
    watchFiles: [path.join(srcPath, "/**/*")], // without this params, hot not working
    hot: true, // autoupdate
    historyApiFallback: true,
    open: true // autoopen with start
  }
};
