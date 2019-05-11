const path = require('path')
const cleanplugin = require('clean-webpack-plugin')
const htmlplugin = require('html-webpack-plugin')
const extractplugin = require('extract-text-webpack-plugin')

module.exports = {
  /* development mode is faster compiling and readable */
  /* production mode is slower compiling and minimized */
  mode: 'development',
  /* multiple js entry, key is [name] */
  entry: {
    index: './src/js/index.js',
    about: './src/js/about.js',
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: extractplugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpg|png|gif|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            /* output into dist/images folder */
            options: {
              outputPath: 'images'
            }
          }
        ]
      },
      /* fix the problem like img src */
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    /* let phone access */
    host: '0.0.0.0',
    port: 3000,
    /* This need js file import '../xxx.html' to enable html refresh  */

    // hot: true,
    overlay: true
  },
  /* Error will tell you the souce problem from which source js file */
  devtool: 'inline-source-map',
  plugins: [
    /* clean dist folder first when compiling */
    new cleanplugin(),
    /* multiple html page */
    new htmlplugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index']
    }),
    new htmlplugin({
      filename: 'about.html',
      template: './src/about.html',
      chunks: ['about']
    }),
    /* extract multiple scss into dist/scss */
    new extractplugin({
      filename: 'css/[name].css'
    })
  ]
}
