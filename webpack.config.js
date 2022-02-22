const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  resolve: {
    fallback: {
      "fs": false
    },
},
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      /*Choose only one of the following two: if you're using 
      plain CSS, use the first one, and if you're using a
      preprocessor, in this case SASS, use the second one*/
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use:[
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      {
              test: /\.svg$/,
              use: [
                {
                  loader: 'svg-url-loader',
                  options: {
                     limit: 10000,
                   },
                },
                ],
             },
    ], 
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "/public/index.html"
    }),
    new NodePolyfillPlugin(),
  ]
}