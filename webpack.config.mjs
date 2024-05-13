import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import tsconfig from './tsconfig.json' assert { type: 'json' };

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';

const parseTsConfigPaths = (paths) => {
  const webpackConfigAliases = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

    webpackConfigAliases[alias] = path.join(srcPath, aliasPath);
  });

  return webpackConfigAliases;
};

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            // added modules in project
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
              namedExport: false,
            },
          },
        },
    {
      loader: 'postcss-loader', // added vendor prefixes
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'], // use "browserslist": ["> 1%", "last 4 versions"] in package.json
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          indentedSyntax: false, // Установите это значение в false, чтобы использовать SCSS синтаксис
        },
      },
    },
  ];
};

export default {
  entry: path.join(srcPath, 'index.tsx'),
  target: !isProd ? 'web' : 'browserslist',
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'), // путь до нашего шаблона
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
    new TsCheckerPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
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
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // < 10 kb equal to base64
          },
        },
      },
    ],
  },
  devServer: {
    host: '127.0.0.1', // server host
    port: 3001, // server port
    watchFiles: [path.join(srcPath, '/**/*')], // without this params, hot not working
    hot: true, // autoupdate
    historyApiFallback: true,
    open: true, // autoopen with start
  },
};
