# 需要安装的包
模块:
- webpack
- webpack-cli
- webpack-dev-server
- node-sass

loader:
- style-loader 用作fallback
- css-loader
- sass-loader
- file-loader 解决js css引入图片问题
- html-loader 解决html引入图片问题

plugins:
- html-webpack-plugin 将html也打包
- clean-webpack-plugin
- extract-text-webpack-plugin

# src目录结构
>src/
>>img/
js/
scss/
about.html
index.html

```
yarn install webpack webpack-cli webpack-dev-server style-loader css-loader sass-loader node-sass html-webpack-plugin clean-webpack-plugin extract-text-webpack-plugin -D
```

# webpack.config.js
```
const path = require('path')
const cleanplugin = require('clean-webpack-plugin')
const htmlplugin = require('html-webpack-plugin')

module.exports = {
  /* development mode is faster compiling and readable */
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
        use: ['style-loader', 'css-loader', 'sass-loader']
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
  ]
}
```
# webpack.build.config.js
```
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

```

# package.json
```
{
  "name": "front-end-structure",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack --config ./webpack.build.config.js",
    "build:prod": "webpack --production --config ./webpack.build.config.js",
    "start": "webpack-dev-server"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^2.0.2",
    "css-loader": "^2.1.1",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "file-loader": "^3.0.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.3.1"
  }
}

```
