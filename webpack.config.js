const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// MiniCssExtractPlugin - работа со стилями то есть при создании билда генерировался файл со стилями и подключался нам нужен mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  // Итак,  чтобы вебпак начал свою работу, нужно указать главный (основной) файл, который будет включать в себя все другие необходимые файлы (модули).
  entry: {
    // polyfill - специальный js код нужен для поддержки тех фитч которых нет в старых браузерах например (const in var)
    // fetach/ promise - в старых браузерах будет иммулироваться
    polyfill: 'babel-polyfill',
    app: './js/app.js',
  },
  // Также webpack рекомендует явно указывать, в какой директории находятся исходные файлы проекта (ресурсы). Для этого следует использовать свойство context:
  context: path.resolve(__dirname, 'src'),
  devServer: {
    publicPath: '/',
    port: 9000,
    contentBase: path.join(process.cwd(), 'dist'),
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    hot: true,
  },
  module: {
    // Для того, чтобы трансформировать файл, используются специальные утилиты - загрузчики (loaders).
    //Для любых настроек модуля вебпак используется поле module.
    //Массив rules  внутри объекта module определяет список правил для загрузчиков.
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',

            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [precss, autoprefixer],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  // Вебпак плагины используются для настройки процесса сборки.
  //Например, плагин для минификации кода (во время сборки код подвергается очистке и минификации).
  //Или плагин для сборки html страницы и css кода (скрипты вставляются в html, куски css собираются в один файл).
  plugins: [
    // filename - под каким именем будут выводиться стили
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: "./style.css"}),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  //   new GhPagesWebpackPlugin({
  //     path: './public',
  //     options: {
  //         message: 'Update Home Page',
  //         user: {
  //             name: '年糕小豆汤',
  //             email: 'ooiss@qq.com'
  //         }
  //     }
  // })
  ],
  // Кроме entry, мы можем указать поле, куда (в какой файл) собирать конечный результат. Это свойство задаётся с помощью поля output.
  //По умолчанию, весь результирующий код собирается в папку dist.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  mode: 'development',
};
