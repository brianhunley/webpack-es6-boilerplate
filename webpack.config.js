const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src/"),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, "build")
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./src/index.html"),
        to: path.resolve(__dirname, "build")
      },
      {
        from: path.resolve(__dirname, "./assets/", "**", "*"),
        to: path.resolve(__dirname, "build"),
        toType: 'dir'
      }
    ]),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ],

  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
